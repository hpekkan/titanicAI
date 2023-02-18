import pandas as pd
import numpy as np
import pipeline
import matplotlib.pyplot as plt
import seaborn as sns
import pickle
from sklearn.experimental import enable_iterative_imputer
from sklearn.impute import (SimpleImputer, IterativeImputer)
from sklearn.preprocessing import (OneHotEncoder, StandardScaler)
from sklearn.model_selection import (GridSearchCV, cross_val_score)
from sklearn.cluster import KMeans
from catboost import CatBoostClassifier
import warnings
warnings.filterwarnings('ignore')

#read data
full_df = pd.read_csv('data/train.csv')


# Keep max index that will be used to back split training and test data
X_max_index = full_df.shape[0]

# Separate features and target
y = full_df.Survived

df = full_df.drop(['Survived', 'PassengerId'], axis=1)

# Zero values in Fare we will consider as an error or outlier and will delete for further imputation
df.loc[df.Fare == 0, 'Fare'] = np.nan

df['Lastname'] = df.Name.str.split(', ').str[0]

df['Title'] = df.Name.str.split(', ').str[1]
df['Title'] = df.Title.str.split('.').str[0]

# Grouping the same type titles 

# We change also Miss to Mrs, but later we will convert back 
# to Miss just for underage females as for now Miss is not 
# very usefull as it represents a young lady and also 
# an unmarried adult one of any age
females = ['Ms', 'Miss', 'Mlle', 'Mrs', 'Mme']
df.loc[df.Title.isin(females), 'Title'] = 'Mrs'

males = ['Master', 'Mr']
df.loc[(df.Title.isin(males)), 'Title'] = 'Mr'

# Change the titles for underage persons to Master and Miss
df.loc[((df.Title == 'Mr') & (df.Age < 18)), 'Title'] = 'Master'
df.loc[((df.Title == 'Mrs') & (df.Age < 18)), 'Title'] = 'Miss'

# Create noble title
df.loc[(~df.Title.isin(females) & ~df.Title.isin(males)), 'Title'] = 'Noble'

# Analyze Fare by ticket number
# Just to be sure that the Fare represents the full price 
# of the ticket and not the price per person

# Split Ticket by series and number
df['Ticket_series'] = [i[0] if len(i) > 1 else 0 for i in df.Ticket.str.split()]
df['Ticket_nr'] = [i[-1] for i in df.Ticket.str.split()]

# Check if Fare min and Fare max of the same ticket number are the same
df_fare = df[~df.Fare.isna()]
multi_tickets = df_fare.groupby(df_fare.Ticket_nr[df_fare.Ticket_nr.duplicated()])

# Create a column with the passengers number by ticket 
ticket_dict = df.groupby('Ticket_nr').Lastname.count().to_dict()
df['Passengers_ticket'] = df.Ticket_nr.map(ticket_dict)

# Create Price column
df['Price'] = (df.Fare / df.Passengers_ticket).round()

# Extract Deck letter from Cabin column
df['Deck'] = df.Cabin.str[0]

# Deck missing values by Pclass
df.loc[df.Deck.isna(), 'Pclass'].value_counts()

# Cabin T was on the upper deck (google helps), 
# so we will replace it with A deck as it has just a single value
df.loc[df.Deck == 'T', 'Deck'] = 'A'

# Maybe Mr Carlsson paid just 5 pounds for that 1st class ticket, 
# but this value is an outlier that we will replace with the next min
df.loc[(df.Ticket_nr == '695'), 'Price'] = 19

# Two most expensive tickets are outliers,
# we will cap them at the next overall highest Price 
df.loc[(df.Ticket_nr == '17755'), 'Price'] = 68
df.loc[(df.Ticket_nr == '17558'), 'Price'] = 68

# Create a data frame of mean prices by Pclass and Deck 
class_deck_price = pd.DataFrame(df.groupby(['Pclass', 'Deck'])
                                .Price.mean().round(2)).reset_index()

# Impute missing prices 
# Where Deck is missing we will use the mean price by Pclass only
for index, row in df.loc[df.Price.isna(), 
                         ['Pclass', 'Deck']].iterrows():
    if not pd.isna(row.Deck):
        new_price = class_deck_price.loc[
            ((class_deck_price.Pclass == row.Pclass) 
            & (class_deck_price.Deck == row.Deck)), 'Price'].mean()
    else:
        new_price = class_deck_price[
            class_deck_price.Pclass == row.Pclass].Price.mean()

    df.loc[[index], 'Price'] = new_price
    
# Create dictionaries with aproximative price ranges by deck 
# concluded from previous analisys
first_cl = {'A': [25, 30],
            'B': [35, 70],
            'C': [30, 35],
            'D': [19, 25],
            'E': [9, 19]}

second_cl = {'D': [13, 17],
             'E': [5, 9],
             'F': [9, 13]}

third_cl = {'E': [8, 9],
            'F': [9, 21],
            'G': [0, 8]}

# Create a dictionary pairing Pclass and respective price dictionary
class_dict = {1: first_cl,
              2: second_cl,
              3: third_cl}

# Impute missing Deck values 
for index, row in df.loc[df.Deck.isna(), ['Pclass', 'Price']].iterrows():
    for c, d in class_dict.items():
        if row.Pclass == c:
            for i, j in d.items():
                if max(j) > row.Price >= min(j):
                    df.loc[[index], 'Deck'] = i

# Encode Deck with it's deck level number counting from the bottom
deck_level = {'G': 1, 'F': 2, 'E': 3, 'D': 4, 'C': 5, 'B': 6, 'A': 7}

df.Deck = df.Deck.replace(deck_level)

# Analyse how many people were on each deck.
# Many values were imputed with aproximation,but at least we will have 
# an aproximative crowd mass each passenger has to pass going up
deck_people = df.Deck.value_counts().sort_index().to_dict()

# Create an escape density dictionary from which we will impute data to our new feature
escape_density = {}
for i in range(1, 8):
    escape_density[i] = sum(deck_people.values())
    del deck_people[i]
    

# Create Escape_density column
df['Escape_density'] = df.Deck.replace(escape_density)

# We add together the person and his SibSp and Parch
df['Family_size'] = 1 + df.SibSp + df.Parch


# Create full data frame for analysis
X = df[:X_max_index]
full_df = pd.concat([X, y], axis=1).copy()

# Check for families that has survivers and create a dictionary with mean value of their family survivability
family_survivers = full_df[['Lastname', 'Survived']].groupby('Lastname').mean().round(2).reset_index()
family_survivers_dict = dict(zip(family_survivers.Lastname, family_survivers.Survived))

# Reduce the dictionary to the list of families that are both in train and test data
common_survivers = {}
for lastname, survived in family_survivers_dict.items():
    if lastname in list(df['Lastname'].unique()):
        common_survivers[lastname] = survived

# Create Family_survivers feature
full_df['Family_survivers'] = full_df.Lastname.map(common_survivers)

# For the families that are not present in both train and test we will impute the overall mean value
full_df.Family_survivers = full_df.Family_survivers.fillna(full_df.Family_survivers.mean())

# Separate back features and target
y = full_df.Survived

df = full_df.drop('Survived', axis=1)

# Change Pclass dtype to category as it's a classification feature
df.Pclass = df.Pclass.astype('category')

# Drop further unused columns
col_drop = ['Name', 'Ticket', 'Fare', 'Cabin', 'Lastname','Ticket_nr',  
            'Ticket_series', 'Passengers_ticket']
df = df.drop(col_drop, axis=1)

# List of categorical columns
categ_cols = list(df.select_dtypes(['object', 'category']).columns)

# Impute categoricals with most frequent value
cat_imputer = SimpleImputer(strategy='most_frequent')

df_cat = cat_imputer.fit_transform(df[categ_cols])
df_cat = pd.DataFrame(df_cat, columns=df[categ_cols].columns)

# Encode categoricals with One Hot Encoding
ohe = OneHotEncoder(sparse=False)

df_cat = pd.DataFrame(ohe.fit_transform(df_cat),
                  columns=ohe.get_feature_names_out())


# List of numerical columns
num_cols = [col for col in df.columns 
            if df[col].dtype in ['int64', 'float64']]

# Impute numericals
it_imp = IterativeImputer()

df_num = pd.DataFrame(it_imp.fit_transform(df[num_cols]),
                      columns=df[num_cols].columns)

# Concatenate with encoded categorical columns
df = pd.concat([df_cat, df_num], axis=1)

# Create a full data frame for analysis
X = df[:X_max_index]
full_df = pd.concat([X, y], axis=1)

df['Age_group'] = pd.cut(x=df.Age, bins=[0, 15, 32, 44, df.Age.max()],
                         labels=['Child', 'Young', 'Adult', 'Old'])


# Create Family_group feature
df['Family_group'] = pd.cut(x=df.Family_size, 
                            bins=[0, 1, 4, df.Family_size.max()],
                            labels=['Single', 'Medium', 'Large'])


# Create Lucky_family feature
df['Lucky_family'] = pd.cut(x=df.Family_survivers, 
                            bins=[0, 0.22, 0.35, 0.49, df.Family_survivers.max()],
                            labels=['Low', 'Medium', 'Very_low', 'High'])


# Encode categoricals
df = pd.get_dummies(df)

# Apply np.log to normalize the skewed right Price
df.Price = df.Price.apply(np.log1p)

# Standardize 
std_scaler = StandardScaler()

df_scaled = std_scaler.fit_transform(df)
df = pd.DataFrame(df_scaled, columns=df.columns)


# Drop features not used for modeling
cols_to_drop = ['Family_survivers', 'SibSp', 'Parch', 'Family_size']
df = df.drop(cols_to_drop, axis=1)

X = df[:X_max_index]

# Define model
cat_model = CatBoostClassifier()

# Define parameters' grid
grid = {'verbose': [False],
        'thread_count': [-1],
        'depth': [4, 5],
        'iterations': [2000, 3000],
        'learning_rate': [0.0001, 0.0003]}

# Define GridSearchCV
grid_cat = GridSearchCV(estimator=cat_model, param_grid=grid, cv=3, n_jobs=-1)
grid_cat.fit(X, y)

print('Results from Grid Search')
print('\n Best Score:\n', grid_cat.best_score_)
print('\n Best parameters:\n', grid_cat.best_params_)


# Define parameters
# They were manualy adjusted after grid search as gave a better leaderboard score
params = {'depth': 4, 
          'iterations': 1000, 
          'learning_rate': 0.0001, 
          'thread_count': -1, 
          'verbose': False}

# Define and fit the model
cat_model = CatBoostClassifier(**params)
cat_model.fit(X, y)

# Check accuracy and features importance
cat_rmses = cross_val_score(cat_model, X, y, cv=5)

print(pd.Series(cat_rmses).describe())

# Save the Model
pickle.dump(model, open('model/titanic_model.pkl', 'wb'))

# Load the Model
loaded_model = pickle.load(open('model/titanic_model.pkl', 'rb'))
score = model.evaluate(X_val, Y_val, verbose=0)
print("Test loss:", score[0])
print("Test accuracy:", score[1])

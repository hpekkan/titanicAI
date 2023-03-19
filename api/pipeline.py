import pandas as pd


import warnings
warnings.filterwarnings('ignore')


#Common Model Helpers
from sklearn.preprocessing import  LabelEncoder
class data:
    def __init__(self, passenger_id, pclass,name,sex,age,sibsp,parch,ticket,fare,cabin,embarked,train_age_median,train_embarked_mode,train_fare_median):
        self.id = passenger_id
        self.pclass = pclass
        self.name=name
        self.sex=sex
        self.age=age
        self.sibsp=sibsp
        self.parch=parch
        self.ticket=ticket
        self.fare=fare
        self.cabin=cabin
        self.embarked=embarked
        self.df=pd.DataFrame({"PassengerId":passenger_id,"Pclass":pclass,"Name":name,"Sex":sex,"Age":age,"SibSp":sibsp,"Parch":parch,"Ticket":ticket,"Fare":fare,"Cabin":cabin,"Embarked":embarked},index=[0])
        self.train_age_median = train_age_median
        self.train_embarked_mode = train_embarked_mode
        self.train_fare_median = train_fare_median
        
    def preprocess(self):
        df = self.df
        df['Age'].fillna(self.train_age_median, inplace = True)

        #complete embarked with mode
        df['Embarked'].fillna(self.train_embarked_mode, inplace = True)
        #complete missing fare with median
        df['Fare'].fillna(self.train_fare_median, inplace = True)
        drop_column = ['PassengerId','Cabin', 'Ticket']
        df.drop(columns=drop_column, axis=1, inplace = True)
        
        df['FamilySize'] = df['SibSp'] + df['Parch'] + 1

        df['IsAlone'] = 1 #initialize to yes/1 is alone
        df['IsAlone'].loc[df['FamilySize'] > 1] = 0 # now update to no/0 if family size is greater than 1

        #quick and dirty code split title from name: http://www.pythonforbeginners.com/dictionary/python-split
        df['Title'] = df['Name'].str.split(", ", expand=True)[1].str.split(".", expand=True)[0]


        #Continuous variable bins; qcut vs cut: https://stackoverflow.com/questions/30211923/what-is-the-difference-between-pandas-qcut-and-pandas-cut
        #Fare Bins/Buckets using qcut or frequency bins: https://pandas.pydata.org/pandas-docs/stable/generated/pandas.qcut.html
        df['FareBin'] = pd.qcut(df['Fare'], 4,duplicates='drop')

        #Age Bins/Buckets using cut or value bins: https://pandas.pydata.org/pandas-docs/stable/generated/pandas.cut.html
        df['AgeBin'] = pd.cut(df['Age'].astype(int), 5)
            
        stat_min = 10 #while small is arbitrary, we'll use the common minimum in statistics: http://nicholasjjackson.com/2012/03/08/sample-size-is-10-a-magic-number/
        title_names = (df['Title'].value_counts() < stat_min) #this will create a true false series with title name as index

        #apply and lambda functions are quick and dirty code to find and replace with fewer lines of code: https://community.modeanalytics.com/python/tutorial/pandas-groupby-and-python-lambda-functions/
        df['Title'] = df['Title'].apply(lambda x: 'Misc' if title_names.loc[x] == True else x)

        label = LabelEncoder()
        df['Sex_Code'] = label.fit_transform(df['Sex'])
        df['Embarked_Code'] = label.fit_transform(df['Embarked'])
        df['Title_Code'] = label.fit_transform(df['Title'])
        df['AgeBin_Code'] = label.fit_transform(df['AgeBin'])
        df['FareBin_Code'] = label.fit_transform(df['FareBin'])
        data1_x_bin = ['Sex_Code','Pclass', 'Embarked_Code', 'Title_Code', 'FamilySize', 'AgeBin_Code', 'FareBin_Code']
        
        df = pd.get_dummies(df[data1_x_bin])
        return df
    
#pipeline = data(id=1,pclass=3,name="Braund, Mr. Owen Harris",sex="male",age=22,sibsp=1,parch=0,ticket="A/5 21171",fare=7.25,cabin="",embarked="S")
 
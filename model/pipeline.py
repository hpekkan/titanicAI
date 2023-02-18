import numpy as np
import pandas as pd
class data:
    def __init__(self, id, pclass,name,sex,age,sibsp,parch,ticket,fare,cabin,embarked):
        self.id = id
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
        self.df=pd.DataFrame({"PassengerId":id,"Pclass":pclass,"Name":name,"Sex":sex,"Age":age,"SibSp":sibsp,"Parch":parch,"Ticket":ticket,"Fare":fare,"Cabin":cabin,"Embarked":embarked})
    def preproccessing(self):
        df = self.df
        df.loc[df.Fare == 0, 'Fare'] = np.nan
        df['Lastname'] = df.Name.str.split(', ').str[0]
        df['Title'] = df.Name.str.split(', ').str[1]
        df['Title'] = df.Title.str.split('.').str[0]
        df[df.Title == 'Mr'].Age.describe()
        df[df.Title == 'Master'].Age.describe()
        females = ['Ms', 'Miss', 'Mlle', 'Mrs', 'Mme']
        df.loc[df.Title.isin(females), 'Title'] = 'Mrs'
        males = ['Master', 'Mr']
        df.loc[(df.Title.isin(males)), 'Title'] = 'Mr'
        df.loc[((df.Title == 'Mr') & (df.Age < 18)), 'Title'] = 'Master'
        df.loc[((df.Title == 'Mrs') & (df.Age < 18)), 'Title'] = 'Miss'
        df.loc[(~df.Title.isin(females) & ~df.Title.isin(males)), 'Title'] = 'Noble'
        df['Ticket_series'] = [i[0] if len(i) > 1 else 0 for i in df.Ticket.str.split()]
        df['Ticket_nr'] = [i[-1] for i in df.Ticket.str.split()]
        df_fare = df[~df.Fare.isna()]
        multi_tickets = df_fare.groupby(df_fare.Ticket_nr[df_fare.Ticket_nr.duplicated()])
        ticket_dict = df.groupby('Ticket_nr').Lastname.count().to_dict()
        df['Passengers_ticket'] = df.Ticket_nr.map(ticket_dict)
        df['Price'] = (df.Fare / df.Passengers_ticket).round()
        df['Deck'] = df.Cabin.str[0]
        df.loc[df.Deck == 'T', 'Deck'] = 'A'
        class_deck_price = pd.DataFrame(df.groupby(['Pclass', 'Deck'])
                                .Price.mean().round(2)).reset_index()
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

        deck_level = {'G': 1, 'F': 2, 'E': 3, 'D': 4, 'C': 5, 'B': 6, 'A': 7}
        df.Deck = df.Deck.replace(deck_level)
        deck_people = df.Deck.value_counts().sort_index().to_dict()
        escape_density = {}
        for i in range(1, 8):
            escape_density[i] = sum(deck_people.values())
            del deck_people[i]
        df['Escape_density'] = df.Deck.replace(escape_density)
        df['Family_size'] = 1 + df.SibSp + df.Parch
        
        
        
        
        
    def pipeline():
        
        return     
    
            
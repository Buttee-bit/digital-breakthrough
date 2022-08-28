import json
from flask import Flask
import os
import docx
import re
import pandas as pd 
import numpy as np
import pickle
from flask_cors import CORS, cross_origin

import matplotlib.pyplot as plt 
import seaborn as sns

from collections import Counter

from sklearn import metrics
from sklearn.svm import SVC, LinearSVC, NuSVC
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB,MultinomialNB,BernoulliNB
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score

import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from nltk.stem import WordNetLemmatizer
from nltk.stem import SnowballStemmer as snow

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/predict')
@cross_origin()
def predict():
    response = []
    def get_model(path_model):
        with open(path_model, 'rb') as file:
            pickle_model = pickle.load(file)
        return pickle_model
    model = get_model('LinearSVC_model_2700.pkl')

    ##  Создание графика распределения по дням для каждой группы
    def load_file(path_to_file):
        doc = docx.Document(path_to_file)
        all_paragraphs = doc.paragraphs
        list_text_doc = [par.text for par in all_paragraphs]
        len_doc_paragraph = len(all_paragraphs)
        return list_text_doc, len_doc_paragraph
    list_text_doc,len_doc_paragraph = load_file('server/public/file.docx')

    def get_dict_class_to_color(path_color):
        dict_class_color ={}
        df = pd.read_csv(path_color)
        df.index = df['Unnamed: 0']
        f_1 = df['f1-score']
        for class_, value in zip(f_1.index, f_1.values):
            if value < .25:
                dict_class_color[class_] = 'black'
            if value < .5 and value > .25:
                dict_class_color[class_] = 'brown'
            if value < .75 and value > 0.5:
                dict_class_color[class_] = 'green'
            if value > .75:
                dict_class_color[class_] = 'blue'

        return dict_class_color




    dict_class_color = get_dict_class_to_color('df_class_rep.csv')
    response.append(dict_class_color)

    def pandas_df_text(text_doc):
        df = pd.DataFrame(text_doc, columns=['text'])
        return df

    df_docx = pandas_df_text(list_text_doc)

    def clear_text(text):
        stop_words = set(stopwords.words('russian'))
        text_cleaning_re = "[A-Za-z0-9!#$%&'()*+,./:;<=>?@[\]^_`{|}~—\"\-]+"
        tokens = []
        text = re.sub(text_cleaning_re, ' ', str(text).lower()).strip()
        text = re.sub(r'\s+', ' ', text)
        for token in text.split():
            if token not in stop_words:
                token = "".join(c for c in token if token.isalnum())
                if len(token) != 2:
                    tokens.append(token)
        return " ".join(tokens)

    def pre_process(text):
        stemmer = snow('russian')
        tokens = []
        for token in text.split():
            tokens.append(stemmer.stem(token))
        return " ".join(tokens)

    texts_ = df_docx.text.apply(lambda x: clear_text(x))
    texts_stemm = texts_.apply(lambda x: pre_process(x))

    #list_keys_mount, list_values_mount = get_list_key_value_mount(data_norm)
    #Возвращает словарь в котором обозначено в каком параграфе какой класс
    def tfidf_text(texts_stemm):
        tfidf_doc = TfidfVectorizer(max_features=2745, ngram_range=(1, 4))
        X = tfidf_doc.fit_transform(texts_stemm)
        Ypredict = model.predict(X)
        Ypredict = Ypredict.tolist()
        range_ = [i for i in range(len(Ypredict))]
        dict_ = {}
        for i in range_:
            dict_[i] = Ypredict[i]
        return dict_
    dict_ = tfidf_text(texts_stemm)

    res = json.dumps(response)
    return res


if __name__ == '__main__':
    app.run(debug=True)
        
        
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import random
import json
import pickle
import numpy as np

import nltk
from nltk.stem import WordNetLemmatizer

app = Flask(__name__)
CORS(app, resources={r"/chat": {"origins": "http://localhost:5173"}}) 
lemmatizer = WordNetLemmatizer()
intents = json.loads(open('intents.json').read())

words = pickle.load(open('words.pkl', 'rb'))
classes = pickle.load(open('classes.pkl', 'rb'))
model = tf.keras.models.load_model("chatbot_model.keras")

def clean_up_sentences(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word) for word in sentence_words]
    return sentence_words

def bag_of_words(sentence):
    sentence_words = clean_up_sentences(sentence)
    bag = [0]*len(words) # to save whther the words of the sentence occur in the corpus
    for w in sentence_words:
        for i, word in enumerate(words):
            if word == w:
                bag[i] = 1
    return np.array(bag)

def predict_class(sentence):
    bow = bag_of_words(sentence)
    res = model.predict(np.array([bow]))[0]
    ERROR_THRESHOLD = 0.25
    result = [[i,r] for i,r in enumerate(res) if r>ERROR_THRESHOLD]  
    result.sort(key=lambda x:x[1], reverse = True)
    return_list = []

    for r in result:
        return_list.append({'intent': classes[r[0]], "probability": str(r[1])})
    return return_list

def get_response(intents_list, intents_json):
    tag = intents_list[0]['intent']
    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if i['tag'] == tag:
            output = random.choice(i['responses'])
            break
    return output

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data["message"].lower()
    ints = predict_class(user_message)
    res = get_response(ints, intents)
    return jsonify(res)

if __name__ == "__main__":
    app.run(port=5000, debug=True)

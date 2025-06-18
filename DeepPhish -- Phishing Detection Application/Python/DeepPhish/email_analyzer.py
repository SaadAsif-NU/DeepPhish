import re
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import pickle
import nltk

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

lemmatizer = WordNetLemmatizer()

# Preprocess the text
def Preprocess(text):
    text = re.sub(r"[^a-zA-Z]", " ", text)
    stop_words = set(stopwords.words("english"))
    words = [word for word in text.split(' ') if word not in stop_words]
    fin = ''
    for x in words:
        fin = fin + x + ' '

    lemma_words = [lemmatizer.lemmatize(o) for o in fin.split(" ")]
    for x in lemma_words:
        fin = fin + x + ' '
    return fin

def lowerChange(text):
    return text.lower()

def pre_input(text):
    text_without_linebreaks = text.replace('\n', " ")
    textlower = lowerChange(text_without_linebreaks)
    text_pre = Preprocess(textlower)
    return text_pre

# Analyze the email
def analyze_email(body):
    pro_text = pre_input(body)
    print("processed", pro_text)

    loaded_model = pickle.load(open('EMail_Detection_98.pkl', 'rb'))
    pred = loaded_model.predict([pro_text])
    
    print("\nPred:", pred)
    if pred == 0:
        print("Secure")
        return 'secure'
    else:
        print("suspicious")
        return "suspicious"
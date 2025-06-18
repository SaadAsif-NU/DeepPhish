import pickle
import numpy as np
from url_features import *

# Function to extract features from the URL
def FeatureExt(url):
    feature = []
    feature.append(UsingIp(url))
    feature.append(longUrl(url))
    feature.append(shortUrl(url))
    feature.append(symbol(url))
    feature.append(prefixSuffix(url))
    feature.append(SubDomains(url))
    feature.append(Hppts(url))
    feature.append(Favicon(url))
    feature.append(RequestURL(url))
    feature.append(AnchorURL(url))
    feature.append(LinksInScriptTags(url))
    feature.append(DisableRightClick(url))
    feature.append(AgeofDomain(url))
    feature.append(GoogleIndex(url))
    feature.append(LinksPointingToPage(url))
    return np.array(feature).reshape(1,15)

# Function to analyze the URL
def analyze_url(url):
    print("Running")
    feat = FeatureExt(url)
    print("url:", url, "feat", feat)
    
    model = pickle.load(open('Phishing Model 96.pkl', 'rb'))
    pred = model.predict(feat)
    
    if pred == 1:
        print("secure")
        return {"is_phishing": False}
    else:
        print("suspicious")
        return {"is_phishing": True}

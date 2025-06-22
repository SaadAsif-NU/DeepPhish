from flask import Flask, jsonify, request
from flask_cors import CORS
from url_analyzer import analyze_url
from email_analyzer import analyze_email
from flask import Flask, request, jsonify

app = Flask(__name__)
CORS(app)

# Home route
@app.route('/', methods=['GET'])
def index():
    return "Server Live!"

# Predict route
@app.route('/predict/url', methods=['GET'])
def get_data():
    data = {
        "verdict": "predictin url",
    }
    return jsonify(data)

@app.route('/predict/dataURL', methods=['POST'])
def get_data_URL():
    data = request.json
    url = data['URL']
    return analyze_url(url)

@app.route('/predict/dataEmail', methods=['POST'])
def get_data_EMAIL():
    data = request.json
    body = data.get('BODY')  # Safely get 'BODY'
    if not body:
        return jsonify({"error": "Email body is missing"}), 400
    return jsonify({"is_suspicious": analyze_email(body)})


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
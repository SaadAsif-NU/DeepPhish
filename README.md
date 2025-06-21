# 🔐 DeepPhish — AI-Powered Phishing Detection System

DeepPhish is a web-based phishing detection system that helps users identify suspicious URLs and emails. It uses Machine Learning and Natural Language Processing (NLP) techniques to flag phishing threats and offers a simple, secure interface with user login and history tracking.

---

## 🚀 Features

- 🔗 **URL Phishing Detection** — Analyze and classify URLs as safe or phishing.
- 📧 **Email Body Analysis** — Check raw email text to detect phishing patterns.
- 👤 **User Authentication** — Register and log in to track your own detection history.
- 🕓 **Scan History** — Review previous URL and email scans with results.

---

## 🧰 Tech Stack

### 💻 Frontend
- React.js
- HTML5 / CSS3

### 🖥 Backend
- Node.js (Express)
- Python (Flask)

### 🤖 Machine Learning
- XGBoost (URL Detection)
- Multinomial Naive Bayes (Email Text Detection)
- CountVectorizer for NLP processing

### 🛢 Database
- MongoDB (Mongoose)

---

## 📂 Project Structure

```

DeepPhish/
├── backend/       # Node.js API for user management and detection logic
├── backend/data   # Pre-labeled phishing and safe URLs
├── python/        # Flask server with ML models
├── frontend/      # React app for UI


````

---

### ⚙️ Setup Instructions
### GO into main directory DeepPhish -- Phishing Detection Application

### 1. Start Backend (Node.js)
Make sure your MongoDB is running locally.
```bash
cd backend
npm install #for first time
node app.js
```

Make sure `.env` file is configured correctly:

```env
PORT=####
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/DeepPhish
```
for example i used it as
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/phishingdb


### 2. Start Python ML Server (Flask)

```bash
cd ../python
cd DeepPhish
pip install -r requirements.txt 
python app.py
```

### 3. Start Frontend (React)

```bash
cd ../React/front-end
npm install         # only if node_modules was deleted
npm start
```

---

## 🔒 Signup / Login Info

### 🔐 Password Format

* Minimum 8 characters 
* Must include one number and one special character
* Example: `Secure@123`

### ✅ Email Format

* Must be in standard format (e.g., `user@example.com`)

---

## 🧪 How to Use

1. **Signup/Login** to your account.
2. Navigate to:

   * **Check URL** — Enter a website link.
   * **Check Email** — Paste the email content/body.
3. The system will return:

   * `Phishing` or `Safe`
4. Go to **View History** to see all previously scanned results.

---


## 🧭 Future Scope

* SMS Phishing Detection
* Admin dashboard
* Chrome extension
* Real-time alert system

---

## 🧑‍💻 Author

**Saad Asif**
Final Year CS Student | Cybersecurity, AL, ML & Full Stack Enthusiast
LinkedIn: [https://www.linkedin.com/in/saadasif-nu/](https://www.linkedin.com/in/saadasif-nu/)


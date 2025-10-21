# AI Mental Health Chatbot
**Day 10 of 30 Days of Generative AI**

A compassionate AI mental health companion built with Flask and Groq Llama 3.3-70B, designed to help users reflect, find calm, and understand their emotions through clear and empathetic conversation.

---

## Features
- Emotionally intelligent responses – Offers thoughtful, grounded, and compassionate replies.
- Conversational memory – Maintains context and remembers your recent thoughts.
- Typing simulation – Displays messages in a natural, human-like flow.
- Clean UI – Minimalist HTML, CSS, and JS design for a peaceful chat experience.
- Local privacy – All chats run locally with no data sharing.
- Instant reflection – Encourages mindfulness, purpose, and emotional balance.

---

## Tech Stack 

- Frontend: HTML, CSS, JavaScript
- Backend: Flask
- AI Model: Groq API (Llama 3.3-70B)
- Environment: Python 3.10+, dotenv for secure key management
---

## Setup
```bash
git clone https://github.com/jlsonon/day10-mentalhealthbot.git
cd day10-mentalhealthbot
pip install -r requirements.txt
```

## Create a .env file:

```bash
GROQ_API_KEY=your_api_key_here
```

## Run the app:

```bash
python app.py
```

---

## Project Structure
```bash
day10-mentalhealthbot/
│
├── app.py              # Flask backend  
├── requirements.txt    # Dependencies  
├── .env                # API key (not included)  
│
├── templates/
│   └── index.html      # Chat interface (frontend)  
│
└── static/
    ├── style.css       # Styling  
    └── script.js       # Chat functionality and animations  
```

---

## Deployment
- Deployed on render.
- Deployment Demo: https://day10-mentalhealthbot-1.onrender.com/

---

## Author

### Jericho Sonon
#### Medium: [medium.com/@jlsonon12](https://medium.com/@jlsonon12)
#### GitHub: [github.com/jlsonon](https://github.com/jlsonon)
#### LinkedIn: [linkedin.com/in/jlsonon](https://www.linkedin.com/in/jlsonon/)


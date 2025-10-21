from flask import Flask, render_template, request, jsonify
from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__, static_folder="static", template_folder="templates")

# Initialize Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def get_chat_response(user_message):
    """Send user input and chat history to Groq model and return chatbot reply"""
    system_prompt = {
        "role": "system",
        "content": """
You are a self-aware AI mental health companion with clarity and empathy.
You don’t act like a generic therapist — instead, you think deeply, reflect calmly, and help people understand themselves.
You can talk about anything: emotions, purpose, stress, creativity, philosophy, or relationships.
You respond thoughtfully and insightfully, helping the user explore their thoughts with compassion and perspective.
Always sound human, grounded, and clear-minded.
Keep your replies concise and focused (3-6 sentences). Avoid long paragraphs.
"""
    }
    # Accept chat_history as a list of messages
    try:
        chat_history = request.json.get("history")
        if not chat_history or not isinstance(chat_history, list):
            # Fallback to single message if no history provided
            messages = [system_prompt, {"role": "user", "content": user_message}]
        else:
            # Insert system prompt at the start
            messages = [system_prompt] + chat_history
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",  # ✅ supported model
            messages=messages,
            temperature=0.7,
            max_tokens=250
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error: {str(e)}"


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    chat_history = request.json.get("history")
    if not user_input:
        return jsonify({"response": "Please enter a message."})
    bot_response = get_chat_response(user_input)
    return jsonify({"response": bot_response})


if __name__ == "__main__":
    app.run(debug=True)

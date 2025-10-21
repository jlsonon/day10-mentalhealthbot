document.addEventListener("DOMContentLoaded", () => {
    const sendBtn = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    // Maintain chat history as an array of {role, content}
    const chatHistory = [];

    async function sendMessage() {
        const userText = userInput.value.trim();
        if (!userText) return;

    // Prevent multiple sends while a response is pending
    if (sendBtn.disabled) return;
    sendBtn.disabled = true;

        appendMessage("You", userText, "user-msg");
        chatHistory.push({ role: "user", content: userText });
        userInput.value = "";

        const botPlaceholder = appendMessage("Bot", "Typing...", "bot-msg");

        try {
            const response = await fetch("/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userText, history: chatHistory }),
            });

            const data = await response.json();

            // Start typing effect once we have the full response
            botPlaceholder.textContent = "Bot: ";
            const text = data.response || "";

            // Add bot response to chat history
            chatHistory.push({ role: "assistant", content: text });

            // Use a faster typing speed for longer responses
            const typingSpeed = text.length > 100 ? 10 : 20;
            let index = 0;

            const interval = setInterval(() => {
                if (index < text.length) {
                    botPlaceholder.textContent += text.charAt(index);
                    index++;
                    // Scroll to the bottom as the text appears
                    chatBox.scrollTop = chatBox.scrollHeight;
                } else {
                    clearInterval(interval);
                    // Final scroll to ensure we're at the bottom
                    chatBox.scrollTop = chatBox.scrollHeight;
                    // Re-enable send button now that bot finished
                    sendBtn.disabled = false;
                }
            }, typingSpeed);
        } catch (error) {
            botPlaceholder.textContent = "Bot: Error connecting to server.";
            // Re-enable send button on error
            sendBtn.disabled = false;
        }

        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function appendMessage(sender, text, className) {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add(className);
        msgDiv.textContent = `${sender}: ${text}`;
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        return msgDiv;
    }

    // Auto-expand textarea as user types
    userInput.addEventListener("input", function() {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
    });
    // Enter to send, Shift+Enter for newline
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    sendBtn.addEventListener("click", sendMessage);
});

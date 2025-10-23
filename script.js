class Chatbot {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        this.messageInput.addEventListener('input', () => {
            this.sendButton.disabled = this.messageInput.value.trim().length === 0;
        });
        
        this.sendButton.disabled = true;
    }
    
    // This would connect with the Gemini API and streaming
    sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        this.messageInput.value = '';
        this.sendButton.disabled = true;
        
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.hideTypingIndicator();
            this.generateBotResponse(message);
        }, 1000 + Math.random() * 1500);
    }
    
    addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = message;
        
        messageDiv.appendChild(messageContent);
        this.chatMessages.appendChild(messageDiv);
        
        this.scrollToBottom();
    }
    
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-message';
        typingDiv.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        const typingMessage = this.chatMessages.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }
    
    // To do during the workshop: Connect this to the Gemini API and stream responses.
    generateBotResponse(userMessage) {
        // const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`
            
        const responses = [
            "That's an interesting question! I'd be happy to help you with that.",
            "I understand what you're asking. Let me think about this for a moment.",
            "Thanks for sharing that with me. Here's what I think...",
            "That's a great point you've brought up. Let me provide some insight.",
            "I appreciate you asking! This is definitely something I can help with.",
            "Interesting perspective! Let me share some thoughts on that.",
            "I see what you mean. Here's how I would approach this:",
            "Thanks for the question! This is actually quite common, and here's what I suggest:",
        ];
        
        const contextualResponses = {
            'hello': "Hello there! It's great to meet you. How can I assist you today?",
            'hi': "Hi! I'm here and ready to help. What would you like to chat about?",
            'how are you': "I'm doing great, thank you for asking! I'm here and ready to help you with anything you need.",
            'help': "I'm here to help! You can ask me questions about almost anything, and I'll do my best to provide useful answers.",
            'what can you do': "I can help with a wide variety of topics! Try asking me questions, having conversations, or requesting assistance with tasks.",
            'bye': "Goodbye! It was nice chatting with you. Feel free to come back anytime!",
            'thanks': "You're very welcome! I'm glad I could help. Is there anything else you'd like to know?",
        };
        
        const lowerMessage = userMessage.toLowerCase();
        let response;
        
        for (const [key, value] of Object.entries(contextualResponses)) {
            if (lowerMessage.includes(key)) {
                response = value;
                break;
            }
        }
        
        if (!response) {
            response = responses[Math.floor(Math.random() * responses.length)];
        }
        
        this.addMessage(response, 'bot');
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});

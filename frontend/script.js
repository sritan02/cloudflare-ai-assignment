const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');

sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

async function sendMessage() {
  const message = chatInput.value.trim();
  
  if (!message) return;
  
  // Disable input and button
  chatInput.disabled = true;
  sendButton.disabled = true;
  
  // Display user message
  const userMessage = document.createElement('div');
  userMessage.className = 'message user';
  userMessage.textContent = message;
  chatMessages.appendChild(userMessage);
  
  // Clear input
  chatInput.value = '';
  
  // Create typing indicator
  const typingIndicator = document.createElement('div');
  typingIndicator.className = 'typing-indicator';
  typingIndicator.innerHTML = '<span></span><span></span><span></span>';
  chatMessages.appendChild(typingIndicator);
  
  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  // Fetch AI response
  try {
    const response = await fetch('http://localhost:8787', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: message })
    });
    
    const data = await response.json();
    
    // Remove typing indicator
    typingIndicator.remove();
    
    // Display AI message
    const aiMessage = document.createElement('div');
    aiMessage.className = 'message ai';
    aiMessage.textContent = data.response;
    chatMessages.appendChild(aiMessage);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  } catch (error) {
    console.error('Error:', error);
    typingIndicator.remove();
  } finally {
    // Re-enable input and button
    chatInput.disabled = false;
    sendButton.disabled = false;
    chatInput.focus();
  }
}

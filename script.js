
const textarea = document.getElementById('chat-text-area');
const chatInput = document.getElementById('chat-input');
const chatLog = document.getElementById('chat-log');
const send = document.getElementById('send');
let botTimeout; // Bot response timeout
/* textarea.addEventListener('input', function() {
  this.style.height = 'auto'; // Reset the height to auto
  const newHeight = this.scrollHeight; // Calculate the new height
  this.style.height = newHeight + 'px'; // Apply new height
  
  // Transform to expand upwards
  const offset = newHeight - this.offsetHeight;
  this.style.transform = `translateY(-${offset}px)`; // Adjust using translateY
}); */

textarea.addEventListener('input', function() {
  this.style.height = 'auto'; // Reset the height to auto
  this.style.height = this.scrollHeight + 'px'; // Set height based on scrollHeight

  // Adjust position to expand upwards
  const bottomOffset = window.innerHeight - (this.offsetTop + this.offsetHeight);
  this.style.bottom = `${bottomOffset}px`;
});

chatInput.addEventListener('submit', (e) => {
  e.preventDefault();
  addGroupNode('mine', textarea.value); // Add user's message
  textarea.value = '';
  textarea.style.height = 'auto'; // Reset the height to auto
})  
chatInput.addEventListener('keydown', (e) => {  
  if (e.key === 'Enter' && !e.shiftKey) {
    // Prevent the default action (sending the message) if Shift is not pressed
    e.preventDefault();
    addGroupNode('mine', textarea.value); // Add user's message
    textarea.value = ''; // Clear the textarea after sending the message
    textarea.style.height = 'auto'; // Reset the height to auto
  } else if (e.key === 'Enter' && e.shiftKey) {
    // Allow the default behavior of Enter + Shift, which creates a new line
    e.preventDefault();
    const cursorPos = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, cursorPos) + "\n" + textarea.value.slice(cursorPos);
    textarea.selectionEnd = cursorPos + 1; // Move the cursor to the next line
    textarea.style.height = 'auto'; // Reset the height to auto
    textarea.style.height = textarea.scrollHeight + 'px'; // Set height based on scrollHeight

    // Adjust position to expand upwards
    const bottomOffset = window.innerHeight - (textarea.offsetTop + textarea.offsetHeight);
    textarea.style.bottom = `${bottomOffset}px`;
  }

  // Reset the bot typing timeout each time the user types
  clearTimeout(botTimeout);
  botTimeout = setTimeout(() => {
    addGroupNode('others', "Bot response!"); // Add bot message
  }, 3000);
})

function addChatNode(text){
  const chatNode = document.createElement('div');
  chatNode.innerText = text;
  chatNode.classList.add('message');
  return chatNode;
}

// Function to handle message creation and grouping
function addGroupNode(sender, text) {
  let lastMessageGroup = chatLog.lastElementChild;
  let messageGroup; 
  // Check if the last group of messages is from the same sender
  if (!lastMessageGroup || !lastMessageGroup.classList.contains(sender)) {
    messageGroup = document.createElement('div');
    messageGroup.classList.add(sender); // Add 'mine' or 'others' class
    chatLog.appendChild(messageGroup); // Append new message group
    lastMessageGroup = messageGroup;
    
  }
  console.log(lastMessageGroup);
  lastMessageGroup.appendChild(addChatNode(text)); // Add the chat node to the new message group
}
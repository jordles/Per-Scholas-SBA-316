
const textarea = document.getElementById('chat-text-area');
const chatInput = document.querySelector('#chat-input');
const chatLog = document.getElementById('chat-log');
const send = document.getElementById('send');
const signIn = document.getElementById('sign-in');
const error = document.getElementById('error-display');
const users = document.getElementById('users');


window.name = 'Private Room 1'; 
document.title = window.name;
document.querySelector('#title').textContent = window.name; 

signIn.addEventListener('submit', validate);

function validate(e){
  e.preventDefault();
  const name = document.querySelector('#name').value;
  const password = document.querySelector('#password').value;
  if(name.trim() === ''){
    errorHandler('Name cannot be blank!');
  }
  else if(password.trim() === ''){
    errorHandler('Password cannot be blank!');
  }
  else if(password !== 'corn304'){
    errorHandler('Incorrect password!');
  }
  else{
    this.style.display = 'none';
    users.appendChild(addUser(name));
    setTimeout(() => alert(`
    Remember! When chatting in a lobby: 
    Be civil and respectful
    Stick to the topic
    Questions welcome
    No self-promotion or spam

    - The Root Team 
    `), 1000);
  }
}

function errorHandler(err){
  error.textContent = err;
  error.style.display = 'block';
  setTimeout(() => error.style.display = 'none', 2000);
}

let botTimeout; // Bot response timeout

let bots = ['Julia', 'Karen', 'Dave', 'Jason']
let randomBotName, randomBotImage, findBotImage;
bots.forEach(bot => users.appendChild(addUser(bot))); // Add all bots to the users list



function addUser(user){
  const frag = document.createDocumentFragment();
  const userNode = document.createElement('div');
  const userImage = document.createElement('img');
  const randomSeed = Math.floor(Math.random() * 10000); // Create a random seed value
  userImage.src = `https://avatar.iran.liara.run/public?seed=${randomSeed}`;

  const userName = document.createElement('div');
  userName.textContent = user;
  userNode.appendChild(userImage);
  userNode.appendChild(userName);
  userNode.classList.add('user');
  frag.appendChild(userNode);
  return frag;
}
/* textarea.addEventListener('input', function() {
  this.style.height = 'auto'; // Reset the height to auto
  const newHeight = this.scrollHeight; // Calculate the new height
  this.style.height = newHeight + 'px'; // Apply new height
  
  // Transform to expand upwards
  const offset = newHeight - this.offsetHeight;
  this.style.transform = `translateY(-${offset}px)`; // Adjust using translateY
}); */

function createGroupNodeDetails(lastMessageGroup, image, name){
  

  if(lastMessageGroup.classList.contains('others')){
    

    // Remove the image and name, but leave the message content
    const messages = [...lastMessageGroup.childNodes];
    messages.forEach((message) => {
      /* const messageChildNodes = [...message.childNodes];

      // Remove image and name from all messages **UNUSED NOT THE RIGHT LOGIC** 
      messageChildNodes.forEach(node => {
        if (node.tagName === 'IMG' || (node.tagName === 'DIV' && node.textContent === name)) {
          message.removeChild(node);  // Remove image or bot name if present
        }
      }); */

      let child = message.firstChild;

      while (child) {
        let nextChild = child.nextSibling;  // Store reference to the next sibling before possibly removing the current one
        if (child.nodeType === Node.ELEMENT_NODE) {
          message.removeChild(child);
        }
        child = nextChild;
      }
    });
    
    lastMessageGroup.lastElementChild.appendChild(image.cloneNode(true));
    lastMessageGroup.lastElementChild.appendChild(name.cloneNode(true));
  }
  else if(lastMessageGroup.classList.contains('mine')){

    // Remove the image and name, but leave the message content
    const messages = [...lastMessageGroup.childNodes];
    messages.forEach((message) => {
      let child = message.firstChild;

      while (child) {
        let nextChild = child.nextSibling;  // Store reference to the next sibling before possibly removing the current one
        if (child.nodeType === Node.ELEMENT_NODE) {
          message.removeChild(child);
        }
        child = nextChild;
      }
    });

    const usersList = document.querySelectorAll('.user');
    const users = [...usersList];
    console.log(users);
    const user = users[users.length - 1]
    console.log(user);
    lastMessageGroup.lastElementChild.appendChild(user.querySelector('img').cloneNode(true));
    lastMessageGroup.lastElementChild.appendChild(user.querySelector('div').cloneNode(true)); 
  }
  
}

textarea.addEventListener('input', function() {
  this.style.height = 'auto'; // Reset the height to auto
  this.style.height = this.scrollHeight + 'px'; // Set height based on scrollHeight

  // Adjust position to expand upwards
  const bottomOffset = window.innerHeight - (this.offsetTop + this.offsetHeight);
  this.style.bottom = `${bottomOffset}px`;
});

chatInput.addEventListener('submit', submitHandler);  
let lastBotName = ''; // Track the last bot who sent a message
function submitHandler(e){
  e.preventDefault();
  const lastMessageGroup = addGroupNode('mine', textarea.value); // Add user's message
  createGroupNodeDetails(lastMessageGroup);
  textarea.value = '';
  textarea.style.height = 'auto'; // Reset the height to auto
}
chatInput.addEventListener('keydown', keyDownHandler);
function keyDownHandler(e){
  
  if (e.key === 'Enter' && !e.shiftKey) {
    // Prevent the default action (sending the message) if Shift is not pressed
    e.preventDefault();
    const lastMessageGroup = addGroupNode('mine', textarea.value); // Add user's message
    createGroupNodeDetails(lastMessageGroup);
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
    const userNames = document.querySelectorAll('.user > div');
    console.log(userNames);
    randomBotName = bots[Math.floor(Math.random() * bots.length)]; // Pick a random bot
    console.log(randomBotName);
    findBotName = [...userNames].find(name =>{ if(name.textContent === randomBotName) return name.previousElementSibling; });
    console.log(findBotName);
    randomBotImage = findBotName.previousElementSibling;
    console.log(randomBotImage);

    /* let lastMessageGroup = addGroupNode('others', "Bot response!"); // Add bot message
    createGroupNodeDetails(lastMessageGroup, randomBotImage, findBotName);
    lastMessageGroup = addGroupNode('others', "Bot response!"); // Add bot message
    createGroupNodeDetails(lastMessageGroup, randomBotImage, findBotName); */
    // If a different bot is chosen, create a new message group
    const messageCount = Math.floor(Math.random() * 3) + 1;
    let messageSent = 0;

    // Function to send each bot message
    const sendBotMessage = () => {
        // If a different bot is chosen, create a new message group
        let lastMessageGroup = chatLog.lastElementChild;
        if (randomBotName !== lastBotName || !lastMessageGroup || !lastMessageGroup.classList.contains('others')) {
            lastMessageGroup = addGroupNode('others', "Bot response!"); // Create new bot group
            createGroupNodeDetails(lastMessageGroup, randomBotImage, findBotName);
            lastBotName = randomBotName; // Update the last bot name
        } else {
            // Add message to the existing bot group
            lastMessageGroup = addGroupNode('others', "Bot response!"); 
            createGroupNodeDetails(lastMessageGroup, randomBotImage, findBotName);
        }

        // Increment the message sent counter
        messageSent++;

        // If the bot has sent all messages, clear the interval
        if (messageSent >= messageCount) {
            clearInterval(botMessageInterval);
        }
    };

    // Use setInterval to simulate typing multiple messages with delay
    const botMessageInterval = setInterval(sendBotMessage, 800); // Send each message with a delay of 1.5 seconds
  }, 3000);
}
function addChatNode(text){
  const frag = document.createDocumentFragment();
  const chatNode = document.createElement('div');
  const atWordRegex = /(@\w+)(?=\s|$)/g; //match any word starting with @, and look ahead for the next space or end of string

  // Replace matched words with a span element
  const formattedText = text.replace(atWordRegex, function(match) {
    const span = document.createElement('span');
    span.textContent = match;
    span.setAttribute('style', 'font-weight: bold;'); 
    return span.outerHTML;
  });

  chatNode.innerHTML = formattedText;
  chatNode.classList.add('message');
  chatNode.style.whiteSpace = 'pre-wrap'; // This will preserve spaces, tabs, and newlines
  frag.appendChild(chatNode);
  return frag;
}

// Function to handle message creation and grouping
function addGroupNode(sender, text) {
  let lastMessageGroup = chatLog.lastElementChild;
  let messageGroup; 
  // Check if the last group of messages is from the same sender
  console.log('sender', sender)
  console.log('randomBotName', randomBotName);
  console.log('lastBotName', lastBotName);
  if (!lastMessageGroup || !lastMessageGroup.classList.contains(sender) ||(sender === 'others' && randomBotName !== lastBotName)) {
    console.log('creating our others group here...')
    messageGroup = document.createElement('div');
    messageGroup.classList.add(sender); // Add 'mine' or 'others' class
    chatLog.appendChild(messageGroup); // Append new message group
    lastMessageGroup = messageGroup;
  }
  console.log(lastMessageGroup);
  lastMessageGroup.appendChild(addChatNode(text)); // Add the chat node to the new message group

  // Scroll to the bottom of the chat log after adding a new message
  chatLog.scrollTop = chatLog.scrollHeight;
  return lastMessageGroup;
}
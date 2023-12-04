const socket = io('http://localhost:3000');
const msgBox = document.getElementById('exampleFormControlTextarea1');
const msgCont = document.getElementById('data-container');
const email = document.getElementById('email');

const messages = [];

function getMessages() {
  const res = socket.emit('get-messages');
  messages.push(...res);
}

function sendMessage(message) {
  socket.emit('message', message);
}

function handleKeyDown(e) {
  if (e.keyCode === 13) {
    sendMessage({ username: email.value, message: e.target.value });
    e.target.value = '';
  }
}

function loadData(data) {
  const messagesHTML = data
    .map(
      ({ username, message }) => `
    <li class="bg-primary p-2 rounded mb-2 text-light">
      <span class="fw-bolder">${username}: </span>
      ${message}
    </li>
  `,
    )
    .join('');

  msgCont.innerHTML = messagesHTML;
}

socket.on('new-message', (message) => {
  messages.push(message);
  loadData(messages);
});

msgBox.addEventListener('keydown', handleKeyDown);
getMessages();

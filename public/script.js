const botaoEnviar = document.getElementById('enviar');
const caixaMensagem = document.getElementById('texto');
const chat = document.getElementById('mensagens');

const socket = io();

botaoEnviar.addEventListener('click', () => {
    if (caixaMensagem.value !== ""){ // se é diferente de "vazio"
        socket.emit('nova mensagem', caixaMensagem.value); // emita a mensagem da caixa de mensagem
        caixaMensagem.value = ""; // a caixa de mensagem volta a ser vazia
    }
})

socket.addEventListener('nova mensagem', (msg) => {
    const elementoMensagem = document.createElement('li') // cria a mensagem que vai aparecer na tela
    elementoMensagem.textContent = msg;
    elementoMensagem.classList.add('mensagem');
    chat.appendChild(elementoMensagem) // adiciona a mensagem no chat dentro da div com o id 'mensagens'
})

document.getElementById('texto').onkeydown = function(event) {
    // Verifica se a tecla pressionada é Enter (código 'Enter')
    if (event.key === 'Enter') {
      event.preventDefault(); // Evita que a quebra de linha seja inserida na caixa de texto
      if (caixaMensagem.value.trim() !== "") { // Verifica se a caixa de mensagem não está vazia
        socket.emit('nova mensagem', caixaMensagem.value); // Emite a mensagem da caixa de mensagem
        caixaMensagem.value = ""; // A caixa de mensagem volta a ser vazia
      }
    }
  };
  
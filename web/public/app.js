const socket = io();

// DOM Elements
const instructionInput = document.getElementById('instructionInput');
const submitBtn = document.getElementById('submitBtn');
const logConsole = document.getElementById('logConsole');
const diffModal = document.getElementById('diffModal');
const diffViewer = document.getElementById('diffViewer');
const diffDescription = document.getElementById('diffDescription');
const approveBtn = document.getElementById('approveBtn');
const rejectBtn = document.getElementById('rejectBtn');

// Enviar tarefa
submitBtn.addEventListener('click', () => {
    const instruction = instructionInput.value.trim();
    if (instruction) {
        addLog('system', `Iniciando tarefa: "${instruction}"`);
        socket.emit('task:submit', instruction);
        instructionInput.value = '';
        submitBtn.disabled = true;
    }
});

// Eventos de Log
socket.on('workflow:started', (data) => {
    addLog('system', 'Workflow iniciado...');
});

socket.on('agent:status', (data) => {
    addLog(data.agent, data.status);
});

socket.on('agent:completed', (data) => {
    addLog(data.agent, `Etapa concluída: ${data.result}`);
});

socket.on('workflow:finished', (data) => {
    addLog('system', `FINALIZADO: ${data.message}`);
    submitBtn.disabled = false;
});

socket.on('workflow:error', (data) => {
    addLog('system', `ERRO: ${data.message}`);
    submitBtn.disabled = false;
});

// Evento de Aprovação do Forge
socket.on('forge:requires_approval', (data) => {
    showDiffModal(data);
});

function addLog(agent, message) {
    const entry = document.createElement('div');
    entry.className = `log-entry ${agent}`;
    const timestamp = new Date().toLocaleTimeString();
    entry.innerHTML = `<span class="time">[${timestamp}]</span> <strong>${agent}:</strong> ${message}`;
    logConsole.appendChild(entry);
    logConsole.scrollTop = logConsole.scrollHeight;
}

function showDiffModal(data) {
    diffDescription.textContent = `O agente Forge propôs alterações em: ${data.filePath}\nMotivo: ${data.explanation}`;
    
    // Renderização simples de diff colorido
    const diffLines = data.diff.split('\n');
    diffViewer.innerHTML = '';
    
    diffLines.forEach(line => {
        const div = document.createElement('div');
        if (line.startsWith('+') && !line.startsWith('+++')) {
            div.className = 'diff-added';
            div.textContent = line;
        } else if (line.startsWith('-') && !line.startsWith('---')) {
            div.className = 'diff-removed';
            div.textContent = line;
        } else if (line.startsWith('@@')) {
            div.className = 'diff-header';
            div.textContent = line;
        } else {
            div.textContent = line;
        }
        diffViewer.appendChild(div);
    });

    diffModal.style.display = 'block';
}

approveBtn.addEventListener('click', () => {
    socket.emit('forge:approved');
    diffModal.style.display = 'none';
    addLog('system', 'Alterações aprovadas pelo usuário.');
});

rejectBtn.addEventListener('click', () => {
    socket.emit('forge:rejected');
    diffModal.style.display = 'none';
    addLog('system', 'Alterações rejeitadas pelo usuário.');
});

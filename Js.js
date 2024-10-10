document.addEventListener('DOMContentLoaded', () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const listContainer = document.getElementById('list');
    const clearBtn = document.getElementById('clearBtn');
    const randomImagesContainer = document.getElementById('random-images');

    // Função para salvar estado no localStorage
    const saveData = () => {
        const tasks = [];
        document.querySelectorAll('.item').forEach(item => {
            const letter = item.querySelector('label').textContent;
            const text = item.querySelector('input[type="text"]').value;
            const isChecked = item.querySelector('input[type="checkbox"]').checked;
            tasks.push({ letter, text, isChecked });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Função para carregar dados salvos
    const loadData = () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(task => {
            createItem(task.letter, task.text, task.isChecked);
        });
    };

const createItem = (letter, text = '', isChecked = false) => {
    const item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `
        <label for="${letter.toLowerCase()}">${letter}</label>
        <input type="text" id="${letter.toLowerCase()}" value="${text}" placeholder="Digite algo..." class="${isChecked ? 'completed' : ''}">
        <label class="checkbox-btn">
            <input id="${letter.toLowerCase()}-check" type="checkbox" ${isChecked ? 'checked' : ''}>
            <span class="checkmark"></span>
        </label>
    `;
    listContainer.appendChild(item);

    const checkbox = item.querySelector('input[type="checkbox"]');
    const textInput = item.querySelector('input[type="text"]');

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            textInput.classList.add('completed');
        } else {
            textInput.classList.remove('completed');
        }
        saveData();
    });

    textInput.addEventListener('input', saveData);
};

    
    

     

    // Gerar lista de A a Z se não houver dados salvos
    const generateList = () => {
        alphabet.forEach(letter => {
            createItem(letter);
        });
    };

    // Função para limpar todos os dados
    const clearAll = () => {
    };

    // Adicionar evento ao botão de limpar
    clearBtn.addEventListener('click', clearAll);

    // Carregar dados salvos ou gerar nova lista
    if (localStorage.getItem('tasks')) {
        loadData();
    } else {
        generateList();
    }

    // Função para gerar posições aleatórias no viewport
    const getRandomPosition = () => {
        const x = Math.random() * (window.innerWidth - 80); // Menos o tamanho da imagem
        const y = Math.random() * (window.innerHeight - 80); // Menos o tamanho da imagem
        return { x, y };
    };

    // Função para adicionar 20 imagens aleatórias
    const addRandomImages = () => {
        const imageUrls = [
            'imagens/leo.jpg',
            'imagens/tata.jpg',
            'imagens/capacete.jpg',
            'imagens/bebida.jpg',
            'imagens/cabelo.jpg',
            'imagens/estilo.jpg',
            'imagens/moto.jpg',
            'imagens/tataedog.jpg',
            'imagens/thumb.jpg',
            'imagens/us.jpg',
        ];

        for (let i = 0; i < 26; i++) {
            const img = document.createElement('img');
            const { x, y } = getRandomPosition();
            img.src = imageUrls[Math.floor(Math.random() * imageUrls.length)];
            img.style.left = `${x}px`;
            img.style.top = `${y}px`;
            randomImagesContainer.appendChild(img);
        }
    };

    // Chamar a função para adicionar as imagens
    addRandomImages();
});

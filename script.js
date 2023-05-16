const showPhraseButton = document.getElementById('show-phrase-button');
const modalPhrase = document.querySelector('.card');
const closePhraseButton = document.querySelector('#close-phrase-button');

showPhraseButton.addEventListener('click', () => {
    modalPhrase.classList.add('show');
});

closePhraseButton.addEventListener('click', () => {
    modalPhrase.classList.remove('show');
});


const form = document.querySelector('form');
const taskList = document.querySelector('.a-list');
const addTaskButton = document.getElementById('add-task-button');
const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('#close-button');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskInput = form.querySelector('input[type="text"]');
    const taskDescriptionTextarea = form.querySelector('textarea');
    const taskText = taskInput.value.trim();
    const taskDescriptionText = taskDescriptionTextarea.value.trim();
    if (taskText !== '') {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
      <div>
        <h3>${taskText}</h3>
        <button class="material-icons" id="remove-button">delete_outline</button>
      </div>
      <div>
            <div id="description">
		        <div class="description-button">
	                <button id="description-button" />
	                    <span id="visible-button">
	                        <p>Ler descrição</p>
	                        <i class="material-icons">expand_more</i>
	                    </span>
	                    <span id="hidden-btn">
	                        <p>Esconder descrição</p>
	                        <i class="material-icons">expand_less</i>
	                    </span>
                    </button>
		        </div>
                <p class="hidden">${taskDescriptionText}</p>
            </div>
            <div class="status">
                <button id="back-button">
                    <i class="material-icons">navigate_before</i>
                </button>
                <button id="advance-btn">
                    <i class="material-icons">navigate_next</i>
                </button>
            </div>
        </div>
    `;
        taskList.appendChild(taskItem);
        taskInput.value = '';
        taskDescriptionTextarea.value = '';

        const showDescripiontButton = taskItem.querySelector('.description-button');
        if (taskDescriptionText === '') {
            showDescripiontButton.style.display = 'none'
        }

        const descriptionBtn = taskItem.querySelector('#description-button');
        const description = taskItem.querySelector('#description');
        const descriptionText = taskItem.querySelector('#description p.hidden');

        descriptionBtn.addEventListener('click', () => {
            description.classList.toggle('visible');
            descriptionText.style.display = description.classList.contains('visible') ? 'flex' : 'none';
        });

        const advanceButton = taskItem.querySelector('#advance-button');
        advanceButton.addEventListener('click', () => {
            const currentList = taskItem.parentElement;
            if (currentList.classList.contains('a-list')) {
                const eList = document.querySelector('.e-list');
                eList.appendChild(taskItem);
                advanceButton.querySelector('.material-icons').textContent = 'navigate_next';
            } else if (currentList.classList.contains('e-list')) {
                const fList = document.querySelector('.f-list');
                fList.appendChild(taskItem);
                advanceButton.querySelector('.material-icons').textContent = 'replay';
                taskItem.querySelector('h3').classList.add('completed');
            } else if (currentList.classList.contains('f-list')) {
                const aList = document.querySelector('.a-list');
                aList.appendChild(taskItem);
                advanceButton.querySelector('.material-icons').textContent = 'navigate_next';
                taskItem.querySelector('h3').classList.remove('completed');
            }
        });
        const backButton = taskItem.querySelector('#back-button');
        backButton.addEventListener('click', () => {
            const currentList = taskItem.parentElement;
            if (currentList.classList.contains('e-list')) {
                const aList = document.querySelector('.a-list');
                aList.appendChild(taskItem);
            } else if (currentList.classList.contains('f-list')) {
                const eList = document.querySelector('.e-list');
                eList.appendChild(taskItem);
                advanceButton.querySelector('.material-icons').textContent = 'navigate_next';
                taskItem.querySelector('h3').classList.remove('completed');
            }
        });
        
        const removeButton = taskItem.querySelector('#remove-button');
        removeButton.addEventListener('click', () => {
            const confirmation = confirm('Tem certeza que deseja excluir esta tarefa?');
            if (confirmation) {
                taskItem.remove();
            }
        });
    }
});

addTaskButton.addEventListener('click', () => {
    modal.classList.add('show');
});

closeModalButton.addEventListener('click', () => {
    modal.classList.remove('show');
});

form.addEventListener('submit', () => {
    modal.classList.remove('show');
});
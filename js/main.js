//
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList')


let tasks = [];


if(localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => renderTask(task));
}



checkEmptyList();


// add tasks

form.addEventListener('submit', addTask);

tasksList.addEventListener('click', deleteTask);

tasksList.addEventListener('click', doneTask);


// functions

function addTask(event) {
    //  Отменяем отправку формы

    event.preventDefault();


    //  Достаем текст задачи из поля ввода

    const taskText = taskInput.value;


    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    }


    tasks.push(newTask);


    saveToLocalStorege()


    renderTask(newTask);


    // Очищаем поле ввода ивозвращаем на него фокус

    taskInput.value = "";
    taskInput.focus();

    checkEmptyList()

}


function deleteTask(event) {
    if(event.target.dataset.action !== 'delete') return

    const parentNode = event.target.closest('.list-group-item');

    const id = Number(parentNode.id);

    const index = tasks.findIndex((task) => {
        return task.id === id
    });


    saveToLocalStorege()

    tasks.splice(index, 1);

    parentNode.remove()

    checkEmptyList()

}


function doneTask(event) {
    if(event.target.dataset.action !== 'done') return

    const parentNode = event.target.closest('.list-group-item');


    const id = Number(parentNode.id);

    const task = tasks.find((task) => {
        return task.id === id
    });

    task.done = !task.done


    saveToLocalStorege()


    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.add('task-title--done')

}


function checkEmptyList() {
    if(tasks.length === 0) {
        const emptyListHTML = `
                <li id="emptyList" class="list-group-item empty-list">
					<img src="./img/leaf.png" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список дел пуст</div>
				</li>`;
        
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)
    }

    if(tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}


function saveToLocalStorege() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function renderTask(task) {
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title'


    const taskHTML = `
                <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${task.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.png" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.png" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`

    
    // Добавляем задачунаьстраницу

    tasksList.insertAdjacentHTML('beforeend', taskHTML);
}



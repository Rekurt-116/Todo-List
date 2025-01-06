// Получаем элементы
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Функция для сохранения задач в localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach((li) => {
        tasks.push(li.firstChild.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Функция для загрузки задач из localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
        createTaskElement(task);
    });
}

// Функция для создания элемента задачи
function createTaskElement(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;

    // Кнопка для удаления задачи
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Удалить";
    deleteButton.onclick = () => {
        li.remove();
        saveTasks();
    };

    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// Функция для добавления задачи
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Введите задачу!");
        return;
    }

    createTaskElement(taskText);
    saveTasks();

    // Очищаем поле ввода
    taskInput.value = "";
}

// Событие для кнопки "Добавить"
addTaskButton.addEventListener("click", addTask);

// Событие для ввода Enter
taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// Загрузка задач при загрузке страницы
loadTasks();

const clearAllButton = document.getElementById("clearAllButton");
clearAllButton.addEventListener("click", () => {
    taskList.innerHTML = "";
    saveTasks();
});

function createTaskElement(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;
    li.classList.add("task"); // Добавляем класс для анимации

    // Кнопка для удаления задачи
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Удалить";
    deleteButton.onclick = () => {
        li.remove();
        saveTasks();
    };

    li.appendChild(deleteButton);
    taskList.appendChild(li);

    // Убираем класс анимации после её завершения
    li.addEventListener("animationend", () => {
        li.classList.remove("task");
    });
}

function createTaskElement(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;

    // Кнопка для удаления задачи
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Удалить";
    deleteButton.onclick = () => {
        li.classList.add("burning"); // Добавляем класс для эффекта "огня"

        // Удаляем задачу из DOM после завершения анимации
        li.addEventListener("animationend", () => {
            li.remove();
            saveTasks();
        });
    };

    li.appendChild(deleteButton);
    taskList.appendChild(li);
}
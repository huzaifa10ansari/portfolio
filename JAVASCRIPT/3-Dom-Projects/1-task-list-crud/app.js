// Define Ui Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//load All Events
loadEventListeners(); //call

// document.addEventListener("DOMContentLoaded", loadEventListeners);

function loadEventListeners() {
  //add new Task
  form.addEventListener("submit", addNewTask);
  //remove Task
  // Remove Task Event
  taskList.addEventListener("click", removeTask);
  //Clear Btn Event
  clearBtn.addEventListener("click", clearAllTask);
  //Filter Input Field
  filter.addEventListener("keyup", filterTasks);
  //DOM LOAD EVENT
  document.addEventListener("DOMContentLoaded", getTasksFromLocalStorage);
}

function addNewTask(event) {
  event.preventDefault(); //rukdia default functionality ko
  const taskInputValue = taskInput.value;
  if (taskInputValue == "") {
    alert("Please Input Task Value");
    return;
  }

  const li = document.createElement("li");
  li.className = "collection-item";
  // li.appendChild(taskInputValue);
  li.appendChild(document.createTextNode(taskInputValue));

  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = '<i class="fa fa-remove"></i>';

  li.append(link);
  taskList.append(li);

  storeTaskInLocalStorage(taskInputValue);

  taskInput.value = "";
}

function removeTask(event) {
  const currentElement = event.target;
  if (currentElement.parentElement.classList.contains("delete-item")) {
    if (confirm("are you sure ?")) {
      removeTaskInLocalStorage(currentElement.parentElement.parentElement);
      currentElement.parentElement.parentElement.remove();
    }
  }
}

//Clear All Task
function clearAllTask(event) {
  event.preventDefault();
  //first way to remove all element

  // const collectionArray = document.querySelectorAll(".collection-item");
  // for (let index = 0; index < collectionArray.length; index++) {
  //   const singleItem = collectionArray[index];
  //   singleItem.remove();
  // }

  //second method
  if (confirm("Are you sure ?")) {
    localStorage.removeItem("tasks");
    taskList.innerHTML = "";
  }
}
//store task in localstorage

function storeTaskInLocalStorage(taskInputValue) {
  // let tasks = [];
  // if (localStorage.getItem("tasks") == null) {
  //   tasks = [];
  // } else {
  //   tasks = JSON.parse(localStorage.getItem("tasks"));
  // }

  let getTasks = localStorage.getItem("tasks");
  let tasks = getTasks == null ? [] : JSON.parse(getTasks);

  // if tasks is null on localstorage so our variable is null
  //otherwise we have to get old tasks from localstorage

  tasks.push(taskInputValue);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function removeTaskInLocalStorage(collectionItemParentElement) {
  let tasks = [];
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  //get tasks from localstorage if its null its empty array
  //otherwise it will give you the localstorage tasks

  tasks.forEach(function (singleTask, index) {
    if (singleTask == collectionItemParentElement.textContent) {
      tasks.splice(index, 1);
      //its used for remove array from index
      //second parameter btata hai kaha tak remove karna hai
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  let tasks = [];
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  if (tasks.length > 0) {
    tasks.forEach(function (singleTask) {
      const li = document.createElement("li");
      li.className = "collection-item";
      li.appendChild(document.createTextNode(singleTask));

      const link = document.createElement("a");
      link.className = "delete-item secondary-content";
      link.innerHTML = '<i class="fa fa-remove"></i>';

      li.append(link);
      taskList.append(li);
    });
  }
}

function filterTasks(event) {
  const currentElement = event.target;
  const filterInputValue = currentElement.value.toLowerCase();
  // filterInputValue.indexOf(filterInputValue)
  const collectionItems = document.querySelectorAll(".collection-item");
  if (collectionItems.length > 0) {
    collectionItems.forEach(function (singleItem) {
      const text = singleItem.textContent.toLowerCase();
      // console.log(text);
      if (text.indexOf(filterInputValue) != -1) {
        singleItem.style.display = "block";
      } else {
        singleItem.style.display = "none";
      }
    });
  }
}

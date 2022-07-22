const params = window.location.search;
const id = new URLSearchParams(params).get("id");
// console.log(id);

const taskIdDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const editFormDOM = document.querySelector(".single-task-form");
const formAlertDOM = document.querySelector(".form-alert");
const taskCompletedDOM = document.querySelector(".task-edit-completed");

const showTask = async () => {
    try {
        const { data: task } = await axios.get(`/api/v1/tasks/${id}`);
        // console.log(task);
        const { completed, _id, name } = task;
        taskIdDOM.textContent = _id;
        taskNameDOM.value = name;
        if (completed) {
            taskCompletedDOM.checked = true;
        }
    }
    catch (err) {
        console.log(err);
    }
}

// タスクの編集
editFormDOM.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        const taskName = taskNameDOM.value;
        const taskComplete = taskCompletedDOM.checked;
        const { data: task } = await axios.patch(`/api/v1/tasks/${id}`, {
            name: taskName,
            completed: taskComplete
        });
        formAlertDOM.style.display ="block";
        formAlertDOM.textContent = "編集に成功しました。";
        formAlertDOM.classList.add("text-success");
    }
    catch (err) {
        console.log(err);
    }

    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
    }, 3000);
});

showTask();
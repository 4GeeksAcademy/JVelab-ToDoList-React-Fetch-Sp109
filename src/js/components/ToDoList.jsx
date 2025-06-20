import React, { useState, useEffect } from "react";

const ToDoList = () => {

    const [taskInput, setTaskInput] = useState("")
    const [taskList, setTaskList] = useState([])
    const USERNAME = "jose"

    useEffect( () => getElementFromApi(), [])

    function getElementFromApi() {
        fetch(`https://playground.4geeks.com/todo/users/${USERNAME}`,)
        .then(res => {
            if (!res.ok) {
                return fetch(`https://playground.4geeks.com/todo/users/${USERNAME}`, {
                    method: "POST"
                })
            }
            else {
                return res.json()
                .then(data => setTaskList(data.todos))
            }
        })
    }

    function deleteItem(indexToDelete) {
        const taskToDelete = taskList[indexToDelete]

        fetch(`https://playground.4geeks.com/todo/todos/${taskToDelete.id}`, {
            method: "DELETE"
        })
        .then( () => getElementFromApi())
    }

    function deleteAllTask() {
        for(let i = 0; i < taskList.length; i++) {
            const taskToDelete = taskList[i]

            fetch(`https://playground.4geeks.com/todo/todos/${taskToDelete.id}`, {
                method: "DELETE"
            })
            .then( () => getElementFromApi())
        }
        
    }

     const listItems = taskList.map((task, index) =>
        <li key={index} className="task-item d-flex p-3 ps-5 border-bottom">
        {task.label} <button className="dltButton ms-auto" onClick={() => deleteItem(index)}>X</button>
        </li>
    )

    function addTask(event) {
        if (event.key === "Enter" && taskInput.trim() !== "") {
            fetch(`https://playground.4geeks.com/todo/todos/${USERNAME}`, {
                method: "POST",
                body: JSON.stringify({ "label": taskInput.trim(), "done": false }),
                headers: { "Content-Type": "application/json" },
            })
            .then( () => getElementFromApi())
            setTaskInput("")
            
        }
    }

    return (
        <div className="mx-auto my-5 w-50 bg-white shadow">
            <input className="form-control border-bottom" type="text" placeholder="Qué tarea quieres agregar?" value={taskInput} onChange={e => {setTaskInput(e.target.value)}} onKeyDown={addTask}/>
            <div>
                <ul>
                    {taskList.length === 0 ? (
                        <p className="text-secondary ask-item d-flex p-3 ps-5 border-bottom">No tienes tareas pendientes</p>) : (
                        listItems
                    )}
                </ul>
            </div>
            <div className="footer d-flex">
                <span className="footer-text ms-4">{taskList.length} tareas restantes.</span>
                <button className="btn btn-danger me-4" onClick={ () => deleteAllTask()}>Eliminar todas las tareas</button>
            </div>
        </div>
    )
}

export default ToDoList
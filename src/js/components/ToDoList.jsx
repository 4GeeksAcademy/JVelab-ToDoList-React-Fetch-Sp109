import React, { useState } from "react";

const ToDoList = () => {

    const [taskInput, setTaskInput] = useState("")
    const [taskList, setTaskList] = useState([])

    const listItems = taskList.map((task, index) =>
    <li key={index} className="task-item d-flex p-3 ps-5 border-bottom">
      {task} <button className="dltButton ms-auto" onClick={() => deleteItem(index)}>X</button>
    </li>
    )

    function deleteItem(indexToDelete) {
        const updatedTasks = taskList.filter((_, index) => index !== indexToDelete)
        setTaskList(updatedTasks)
    }

    function addTask(event) {
        if (event.key === 'Enter') {
            setTaskList([...taskList, taskInput])
        }
    }

    return (
        <div className="mx-auto my-5 w-50 bg-white">
            <input className="form-control border-bottom" type="text" placeholder="Qué tarea quieres agregar?" value={taskInput} onChange={e => {setTaskInput(e.target.value)}} onKeyDown={addTask}/>
            <div>
                <ul>
                    {taskList.length === 0 ? (
                        <p className="text-secondary ask-item d-flex p-3 ps-5 border-bottom">No tienes tareas pendientes</p>) : (
                        <ul>{listItems}</ul>
                    )}
                </ul>
            </div>
            <div className="footer">
                <span className="footer-text">{taskList.length} tareas restantes.</span>
            </div>
        </div>
    )
}

export default ToDoList
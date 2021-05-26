import React, { useState } from "react";
import EditTask  from "../AddTask/EditTask";

import "./Task.css";

const Task = (props) => {
    const [editIsOpen, setEditIsOpen] = useState(false);

    const editTask = () => {
        setEditIsOpen(true);
    }
    const cancelEdit = () => {
        setEditIsOpen(false);
    }
    return (
        <>
        {!editIsOpen ? 
            <div className="task_outer">
            <img className="user_image" src={props.data.user_icon} alt={props.data.user_name}/>
            <div className="details">
                <p className="task_description">{props.data.task_msg}</p>
                <p className="task_date">{props.data.task_date.replace(/-/g, "/")}</p>
            </div>
            <div className="edit">
                <div onClick={editTask} className="edit_icon"></div>
            </div>
        </div> : <EditTask data={props.data} cancelEdit={cancelEdit}/>}
        </>
    )
}

export default Task;
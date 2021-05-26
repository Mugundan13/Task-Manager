import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {fetchTasks, fecthUsers} from "../../redux";
import Task from "../Task";
import AddTask from "../AddTask";

import "./TaskContainer.css";


const TaskContainer = props => {
    const [showForm, setShowForm] = useState(false);

    const showTaskForm = () => {
        setShowForm(prev => !prev);
    };

    const submitTask = () => {
        setShowForm(false);
    };

    const cancelTask = () => {
        setShowForm(false);
    };
    
    useEffect(() => {
        props.fetchTasks();
        props.fecthUsers();
    },[]);

    return <div className="container">
        <aside></aside>
        <div className="tasks">
            <div className="header"></div>
            <div className="main">
                <div className="task_adder">
                    <p>TASKS&ensp;{props.tasksData.allTasks ? props.tasksData.allTasks.length : 0 }</p>
                    <span className={`add_task_icon ${!showForm && "collapsed"}`} onClick={showTaskForm}></span>
                </div>
                {showForm && <AddTask submit={submitTask} cancelTask={cancelTask} />}
                {props.tasksData.loading ? <p>Loading..</p>: 
                props.tasksData.error ? <p>error</p>: 
                props.tasksData.allTasks.map((task, index) =>  {
                    return <Task key={index} data={task} />
                })}
            </div>
        </div>
    </div>
}

const mapStateToProps = state => {
    return {
        tasksData: state
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTasks: () => dispatch(fetchTasks()),
        fecthUsers: () => dispatch(fecthUsers())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);
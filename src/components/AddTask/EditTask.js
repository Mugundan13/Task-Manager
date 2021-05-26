import React, {useState} from "react";
import "./AddTask.css";
import DatePicker from "react-datepicker";
import {TimePickerComponent} from "@syncfusion/ej2-react-calendars";
import {connect} from "react-redux";
import { EditSingleTask, DeleteSingleTask} from "../../redux";
import CustomSelect from "../CustomSelect";

import "react-datepicker/dist/react-datepicker.css";

const EditTask = (props) => {
    let now = new Date();
    let then = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,0,0).toISOString();
    const task_time = (new Date(then).getTime()/1000 + props.data.task_time)*1000;
    const t = new Date(task_time);

    const [description, setDescription] = useState(props.data.task_msg)
    const [startDate, setStartDate] = useState(new Date(`${props.data.task_date} 00:00:00`));
    const [time, setTime] = useState(t);
    const [selectedUser, setSelectedUser] = useState(props.data.assigned_user);
    const [formIsValid, setFormIsValid] = useState(true);

    const selectedItemChangeHandler = ({selectedItem}) => {
        setSelectedUser(selectedItem.id)
    };

    const setDesValue = e => {
        setDescription(e.target.value);
    };

    const setTimeValue = e => {
        setTime(e.target.value);
    };

    const deleteTask = async event => {
        if(window.confirm("Are you sure you want to delete?")){
            await props.DeleteSingleTask(props.data.id);
            props.cancelEdit();
        } else {
            event.preventDefault();
        };
    };

    const submitEditedTask = async event => {
        event.preventDefault();
        let date = new Date(startDate);
        let now = new Date();
        let then = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            0,0,0)
        let formData = ({
            user: selectedUser,
            description,
            date: date.getFullYear()+ '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' +("0" + (date.getDate())).slice(-2),
            time: new Date(new Date(time).toISOString()).getTime()/1000 - then.getTime()/1000,
            timezone: now.getTimezoneOffset()
        });
        if(formData.user && formData.date ) {
            setFormIsValid(true);
        } else {
            setFormIsValid(false);
            return false
        }
        formIsValid && await props.EditSingleTask(props.data.id, formData);
        props.cancelEdit();

    };

    return (
        <div>
            <form className="task_form" onSubmit={submitEditedTask}>
                <div className="wrapper">
                    <p className="label">Task Description</p>
                    <div className="task_description_container">
                        <input type='text' value={description} onChange={setDesValue} required/>
                    </div>
                </div>
                <div className="date_time">
                    <div className="wrapper">
                        <p className="label">Date</p>
                        <div className="small">
                            <DatePicker selected={startDate} onChange={date => setStartDate(date)}/>
                        </div>
                    </div>
                    <div className="wrapper">
                        <p className="label">Time</p>
                        <div className="small">
                            <TimePickerComponent value={time} onChange={setTimeValue}/>
                        </div>
                    </div>
                </div>
                <div className="wrapper">
                    <p className="label">Assign User</p>
                    <CustomSelect selectedItemChange={selectedItemChangeHandler} selectedUserId={selectedUser}/>
                </div>
                <div className="buttons edit_task">
                    <div className="delete_icon" onClick={deleteTask}></div>
                    <div>
                        <button className="button cancel" onClick={props.cancelEdit}>cancel</button>
                        <input type='submit' className="button save" value="Save"/>
                    </div>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        usersData: state.allUsers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        EditSingleTask: (taskId, data) => dispatch(EditSingleTask(taskId, data)),
        DeleteSingleTask: (taskId) => dispatch(DeleteSingleTask(taskId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
import React, {useState, useEffect} from "react";
import "./AddTask.css";
import DatePicker from "react-datepicker";
import {TimePickerComponent} from "@syncfusion/ej2-react-calendars";
import {connect} from "react-redux";
import {AddNewTask, EditSingleTask} from "../../redux";
import CustomSelect from "../CustomSelect";

import "react-datepicker/dist/react-datepicker.css";


const AddTask = (props) => {
    const [description, setDescription] = useState("")
    const [startDate, setStartDate] = useState(new Date());
    const [time, setTime] = useState();
    const [selectedUser, setSelectedUser] = useState();
    const [formIsValid, setFormIsValid] = useState(true);

    const setDesValue = e => {
        setDescription(e.target.value);
    };

    const setTimeValue = e => {
        setTime(e.target.value);
    };

    const selectedItemChangeHandler = ({selectedItem}) => {
        setSelectedUser(selectedItem.id);
    };
    

    const submitNewTask = async event => {
        event.preventDefault();
        let date = new Date(startDate);
        let now = new Date();
        let then = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            0,0,0).toISOString();
        let formData = ({
            user: selectedUser,
            description,
            date: date.getFullYear()+ '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' +("0" + (date.getDate())).slice(-2),
            time: new Date(new Date(time).toISOString()).getTime()/1000 - new Date(then).getTime()/1000,
            timezone: now.getTimezoneOffset()
        });
        if(formData.user && formData.date ) {
            setFormIsValid(true);
        } else {
            setFormIsValid(false);
            return false
        }
        formIsValid && await props.AddNewTask(formData);
        props.submit();
    };

    return (
        <div>
            <form className="task_form" onSubmit={submitNewTask}>
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
                            <TimePickerComponent onChange={setTimeValue}/>
                        </div>
                    </div>
                </div>
                <div className="wrapper">
                    <p className="label">Assign User</p>
                    <CustomSelect selectedItemChange={selectedItemChangeHandler}/>
                </div>
                <div className="buttons">
                    <button className="button cancel" onClick={props.cancelTask}>cancel</button>
                    <input type='submit' className="button save" value="Save"/>
                </div>
            </form>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        EditSingleTask: (taskId, data) => dispatch(EditSingleTask(taskId, data)),
        AddNewTask: (data) => dispatch(AddNewTask(data))
    };
};

export default connect(null, mapDispatchToProps)(AddTask);
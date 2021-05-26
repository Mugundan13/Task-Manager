import axios from "axios";
import {headers} from "../../constants";

export const fetchAllTaskRequest = () => {
    return {
        type: "Fetch_all_tasks_request"
    };
};

export const fetchAllTaskSuccess = (tasks) => {
    return {
        type: "Fetch_all_tasks_success",
        payload: tasks
    };
};

export const fetchAllTaskFailure = (error) => {
    return {
        type: "fetch_all_tasks_failure",
        payload: error
    };
};

export const fetchAllUsers = (users) => {
    return {
        type: "fetch_all_users",
        payload: users
    }
}

export const fecthUsers = () => {
    return(dispatch) => {
        axios.get("https://stage.api.sloovi.com/team", {headers})
        .then(response => {
            const users = response.data.results;
            dispatch(fetchAllUsers(users));
        }).catch(err => {});
    };
};

export const fetchTasks = () => {
    return (dispatch) => {
        dispatch(fetchAllTaskRequest);
        axios.get("https://stage.api.sloovi.com/task/lead_58be137bfde045e7a0c8d107783c4598", {headers})
        .then(reponse => {
            const tasks = reponse.data.results;
            dispatch(fetchAllTaskSuccess(tasks));
        }).catch (err => {
            const error = err;
            dispatch(fetchAllTaskFailure(error));
        });
    };
};



export const AddNewTask = data => {
    return (dispatch) => {
        axios.post("https://stage.api.sloovi.com/task/lead_58be137bfde045e7a0c8d107783c4598" ,{
            assigned_user: data.user,
            task_date: data.date,
            task_time: data.time,
            is_completed: 0,
            time_zone: data.timezone,
            task_msg: data.description
        },
        {headers}).then(res => {
            dispatch(fetchTasks())
        }).catch(err => console.log(err));
    };
};


export const EditSingleTask = (taskId, data) => {
    return (dispatch) => {
        axios.put(`https://stage.api.sloovi.com/task/lead_58be137bfde045e7a0c8d107783c4598/${taskId}`,{
            assigned_user: data.user,
            task_date: data.date,
            task_time: data.time,
            is_completed: 0,
            time_zone: data.timezone,
            task_msg: data.description
        },
        {headers}).then(res => {
            dispatch(fetchTasks());
        }).catch(err => console.log(err));
    };
};

export const DeleteSingleTask = (taskId) => {
    return (dispatch) => {
        axios.delete(`https://stage.api.sloovi.com/task/lead_58be137bfde045e7a0c8d107783c4598/${taskId}`, {headers}).then(res => {
            dispatch(fetchTasks());
        }).catch(err => {});
    };
};
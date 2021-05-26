const initialState = {
    loading: false,
    allTasks: [],
    allUsers: [],
    error: null
}

const GetallTaskReducer = (state= initialState, action) => {
    switch (action.type) {
        case "Fetch_all_tasks_request":
            return {
                ...state,
                loading: true
            }
        case "fetch_all_users":
            return {
                ...state,
                loading: false,
                allUsers: action.payload
            }
        case "Fetch_all_tasks_success":
            return {
                ...state,
                loading: false,
                allTasks: action.payload
            }
        case "Fetch_all_tasks_failure":
            return {
                ...state,
                loading: false,
                allTasks: [],
                error: action.payload
            }
        default: return state
    } 
}

export default GetallTaskReducer;
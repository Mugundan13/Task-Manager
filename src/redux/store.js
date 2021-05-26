import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import GetAllTasksReducer from "./AllTasks/GetAllTasksReducer";

const store = createStore(GetAllTasksReducer, applyMiddleware(thunk));

export default store;
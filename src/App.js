import './App.css';
import { Provider } from 'react-redux';
import store from "./redux/store";
import TaskContainer from './components/TaskContainer';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TaskContainer/>
      </div>
    </Provider>
  );
}

export default App;

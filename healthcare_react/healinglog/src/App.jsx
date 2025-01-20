import { Provider } from 'react-redux';
import './App.css';
import HomePage from './components/home/HomePage';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <HomePage></HomePage>
    </Provider>
  );
}

export default App;

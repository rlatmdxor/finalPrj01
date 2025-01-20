import { Provider } from 'react-redux';
import './App.css';
import HomePage from './components/home/HomePage';
import { ThemeProvider } from 'styled-components';
import store from './redux/store';

function App() {
  const theme = {
    orange: '#FF7F50',
    green: '#7CA96D',
    gray: '#D9D9D9',
  };
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <HomePage></HomePage>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

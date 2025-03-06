import { Provider } from 'react-redux';
import './App.css';
import HomePage from './components/home/HomePage';
import { ThemeProvider } from 'styled-components';
import store from './redux/store';
import NotificationProvider from './components/pages/Notification/NotificationProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const theme = {
    orange: '#FF7F50',
    green: '#7CA96D',
    gray: '#D9D9D9',
  };
  return (
    <Provider store={store}>
      <NotificationProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <HomePage />
          </BrowserRouter>
        </ThemeProvider>
      </NotificationProvider>
    </Provider>
  );
}

export default App;

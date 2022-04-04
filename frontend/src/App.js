import { ThemeProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import './index.css';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ResultPage from './pages/ResultPage';
import { theme } from './themes'


function App() {
    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route element={<Layout />} >
                    <Route index element={<HomePage />} />
                    <Route path='result' element={<ResultPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </ThemeProvider >
    );
}

export default App;

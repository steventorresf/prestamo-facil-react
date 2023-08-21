import './App.css';
import Home from './pages/home/home';
import Layout from './pages/_layout/_layout';
import Login from './pages/_login/Login';
import Clientes from './pages/clientes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SpinnerCustom from './pages/shared/components/spinner';

function App() {
  return (
    <>
      <SpinnerCustom />
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/clientes' element={<Clientes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import Navbar from './com/Navbar';
import Home from './pages/Home';
import Weather from './pages/Weather';
import Products from './pages/Products';
import Cart from './pages/Cart';
import About from './pages/About';
import './App.scss';

// main.tsx에 BrowserRouter
// route의 필수요소 path와 element
const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/weather' element={<Weather />} />
                <Route path='/products' element={<Products />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/about' element={<About />} />
            </Routes>
        </div>
    );
};

export default App;


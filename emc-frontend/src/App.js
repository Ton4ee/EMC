
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';

function App() {
    return (
        <BrowserRouter>
            <nav style={{ padding: '1rem', background: '#eee' }}>
                <Link to="/products">Products</Link>
            </nav>
            <Routes>
                <Route path="/products" element={<ProductsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

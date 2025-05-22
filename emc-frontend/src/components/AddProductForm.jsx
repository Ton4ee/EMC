import React, { useState } from 'react';
import axios from '../api/axios';

function AddProductForm({ onAdd }) {
    const [form, setForm] = useState({ name: '', price: '', quantity: '' });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        const newProduct = {
            ...form,
            price: parseFloat(form.price),
            quantity: parseInt(form.quantity)
        };

        axios.post('/products', newProduct)
            .then(res => {
                onAdd(res.data); // refresh product list
                setForm({ name: '', price: '', quantity: '' }); // reset form
            });
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
            <input name="price" value={form.price} onChange={handleChange} type="number" placeholder="Price" required />
            <input name="quantity" value={form.quantity} onChange={handleChange} type="number" placeholder="Quantity" required />
            <button type="submit">Add Product</button>
        </form>
    );
}

export default AddProductForm;

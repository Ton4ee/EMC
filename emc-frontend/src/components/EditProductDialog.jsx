import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

function EditProductDialog({ open, product, onClose, onSave }) {
    const [form, setForm] = useState({ name: '', price: '', quantity: '' });

    useEffect(() => {
        if (product) {
            setForm({
                name: product.name || '',
                price: product.price || '',
                quantity: product.quantity || ''
            });
        }
    }, [product]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const updated = {
            ...product,
            ...form,
            price: parseFloat(form.price),
            quantity: parseInt(form.quantity)
        };
        onSave(updated);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', mt: 1 }}>
                <TextField label="Name" name="name" value={form.name} onChange={handleChange} />
                <TextField label="Price" name="price" type="number" value={form.price} onChange={handleChange} />
                <TextField label="Quantity" name="quantity" type="number" value={form.quantity} onChange={handleChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditProductDialog;

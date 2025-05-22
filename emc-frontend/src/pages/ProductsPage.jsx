
import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import ProductCard from '../components/ProductCard';
import AddProductForm from '../components/AddProductForm';
import EditProductDialog from '../components/EditProductDialog';

function ProductsPage() {
    /* ──────────────────────────────── STATE ─────────────────────────────── */
    const [products, setProducts] = useState([]);
    const [editOpen, setEditOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);

    /* ─────────────────────────────── EFFECT ─────────────────────────────── */
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {
        axios
            .get('/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error('Failed to fetch products', err));
    };

    /* ──────────────────────────── HANDLERS ──────────────────────────────── */
    /* Add */
    const handleAdd = newProduct => {
        setProducts(prev => [...prev, newProduct]);
    };

    /* Delete */
    const handleDelete = id => {
        axios
            .delete(`/products/${id}`)
            .then(() => setProducts(prev => prev.filter(p => p.id !== id)))
            .catch(err => {
                alert('Failed to delete product');
                console.error(err);
            });
    };

    /* Open Edit dialog */
    const handleEdit = product => {
        setProductToEdit(product);
        setEditOpen(true);
    };

    /* Save Edit */
    const handleSaveEdit = updatedProduct => {
        axios
            .put(`/products/${updatedProduct.id}`, updatedProduct)
            .then(res => {
                setProducts(prev =>
                    prev.map(p => (p.id === updatedProduct.id ? res.data : p))
                );
                setEditOpen(false);
            })
            .catch(err => {
                alert('Failed to update product');
                console.error(err);
            });
    };

    /* ───────────────────────────── RENDER ──────────────────────────────── */
    return (
        <div>
            <h2>Products</h2>

            {/* Add product form */}
            <AddProductForm onAdd={handleAdd} />

            {/* Product cards */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {products.map(p => (
                    <ProductCard
                        key={p.id}
                        product={p}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))}
            </div>

            {/* Edit dialog */}
            <EditProductDialog
                open={editOpen}
                product={productToEdit}
                onClose={() => setEditOpen(false)}
                onSave={handleSaveEdit}
            />
        </div>
    );
}

export default ProductsPage;

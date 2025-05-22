import React from 'react';


function ProductCard({ product, onDelete, onEdit }) {
    const handleDelete = () => {
        const confirm = window.confirm(`Are you sure you want to delete "${product.name}"?`);
        if (confirm) {
            onDelete(product.id);
        }
    };

    const handleEdit = () => {
        onEdit(product); // open the edit dialog
    };

    return (
        <div
            style={{
                border: '1px solid #ccc',
                padding: '1rem',
                width: '220px',
                borderRadius: '8px',
                boxShadow: '2px 2px 6px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
            }}
        >
            <h4 style={{ margin: 0 }}>{product.name}</h4>
            <p style={{ margin: 0 }}>Price: ${product.price}</p>
            <p style={{ margin: 0 }}>Qty: {product.quantity}</p>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                <button onClick={handleEdit} style={{ flex: 1 }}>Edit</button>
                <button
                    onClick={handleDelete}
                    style={{
                        flex: 1,
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '0.4rem 0.6rem',
                        cursor: 'pointer'
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default ProductCard;

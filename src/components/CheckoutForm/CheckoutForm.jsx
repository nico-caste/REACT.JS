import { useState } from 'react';
import './CheckoutForm.scss';

export const CheckoutForm = ({ onConfirm }) => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre || !email || !telefono) {
            return alert('Por favor, completa todos los campos.');
        }
        onConfirm({ nombre, email, telefono });
    };

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
            <h2>Completa tus datos</h2>
            <input 
                type="text" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre Completo"
                required
            />
            <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Teléfono"
                required
            />
            <button type="submit" className="btn btn-secondary">Confirmar Compra</button>
        </form>
    );
}
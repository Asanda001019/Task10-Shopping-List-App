// src/components/ShoppingList.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../features/ShoppingListSlice';

const ShoppingList = () => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [note, setNote] = useState('');
    const [image, setImage] = useState(null);
    const items = useSelector(state => state.shoppingList.items);
    const dispatch = useDispatch();

    const handleAddItem = () => {
        if (name) {
            const newItem = { name, quantity, note, image };
            dispatch(addItem(newItem));
            // Reset the form
            setName('');
            setQuantity(1);
            setNote('');
            setImage(null);
        }
    };

    const handleRemoveItem = index => {
        dispatch(removeItem(index));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Shopping List</h1>
            <div className="flex mb-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Item Name"
                    className="border border-gray-300 rounded-l-md p-2 flex-1"
                />
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min="1"
                    className="border border-gray-300 p-2 w-24"
                />
                <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Optional Note"
                    className="border border-gray-300 rounded-r-md p-2 flex-1"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="ml-2"
                />
                <button 
                    onClick={handleAddItem}
                    className="ml-2 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                >
                    Add
                </button>
            </div>
            <ul>
                {items.map((item, index) => (
                    <li key={index} className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center">
                        <div className="flex items-center">
                            {item.image && (
                                <img src={item.image} alt={item.name} className="w-16 h-16 mr-4 rounded" />
                            )}
                            <div>
                                <h2 className="font-semibold">{item.name}</h2>
                                <p>Quantity: {item.quantity}</p>
                                {item.note && <p className="text-gray-500">{item.note}</p>}
                            </div>
                        </div>
                        <button 
                            onClick={() => handleRemoveItem(index)}
                            className="bg-red-500 text-white rounded-md px-2 py-1 hover:bg-red-600"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShoppingList;
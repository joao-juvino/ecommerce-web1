"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState([
        
    ]);

    function addItem(item) {
        const prevItem = items.find(prevItem => prevItem.id == item.id);
        if (prevItem) {
            setItems(prevItems =>
                prevItems.map(prevItem =>
                    prevItem.id === item.id ? { ...prevItem, amount: prevItem.amount + 1 } : prevItem
                )
            );
        } else {
            setItems((prev) => [...prev, { ...item, "amount": 1 }]);
        }
    }

    function removeItem(id) {
        setItems((prev) =>
            prev
                .map((item) =>
                    item.id === id ? { ...item, amount: item.amount - 1 } : item
                )
                .filter((item) => item.amount > 0)
        );
    }

    function getTotal() {
        return items.reduce((sum, item) => sum + item.preco * item.amount, 0)
            .toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }

    function getAmount() {
        return items.reduce((amount, item) => amount + item.amount, 0);
    }

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, getTotal, getAmount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}

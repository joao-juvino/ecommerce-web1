"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([{
    "id": 1,
    "nome": "Smartphone Galaxy S22",
    "preco_original": 4999.90,
    "preco": 3799.90,
    "parcelas": 10,
    "valor_parcela": 379.99,
    "avaliacoes": 1245,
    "media_avaliacoes": 4.7,
    "imgs": [
      "/img/smartphone.png",
      "/img/smartphonefront.png",
      "/img/smartphoneback.png",
      "/img/smartphonepencil.png"
    ]
  },
  {
    "id": 2,
    "nome": "Notebook Dell Inspiron 15",
    "preco_original": 5999.00,
    "preco": 4899.00,
    "parcelas": 12,
    "valor_parcela": 408.25,
    "avaliacoes": 860,
    "media_avaliacoes": 4.5,
    "imgs": [
      "/img/notebookdellinspiron15.png",
      "/img/notebookdellinspiron15back.png",
      "/img/notebookdellinspiron15side.png"
    ]
  },]);

  function addItem(item) {
    setItems((prev) => [...prev, item]);
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

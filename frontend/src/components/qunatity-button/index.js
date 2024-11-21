import React, { useState } from "react";
import "./style.scss";

export function QuantityButton({ quantity, onIncrement, onDecrement }) {
  function handleIncrement() {
    onIncrement();
  }
  function handleDecrement() {
    onDecrement();
  }

  return (
    <button className="quantity-button">
      {quantity == 0 ? (
        <span onClick={handleIncrement}>Add to cart</span>
      ) : (
        <div className="quantity-container">
          <button onClick={handleDecrement}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrement}>+</button>
        </div>
      )}
    </button>
  );
}

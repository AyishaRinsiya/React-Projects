import React,{useContext} from "react";
import {ShopContext} from '../../context/shop-context';
import { PRODUCTS } from "../../products";
import {CartItem} from './cart-item';
import {useNavigate} from "react-router-dom";
import './cart.css';

export const Cart = () => {
    const{cartItems,getTotalCartAmount, checkout}=useContext(ShopContext);
    const totalAmount = getTotalCartAmount();

    const navigate = useNavigate();
  
    return (
        <div className="cart">
            <div>
        <h2>Your Cart Items</h2>
      </div>
      <div className="cartItems">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} />;
          }
        })}
      </div>
      {totalAmount > 0 ? (
        <div className="checkout">
          <p> Subtotal: Rs{totalAmount} </p>
          <button onClick={() => navigate("/")}> Continue Shopping </button>
          <button
            onClick={() => {
              checkout();
              navigate("/checkout");
            }}
          >
            {" "}
            Checkout{" "}
          </button>
        </div>
      ) : (
        <h2> Your Shopping Cart is Empty</h2>
      )}
      </div>
    );
};
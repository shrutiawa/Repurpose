import React, { useEffect, useState } from "react";
import "../styles/cart.css"; // Assuming you have a CSS file for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import Header from "./Header";

function ShoppingCart() {
  const customerId = localStorage.getItem("customer");
  const navigate = useNavigate();

  // State to store the products in the shopping cart
  const [products, setProducts] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // payment integration
  const makePayment = async () => {
    if (paymentMethod === "cod") {
      navigate("/order-confirm");
    } else if (paymentMethod === "card") {
      // loading the stripe with publish key
      const stripe = await loadStripe(
        "pk_test_51PJr9WSFTGzovtjLXAC2xrnfnHwraXlko0nqG71xR2DzyQ3vJoIPxqa7qbLRjLejsJk0AFsOXHySjQyBFmCrVeQe00MbUJjkkS"
      );
      const body = {
        carts: products,
        totalAmount: couponResponseData.totalAmountToBePaid
      };
      const headers = {
        "Content-Type": "application/json"
      };
      const response = await fetch(
        "http://localhost:5000/api/create-checkout-session",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body)
        }
      );

      const session = await response.json();

      const result = stripe.redirectToCheckout({
        sessionId: session.id
      });
      if (result.error) {
        console.log(result.error);
      }
    }
  };
  useEffect(() => {
    const getAllEntries = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/carts?customerId=${customerId}`
        );
        const productsInCart = response.data.lineItems;

        // Check if cart is empty
        if (productsInCart.length === 0) {
          // Cart is empty, update state accordingly
          setProducts([]);
        } else {
          // Map over each product in the cart and extract necessary details
          const updatedProducts = productsInCart.map((item) => {
            const productId = item.productId;
            const productName = item.name["en-US"];
            const productDescription = item.variant.attributes.find(
              (attr) => attr.name === "Description"
            ).value;
            const productPrice =
              item.price.value.centAmount / 100; // Convert price from cents to dollars
            const productImage = item.variant.images[0].url;
            const quantity = item.quantity;

            return {
              id: productId,
              name: productName,
              description: productDescription,
              price: productPrice,
              imageUrl: productImage,
              quantity: quantity
            };
          });

          // Update the state with all products in the cart
          setProducts(updatedProducts);
        }
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    getAllEntries();
  }, [customerId]);

  const getShortDescription = (description, numWords) => {
    if (!description) return "";
    const words = description.split(" ");
    return words.slice(0, numWords).join(" ");
  };

  const handlePaymentMethodChange = (e) => {
    const newValue = e.target.value === paymentMethod ? null : e.target.value;
    setPaymentMethod(newValue);
  };

  const calculateSubtotal = () => {
    return products
      .reduce((sum, product) => sum + product.price * product.quantity, 0)
      .toFixed(2);
  };

  const isCheckoutDisabled = !paymentMethod;

  const [coupon, setCoupon] = useState("");
  const [couponResponseData, setCouponResponseData] = useState("");
  const [couponError, setCouponError] = useState('')

  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };
  const handleCouponSubmit = async (e) => {
    const grandTotal = calculateSubtotal();
    e.preventDefault();
    setCouponError('')
    setCouponResponseData('')
    try {
      const res = await axios.post("http://localhost:5000/api/coupon", {
        coupon,
        customerId,
        grandTotal,
      });
      setCouponResponseData(res.data);
      console.log(res.data);
    } catch (error) {
      // console.error("Error submitting input:", error);
      setCouponError("Invalid Coupon")
    }
  };

  return (<>
    <Header/>
    <div className="cartMainContainer">
      <h1>Shopping Cart</h1>
      {products.length === 0 ? (
        <p>Your shopping cart is empty.</p>
      ) : (
        <>
      <div className="shopping-cart">
        <section className="itemsInCart">
          <div className="column-labels">
            <label className="product-image">Image</label>
            <label className="product-details">Product</label>
            <label className="product-price">Price</label>
            <label className="product-quantity">Quantity</label>
            <label className="product-line-price">Total</label>
          </div>

          {products.map((product) => (
            <div className="product" key={product.id}>
              <div className="product-image">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="product-details">
                <div className="product-title">{product.name}</div>
                <p className="product-description">
                  {getShortDescription(product.description, 12)}
                </p>
              </div>
              <div className="product-price">{product.price}</div>
              <div className="product-quantity">
                <input
                  type="number"
                  value={product.quantity}
                  min="1"
                  readOnly
                />
              </div>
              <div className="product-line-price">
                {(product.price * product.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </section>

        <section className="summary">
          <div className="totals">
            <div className="totals-item">
              <label>Subtotal</label>
              <div className="totals-value">{calculateSubtotal()}</div>
            </div>
            <div className="totals-item">
              <label>Tax (0%)</label>
              <div className="totals-value">00.00</div>
            </div>
            <div className="totals-item">
              <label>Shipping</label>
              <div className="totals-value">00.00</div>
            </div>
            <div className="totals-item totals-item-total">
              <label>Grand Total</label>
              <div className="totals-value">{calculateSubtotal()}</div>
            </div>
            <section>
              <form className="couponForm" onSubmit={handleCouponSubmit}>
                <input
                  type="text"
                  name="coupon"
                  id="coupon"
                  placeholder="Enter Coupon Code"
                  value={coupon}
                  onChange={handleCouponChange}
                />
                <button type="submit">Apply</button>
              </form>
              {couponError ? <>
              <h3 style={{color:"red"}}>{couponError}</h3>
              </> : ''}
            </section>
            {couponResponseData ?
            <>
            <div className="totals-item discountAmount">
              <label>Discounted Amount</label>
              <div className="totals-value">
                {couponResponseData.discountedAmount}
              </div>
            </div>
            <div className="totals-item totalAmount ">
              <label>Total Amount</label>
              <div className="totals-value">
                {couponResponseData.totalAmountToBePaid}
              </div>
            </div>
            </>
 : ' ' }

            <div className="payment-methods">
              <h3>Payment Methods</h3>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  onChange={handlePaymentMethodChange}
                  checked={paymentMethod === "cod"}
                />&nbsp;
                Cash on Delivery (COD)
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  onChange={handlePaymentMethodChange}
                  checked={paymentMethod === "card"}
                />&nbsp;
                Card
              </label>
            </div>
          </div>
          <button className="checkout" onClick={makePayment}>
            Checkout
          </button>
        </section>
      </div>
      </>
      )}
    </div>
    </>
  );
}

export default ShoppingCart;

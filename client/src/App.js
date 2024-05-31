
import  {BrowserRouter, Route, Routes } from "react-router-dom"
import RegisterForm from "./screens/register";
import LoginForm from "./screens/login";
import ProductList from "./screens/ProductList";
import ProductDetail from "./screens/ProductDetail";
import Home from "./screens/home";
import ShoppingCart from "./screens/shoppingCart";
import Community from "./screens/community";
import OrderConformation from "./screens/orderConfirmation"
import CancelPayment from "./screens/CancelPayment";
import AboutUs from "./screens/aboutUs";


function App() {

  return (<>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/product/:productId/:variantId" element={<ProductDetail />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/order-confirm" element={<OrderConformation />} />
        <Route path="/cancel" element={<CancelPayment />} />
        <Route path="/repurpose/community" element={<Community/>} />
        <Route path="/repurpose/aboutus" element={<AboutUs/>} />

       
  </Routes>
  </BrowserRouter>
    </>

  );
}

export default App;
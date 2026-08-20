import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Market from "./pages/Market";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="market" element={<Market />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/market" element={<h1>Market</h1>} />
        <Route path="/product/:id" element={<h1>Product Details</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/register" element={<h1>Register</h1>} />
        <Route path="/profile" element={<h1>Profile</h1>} />
        <Route path="/favorites" element={<h1>Favorites</h1>} />
        <Route path="/cart" element={<h1>Cart</h1>} />
        <Route path="/admin" element={<h1>Admin Dashboard</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
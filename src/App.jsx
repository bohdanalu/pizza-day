import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Hero from "./pages/Hero";
import Menu from "./pages/Menu";
import Cart from "./components/Cart/Cart";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import { lazy, Suspense } from "react";
import "./App.css";

const Home = lazy(() => import("./pages/Hero"));
const Menu = lazy(() => import("./pages/Menu"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const LoginForm = lazy(() => import("./pages/LoginForm/LoginForm"));
const Order = lazy(() => import("./pages/Order/Order"));

function App() {
  return (
    <div className="container">
      <Header />
      <main className="content">
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order/new" element={<LoginForm />} />
            <Route path="/order/:id" element={<Order />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;

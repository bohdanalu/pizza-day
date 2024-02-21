import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Hero from "./components/pages/Hero";
import Menu from "./components/pages/Menu";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

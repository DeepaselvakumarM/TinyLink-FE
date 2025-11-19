import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StatsPage from "./pages/StatsPage";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import About from "./pages/About";
function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/code/:code" element={<StatsPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;




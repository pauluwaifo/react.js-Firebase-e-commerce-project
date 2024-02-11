import "./App.css";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Test from "./components/Test";
import GlobalState from "./contexts/GlobalState";
import { Route, Routes } from "react-router-dom";
import ProductCategoryPage from "./pages/ProductSubCategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Footer from "./components/Footer";


function App() {
  return (
    <GlobalState>
      <Nav />
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product_/:id" element={<ProductDetailPage />} />
        <Route path="/category/:category" element={<ProductCategoryPage />} />
      </Routes>
      <Footer />
    </GlobalState>
  );
}

export default App;

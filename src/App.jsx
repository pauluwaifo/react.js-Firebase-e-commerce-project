import "./App.css";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Test from "./components/Test";
import GlobalState from "./contexts/GlobalState";
import { Route, Routes } from "react-router-dom";
import ProductCategoryPage from "./pages/ProductCategoryPage";
import ProductSubCategoryPage from "./pages/ProductSubCategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Footer from "./components/Footer";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <GlobalState>
        <header>
          <Nav />
        </header>
        <main>
          <Routes>
            <Route path="/test" element={<Test />} />
            <Route path="/" element={<Home />} />
            <Route path="/product_/:id" element={<ProductDetailPage />} />
            <Route path="/:category" element={<ProductCategoryPage />} />
            <Route
              path="/:category/:subcategory"
              element={<ProductSubCategoryPage />}
            />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
        <footer className="footer">
          <Footer />
        </footer>
    </GlobalState>
  );
}

export default App;

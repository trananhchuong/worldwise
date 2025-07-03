import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SpinnerFullPage from "./components/spinner/SpinnerFullPage";
import PageNotFound from "./pages/not-found/PageNotFound";
import Homepage from "./pages/home-page/Homepage";
import Product from "./pages/product/Product";

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<>Pricing</>} />
            <Route path="login" element={<>Login</>} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;

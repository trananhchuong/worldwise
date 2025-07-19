import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SpinnerFullPage from "./components/spinner/SpinnerFullPage";
import PageNotFound from "./pages/not-found/PageNotFound";

const Homepage = lazy(() => import("./pages/home-page/Homepage"));
const Product = lazy(() => import("./pages/product/Product"));
const Pricing = lazy(() => import("./pages/pricing/Pricing"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing/>} />
            <Route path="login" element={<>Login</>} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;

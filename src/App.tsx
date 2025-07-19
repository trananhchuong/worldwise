import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SpinnerFullPage from "./components/spinner/SpinnerFullPage";
import PageNotFound from "./pages/not-found/PageNotFound";
import { AuthProvider } from "./contexts/FakeAuthContext";

const Homepage = lazy(() => import("./pages/home-page/Homepage"));
const Product = lazy(() => import("./pages/product/Product"));
const Pricing = lazy(() => import("./pages/pricing/Pricing"));
const Login = lazy(() => import("./pages/login/Login"));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing/>} />
            <Route path="login" element={<Login/>} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

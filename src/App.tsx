import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SpinnerFullPage from "./components/spinner/SpinnerFullPage";
import { AuthProvider } from "./contexts/FakeAuthContext";
import PageNotFound from "./pages/not-found/PageNotFound";
import ProtectedRoute from "./pages/protected/ProtectedRoute";
import { CitiesProvider } from "./contexts/CitiesContext";
import CountryList from "./components/country-list/CountryList";
import City from "./components/city/City";
import Form from "./components/form/Form";

const Homepage = lazy(() => import("./pages/home-page/Homepage"));
const Product = lazy(() => import("./pages/product/Product"));
const Pricing = lazy(() => import("./pages/pricing/Pricing"));
const Login = lazy(() => import("./pages/login/Login"));
const AppLayout = lazy(() => import("./pages/app-layout/AppLayout"));
const CityList = lazy(() => import("./pages/city-list/CityList"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />

              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;

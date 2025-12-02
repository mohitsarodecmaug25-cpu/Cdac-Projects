import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigationbar } from "./components/Navigationbar";
import { ToastContainer } from "react-toastify";

import { ContactRequest } from "./components/ContactRequest";
import { Products } from "./components/Products";
import { HandleProducts } from "./components/HandleProducts";


import { EditProduct } from "./components/EditProduct";
import { SignUpForm } from "./components/SignUpForm";
import { LoginPage } from "./components/Login";
import { HomePage } from "./components/Home";
import { Cart } from "./components/Cart";
import { Orders } from "./components/Orders";
import { AdminRoute } from "./components/AdminRoute";
import { BulkPurchasePage } from "./components/BulkPurchasePage";
import { AboutUs } from "./components/AboutUs";
import { AdminMessages } from "./components/AdminMessages";
import { ThemeProvider } from "./contexts/ThemeContext";



function App() {

  return (
    <ThemeProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Navigationbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/handle" element={<AdminRoute><HandleProducts /></AdminRoute>} />
          <Route path="/edit-product/:id" element={<AdminRoute><EditProduct /></AdminRoute>} />
          <Route path="/bulkpurchase" element={<BulkPurchasePage />} />


          <Route path="/contact-us/request" element={<AdminRoute><AdminMessages /></AdminRoute>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />

        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

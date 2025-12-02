import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, Button, Badge } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { isAdmin } from "../services/AuthService";
import { IoLibrary, IoCart, IoLogOut, IoLogIn, IoPersonAdd, IoHome, IoCube, IoMail, IoAdd, IoInformationCircle, IoMoon, IoSunny } from "react-icons/io5";
import { HiBookOpen } from "react-icons/hi2";
import { useTheme } from "../contexts/ThemeContext";

export function Navigationbar() {
  const navigate = useNavigate();
  const { isDark, toggleTheme, colors } = useTheme();
  const [cartCount, setCartCount] = useState(0);

  const authToken = localStorage.getItem("authToken");
  const userRole = isAdmin() ? "ADMIN" : localStorage.getItem("userRole");
  const isLoggedIn = !!authToken;

  useEffect(() => {
    const updateCartCount = () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setCartCount(0);
        return;
      }
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartCount(cartItems.length);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("cartItems");
    window.dispatchEvent(new Event('cartUpdated'));
    navigate("/login");
  };

  return (
    <Navbar 
      expand="lg" 
      className="shadow-sm py-2 fixed-top" 
      style={{ 
        backgroundColor: colors.surface,
        borderBottom: `3px solid ${colors.border}`, 
        zIndex: 1030 
      }}
    >
      <Container fluid>
        <Navbar.Brand
          as={NavLink}
          to="/"
          className="fw-bold fs-3 d-flex align-items-center"
          style={{ color: "#b19cd9", textDecoration: "none" }}
        >
          <IoLibrary className="me-2" size={24} style={{ color: isDark ? "#ffffff" : "#000000" }} />
          Bookbazar
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="d-flex align-items-center">

            {/* Common links */}
            <Nav.Link
              as={NavLink}
              to="/"
              end
              className="fw-semibold d-flex align-items-center me-3"
              style={{ color: colors.text }}
            >
              <IoHome className="me-1" style={{ color: isDark ? "#ffffff" : "#000000" }} />
              Home
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/products"
              className="fw-semibold d-flex align-items-center me-3"
              style={{ color: colors.text }}
            >
              <HiBookOpen className="me-1" style={{ color: isDark ? "#ffffff" : "#000000" }} />
              Books
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/bulkpurchase"
              className="fw-semibold d-flex align-items-center me-3"
              style={{ color: colors.text }}
            >
              <IoCube className="me-1" style={{ color: isDark ? "#ffffff" : "#000000" }} />
              Bulk Purchase
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/about"
              className="fw-semibold d-flex align-items-center me-3"
              style={{ color: colors.text }}
            >
              <IoInformationCircle className="me-1" style={{ color: isDark ? "#ffffff" : "#000000" }} />
              About Us
            </Nav.Link>

            {/* Admin routes */}
            {isLoggedIn && userRole === "ADMIN" && (
              <>
                <Nav.Link as={NavLink} to="/products/handle" className="fw-semibold d-flex align-items-center me-3" style={{ color: colors.text }}>
                  <IoAdd className="me-1" style={{ color: isDark ? "#ffffff" : "#000000" }} />
                  Inventory
                </Nav.Link>
                <Nav.Link as={NavLink} to="/contact-us/request" className="fw-semibold d-flex align-items-center me-3" style={{ color: colors.text }}>
                  <IoMail className="me-1" style={{ color: isDark ? "#ffffff" : "#000000" }} />
                  Messages
                </Nav.Link>
              </>
            )}

            {/* Customer routes */}
            {isLoggedIn && userRole === "CUSTOMER" && (
              <>
                <Nav.Link as={NavLink} to="/cart" className="fw-semibold d-flex align-items-center me-3 position-relative" style={{ color: colors.text }}>
                  <IoCart className="me-1" style={{ color: isDark ? "#ffffff" : "#000000" }} />
                  Cart
                  {cartCount > 0 && (
                    <Badge bg="danger" className="ms-1" style={{ fontSize: "0.7rem" }}>{cartCount}</Badge>
                  )}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/orders" className="fw-semibold d-flex align-items-center me-3" style={{ color: colors.text }}>
                  <HiBookOpen className="me-1" style={{ color: isDark ? "#ffffff" : "#000000" }} />
                  Orders
                </Nav.Link>
              </>
            )}

            {/* Admin also sees cart + orders */}
            {isLoggedIn && userRole === "ADMIN" && (
              <>
                <Nav.Link as={NavLink} to="/cart" className="fw-semibold d-flex align-items-center me-3 position-relative" style={{ color: colors.text }}>
                  <IoCart className="me-1" style={{ color: isDark ? "#ffffff" : "#000000" }} />
                  Cart
                  {cartCount > 0 && (
                    <Badge bg="danger" className="ms-1" style={{ fontSize: "0.7rem" }}>{cartCount}</Badge>
                  )}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/orders" className="fw-semibold d-flex align-items-center me-3" style={{ color: colors.text }}>
                  <HiBookOpen className="me-1" style={{ color: isDark ? "#ffffff" : "#000000" }} />
                  Orders
                </Nav.Link>
              </>
            )}

            {/* Theme Toggle */}
            <Button
              variant="outline-secondary"
              size="sm"
              className="me-3 d-flex align-items-center"
              onClick={toggleTheme}
              style={{ 
                borderColor: colors.border, 
                color: colors.text,
                backgroundColor: 'transparent'
              }}
            >
              {isDark ? <IoSunny className="me-1" style={{ color: "#ffffff" }} /> : <IoMoon className="me-1" style={{ color: "#000000" }} />}
              {isDark ? 'Light' : 'Dark'}
            </Button>

            {/* Auth buttons */}
            <div className="d-flex">
              {isLoggedIn ? (
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="me-2 px-3 d-flex align-items-center"
                  onClick={handleLogout}
                >
                  <IoLogOut className="me-1" style={{ color: isDark ? "#ffffff" : "#000000" }} />
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2 px-3 d-flex align-items-center"
                    onClick={() => navigate("/login")}
                    style={{ 
                      backgroundColor: "#b19cd9", 
                      borderColor: "#b19cd9",
                      borderRadius: "25px",
                      padding: "8px 20px",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 15px rgba(177, 156, 217, 0.3)"
                    }}
                  >
                    <IoLogIn className="me-1" style={{ color: "#8e44ad" }} />
                    Login
                  </Button>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="px-3 d-flex align-items-center"
                    onClick={() => navigate("/signup")}
                    style={{ 
                      borderColor: "#b19cd9", 
                      color: "#b19cd9",
                      backgroundColor: "transparent",
                      borderRadius: "25px",
                      padding: "8px 20px",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                      borderWidth: "2px"
                    }}
                  >
                    <IoPersonAdd className="me-1" style={{ color: "#8e44ad" }} />
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
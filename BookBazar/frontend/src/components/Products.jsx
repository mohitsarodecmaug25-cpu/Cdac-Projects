import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Form,
  InputGroup,
  Badge,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BOOKS_API_URL } from "../constants/APIConstants";
import { FaShoppingCart, FaStar, FaHeart, FaSearch, FaFilter, FaEye } from "react-icons/fa";
import { BiBookOpen } from "react-icons/bi";
import "react-toastify/dist/ReactToastify.css";

export function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch Books
  async function fetchProducts() {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.get(BOOKS_API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(response.data || []);
      setFilteredProducts(response.data || []);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(response.data.map(book => book.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching books:", error);

      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized! Please login again.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        window.location.href = "/login";
      } else {
        toast.error("Failed to fetch books");
      }
    } finally {
      setLoading(false);
    }
  }

  // Quantity handler
  function handleQuantityChange(productId, value) {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Number(value),
    }));
  }

  // Add to cart
  function handleAddToCart(product) {
    const authToken = localStorage.getItem("authToken");
    
    if (!authToken) {
      toast.warning("Please login to add items to cart");
      navigate("/login");
      return;
    }

    const selectedQuantity = quantities[product.id] || 1;

    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += selectedQuantity;
    } else {
      cart.push({
        id: product.id,
        name: product.title, // use title for books
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: selectedQuantity,
        type: "book",
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));

    toast.success(`${product.title} added to cart (${selectedQuantity}) 🛒`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  }

  // Filter and search products
  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "author") return a.author.localeCompare(b.author);
      return 0;
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, sortBy, selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingTop: "2rem", paddingBottom: "2rem" }}>
      <Container>
        <ToastContainer position="top-center" />
        
        {/* Header Section */}
        <div className="text-center mb-5">
          <BiBookOpen size={60} className="text-primary mb-3" />
          <h1 className="fw-bold mb-3">Our Book Collection</h1>
          <p className="text-muted lead">Discover your next favorite book from our extensive collection</p>
        </div>

        {/* Search and Filter Section */}
        <Row className="mb-4">
          <Col md={6}>
            <InputGroup size="lg">
              <InputGroup.Text>
                <FaSearch className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search books by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ border: "2px solid #e9ecef" }}
              />
            </InputGroup>
          </Col>
          <Col md={3}>
            <Form.Select 
              size="lg" 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ border: "2px solid #e9ecef" }}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select 
              size="lg" 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={{ border: "2px solid #e9ecef" }}
            >
              <option value="title">Sort by Title</option>
              <option value="author">Sort by Author</option>
              <option value="price">Sort by Price</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Results Count */}
        <div className="mb-4">
          <Badge bg="primary" className="fs-6 px-3 py-2">
            {filteredProducts.length} books found
          </Badge>
        </div>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading books...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-5">
          <BiBookOpen size={80} className="text-muted mb-3" />
          <h4 className="text-muted">No books found</h4>
          <p className="text-muted">Try adjusting your search terms</p>
        </div>
      ) : (
        <Row className="g-4">
          {filteredProducts.map((product) => (
            <Col key={product.id} lg={3} md={4} sm={6}>
              <Card className="border-0 shadow-sm h-100 product-card" style={{ transition: "transform 0.2s ease" }}>
                <div className="position-relative overflow-hidden">
                  <Card.Img
                    variant="top"
                    src={product.imageUrl || "https://via.placeholder.com/300x400?text=No+Image"}
                    alt={product.title}
                    style={{
                      height: "400px",
                      
                      transition: "transform 0.3s ease"
                    }}
                    className="product-image"
                  />
                  <div className="position-absolute top-0 end-0 p-2">
                    <FaHeart 
                      className="text-danger" 
                      size={20} 
                      style={{ cursor: "pointer", filter: "drop-shadow(0 0 3px white)" }} 
                    />
                  </div>
                  <div className="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-75 text-white p-2 opacity-0 product-overlay" style={{ transition: "opacity 0.3s ease" }}>
                    <Button variant="light" size="sm" className="w-100">
                      <FaEye className="me-1" /> Quick View
                    </Button>
                  </div>
                </div>

                <Card.Body className="d-flex flex-column p-3">
                  <Card.Title 
                    className="fw-bold mb-2" 
                    style={{ 
                      fontSize: "1.1rem", 
                      height: "50px", 
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical"
                    }}
                  >
                    {product.title}
                  </Card.Title>
                  
                  <p className="text-muted small mb-2">
                    <strong>by</strong> {product.author}
                  </p>

                  <Card.Text 
                    className="text-muted small mb-3"
                    style={{
                      height: "40px",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical"
                    }}
                  >
                    {product.description}
                  </Card.Text>

                  <div className="d-flex align-items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-warning" size={14} />
                    ))}
                    <span className="ms-2 small text-muted">(4.5)</span>
                  </div>

                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="fw-bold text-primary fs-4">₹{product.price}</span>
                    <div className="d-flex align-items-center">
                      <span className="me-2 small">Qty:</span>
                      <Form.Control
                        type="number"
                        min="1"
                        max="10"
                        value={quantities[product.id] || 1}
                        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                        style={{ width: "60px", height: "35px" }}
                        size="sm"
                      />
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    className="mt-auto d-flex align-items-center justify-content-center"
                    onClick={() => handleAddToCart(product)}
                    style={{ backgroundColor: "#667eea", borderColor: "#667eea" }}
                  >
                    <FaShoppingCart className="me-2" />
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
  ))}
        </Row>
      )}
      </Container>
    </div>
  );
}

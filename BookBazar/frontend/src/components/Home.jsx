import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Card,
  Spinner,
  Row,
  Col,
  Carousel,
  Form,
} from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { BOOKS_API_URL } from "../constants/APIConstants";
import { useNavigate } from "react-router-dom";
import { FaBook, FaStar, FaShoppingCart, FaHeart, FaInfoCircle, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BiBookOpen } from "react-icons/bi";
import { MdLocalShipping, MdSecurity, MdSupport } from "react-icons/md";
import { useTheme } from "../contexts/ThemeContext";
import "bootstrap/dist/css/bootstrap.min.css";

export function HomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentBookSlide, setCurrentBookSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { colors } = useTheme();

  const booksPerSlide = 4;
  const totalSlides = Math.ceil(filteredProducts.length / booksPerSlide);

  const bannerImage = "https://pixelbookworks.com/cdn/shop/files/pixelbookworks-bc-banner-final.jpg?v=1722525430&width=3840";

  async function fetchData() {
    try {
      const productRes = await axios.get(BOOKS_API_URL);
      setProducts(productRes.data || []);
      setFilteredProducts(productRes.data || []);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(productRes.data.map(book => book.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load books.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (filteredProducts.length > booksPerSlide) {
      const interval = setInterval(() => {
        setCurrentBookSlide((prev) => (prev + 1) % totalSlides);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [filteredProducts.length, totalSlides]);

  // Filter products by category
  useEffect(() => {
    if (!selectedCategory) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(book => book.category === selectedCategory));
    }
    setCurrentBookSlide(0); // Reset slide when category changes
  }, [products, selectedCategory]);

  const nextBookSlide = () => {
    setCurrentBookSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevBookSlide = () => {
    setCurrentBookSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };



  return (
    <div style={{ backgroundColor: colors.background, minHeight: "100vh", paddingTop: "70px" }}>
      {/* Hero Image */}
      <div className="position-relative" style={{ height: "550px", overflow: "hidden" }}>
        <div
          className="w-100 h-100"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0,0,0,0.5)), url(${bannerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Buttons at bottom center */}
          <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4">
            <div 
              className="text-center text-white px-4 py-3 rounded"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(5px)'
              }}
            >
              <p className="fw-bold mb-3 lead">Discover thousands of books at amazing prices</p>
              <div className="d-flex gap-3 justify-content-center">
                <Button 
                  size="lg" 
                  className="px-4"
                  onClick={() => navigate("/about")}
                  style={{ 
                    backgroundColor: colors.accent, 
                    borderColor: colors.accent,
                    color: '#000000ff',
                    fontWeight: 'bold'
                  }}
                >
                  <FaInfoCircle className="me-2" />
                  Learn More
                </Button>
                <Button 
                  size="lg" 
                  className="px-4"
                  onClick={() => navigate("/products")}
                  style={{ 
                    backgroundColor: colors.accent, 
                    borderColor: colors.accent,
                    color: '#000000ff',
                    fontWeight: 'bold'
                  }}
                >
                  <FaShoppingCart className="me-2" />
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Books Section */}
      <Container className="py-5">
        <Row className="text-center mb-4">
          <Col>
            <BiBookOpen size={50} className="mb-3" style={{ color: colors.primary }} />
            <h2 className="fw-bold mb-2" style={{ color: colors.text }}>Featured Books</h2>
            <p style={{ color: colors.textMuted }}>Discover our handpicked collection of bestsellers</p>
          </Col>
        </Row>

        {/* Category Filter */}
        <Row className="justify-content-center mb-4">
          <Col md={4}>
            <Form.Select 
              size="lg" 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ border: "2px solid #e9ecef", borderRadius: "10px" }}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading books...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-muted">No books available in this category.</p>
        ) : (
          <div className="position-relative">
            <div className="overflow-hidden">
              <div 
                className="d-flex transition-transform"
                style={{
                  transform: `translateX(-${currentBookSlide * 100}%)`,
                  transition: "transform 0.5s ease-in-out"
                }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-100 flex-shrink-0">
                    <Row className="g-4">
                      {filteredProducts
                        .slice(slideIndex * booksPerSlide, (slideIndex + 1) * booksPerSlide)
                        .map((book) => (
                        <Col key={book.id} lg={3} md={6} sm={6}>
                          <Card 
                            className="shadow-sm h-100 book-card"
                            style={{ 
                              backgroundColor: colors.surface,
                              border: `1px solid ${colors.border}`,
                              color: colors.text
                            }}
                          >
                            <div className="position-relative overflow-hidden">
                              <Card.Img
                                variant="top"
                                src={book.imageUrl || "https://via.placeholder.com/300x400?text=No+Image"}
                                onError={(e) => {
                                  e.target.src = "https://via.placeholder.com/300x400?text=Book+Cover";
                                }}
                                style={{
                                  height: "400px",
                                  objectFit: "cover",
                                  transition: "transform 0.3s ease"
                                }}
                                className="book-image"
                              />
                              <div className="position-absolute top-0 end-0 p-2">
                                <FaHeart className="text-danger" size={20} style={{ cursor: "pointer" }} />
                              </div>
                            </div>
                            <Card.Body className="d-flex flex-column">
                              <Card.Title 
                                className="fw-bold mb-2" 
                                style={{ 
                                  fontSize: "1rem", 
                                  height: "48px", 
                                  overflow: "hidden",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical"
                                }}
                              >
                                {book.title}
                              </Card.Title>
                              <p className="text-muted small mb-2">{book.author}</p>
                              <div className="d-flex align-items-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar key={i} className="text-warning" size={12} />
                                ))}
                                <span className="ms-2 small text-muted">(4.5)</span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mt-auto">
                                <span className="fw-bold fs-5" style={{ color: colors.primary }}>₹{book.price}</span>
                                <Button 
                                  size="sm"
                                  onClick={() => navigate("/products")}
                                  style={{
                                    backgroundColor: colors.primary,
                                    borderColor: colors.primary,
                                    color: colors.surface
                                  }}
                                >
                                  <FaShoppingCart className="me-1" />
                                  View
                                </Button>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Arrows */}
            {totalSlides > 1 && (
              <>
                <Button
                  className="position-absolute top-50 start-0 translate-middle-y"
                  style={{ 
                    zIndex: 10, 
                    borderRadius: "50%", 
                    width: "50px", 
                    height: "50px",
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    color: colors.text,
                    marginLeft: "-25px"
                  }}
                  onClick={prevBookSlide}
                >
                  <FaChevronLeft />
                </Button>
                <Button
                  className="position-absolute top-50 end-0 translate-middle-y"
                  style={{ 
                    zIndex: 10, 
                    borderRadius: "50%", 
                    width: "50px", 
                    height: "50px",
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    color: colors.text,
                    marginRight: "-25px"
                  }}
                  onClick={nextBookSlide}
                >
                  <FaChevronRight />
                </Button>
              </>
            )}
            
            {/* Slide Indicators */}
            {totalSlides > 1 && (
              <div className="d-flex justify-content-center mt-4">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    className="btn btn-sm mx-1"
                    style={{
                      backgroundColor: index === currentBookSlide ? colors.primary : 'transparent',
                      borderColor: colors.border,
                      color: index === currentBookSlide ? colors.surface : colors.text,
                      width: "12px", 
                      height: "12px", 
                      borderRadius: "50%", 
                      padding: 0
                    }}
                    onClick={() => setCurrentBookSlide(index)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        
        <div className="text-center mt-5">
          <Button 
            variant="primary" 
            size="lg"
            className="px-5 py-3"
            onClick={() => navigate("/products")}
            style={{ backgroundColor: "#667eea", borderColor: "#667eea", borderRadius: "50px" }}
          >
            <BiBookOpen className="me-2" />
            Explore Our Complete Collection
          </Button>
        </div>
      </Container>

    

      {/* Categories Section */}
      <div style={{ backgroundColor: colors.surface, padding: "60px 0" }}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold mb-3" style={{ color: colors.text }}>Explore by Categories</h2>
              <p style={{ color: colors.textMuted }}>Discover books across all your favorite genres</p>
            </Col>
          </Row>
          <Row className="g-4">
            <Col md={3} sm={6}>
              <Card 
                className="shadow-sm text-center p-4 category-card" 
                style={{ 
                  cursor: "pointer",
                  backgroundColor: colors.background,
                  border: `1px solid ${colors.border}`,
                  color: colors.text
                }}
              >
                <div className="mb-3">
                  <div 
                    className="rounded-circle mx-auto d-flex align-items-center justify-content-center"
                    style={{ width: "80px", height: "80px", backgroundColor: colors.primary + '20' }}
                  >
                    <FaBook size={30} style={{ color: colors.primary }} />
                  </div>
                </div>
                <h6 className="fw-bold">Fiction</h6>
                <p className="small mb-0" style={{ color: colors.textMuted }}>Novels, Romance, Thriller</p>
              </Card>
            </Col>
            <Col md={3} sm={6}>
              <Card 
                className="shadow-sm text-center p-4 category-card" 
                style={{ 
                  cursor: "pointer",
                  backgroundColor: colors.background,
                  border: `1px solid ${colors.border}`,
                  color: colors.text
                }}
              >
                <div className="mb-3">
                  <div 
                    className="rounded-circle mx-auto d-flex align-items-center justify-content-center"
                    style={{ width: "80px", height: "80px", backgroundColor: colors.secondary + '20' }}
                  >
                    <BiBookOpen size={30} style={{ color: colors.secondary }} />
                  </div>
                </div>
                <h6 className="fw-bold">Non-Fiction</h6>
                <p className="small mb-0" style={{ color: colors.textMuted }}>Biography, History, Science</p>
              </Card>
            </Col>
            <Col md={3} sm={6}>
              <Card 
                className="shadow-sm text-center p-4 category-card" 
                style={{ 
                  cursor: "pointer",
                  backgroundColor: colors.background,
                  border: `1px solid ${colors.border}`,
                  color: colors.text
                }}
              >
                <div className="mb-3">
                  <div 
                    className="rounded-circle mx-auto d-flex align-items-center justify-content-center"
                    style={{ width: "80px", height: "80px", backgroundColor: colors.success + '20' }}
                  >
                    <FaBook size={30} style={{ color: colors.success }} />
                  </div>
                </div>
                <h6 className="fw-bold">Educational</h6>
                <p className="small mb-0" style={{ color: colors.textMuted }}>Textbooks, Reference, Study</p>
              </Card>
            </Col>
            <Col md={3} sm={6}>
              <Card 
                className="shadow-sm text-center p-4 category-card" 
                style={{ 
                  cursor: "pointer",
                  backgroundColor: colors.background,
                  border: `1px solid ${colors.border}`,
                  color: colors.text
                }}
              >
                <div className="mb-3">
                  <div 
                    className="rounded-circle mx-auto d-flex align-items-center justify-content-center"
                    style={{ width: "80px", height: "80px", backgroundColor: colors.warning + '20' }}
                  >
                    <FaHeart size={30} style={{ color: colors.warning }} />
                  </div>
                </div>
                <h6 className="fw-bold">Children's</h6>
                <p className="small mb-0" style={{ color: colors.textMuted }}>Kids Stories, Comics, Learning</p>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Testimonials Section */}
      <div style={{ backgroundColor: colors.background, padding: "60px 0" }}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <FaQuoteLeft size={50} className="mb-3" style={{ color: colors.primary }} />
              <h2 className="fw-bold mb-3" style={{ color: colors.text }}>What Our Readers Say</h2>
              <p style={{ color: colors.textMuted }}>Trusted by thousands of book lovers</p>
            </Col>
          </Row>
          <Row className="g-4">
            <Col md={4}>
              <Card 
                className="shadow-sm h-100 text-center p-4"
                style={{ 
                  backgroundColor: colors.surface,
                  border: `1px solid ${colors.border}`,
                  color: colors.text
                }}
              >
                <Card.Body>
                  <div className="mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} style={{ color: colors.warning }} />
                    ))}
                  </div>
                  <p className="fst-italic mb-3">
                    "BookBazar has an amazing collection and fast delivery! 
                    I've been a customer for over a year now."
                  </p>
                  <div>
                    <strong>Aditi Kulkarni</strong>
                    <br />
                    <small style={{ color: colors.textMuted }}>Verified Buyer</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card 
                className="shadow-sm h-100 text-center p-4"
                style={{ 
                  backgroundColor: colors.surface,
                  border: `1px solid ${colors.border}`,
                  color: colors.text
                }}
              >
                <Card.Body>
                  <div className="mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} style={{ color: colors.warning }} />
                    ))}
                  </div>
                  <p className="fst-italic mb-3">
                    "Absolutely love the interface and quality of books. 
                    Great prices and excellent customer service."
                  </p>
                  <div>
                    <strong>Rohan Patil</strong>
                    <br />
                    <small style={{ color: colors.textMuted }}>Verified Buyer</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card 
                className="shadow-sm h-100 text-center p-4"
                style={{ 
                  backgroundColor: colors.surface,
                  border: `1px solid ${colors.border}`,
                  color: colors.text
                }}
              >
                <Card.Body>
                  <div className="mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} style={{ color: colors.warning }} />
                    ))}
                  </div>
                  <p className="fst-italic mb-3">
                    "Best online bookstore! Found rare books that I couldn't 
                    find anywhere else. Highly recommended!"
                  </p>
                  <div>
                    <strong>Priya Sharma</strong>
                    <br />
                    <small style={{ color: colors.textMuted }}>Verified Buyer</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
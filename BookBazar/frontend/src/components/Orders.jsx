import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Badge,
  Button,
} from "react-bootstrap";
import { FaShoppingBag, FaCalendarAlt, FaCreditCard } from "react-icons/fa";
import { BiBookOpen } from "react-icons/bi";
import { toast } from "react-toastify";
import axios from "axios";
import { ORDER_API_URL, BOOKS_API_URL } from "../constants/APIConstants";


export function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState({});

  // Auto-update order status based on date
  const getOrderStatus = (orderDate, currentStatus) => {
    const now = new Date();
    const orderTime = new Date(orderDate);
    const daysDiff = Math.floor((now - orderTime) / (1000 * 60 * 60 * 24));
    
    if (daysDiff >= 2) return 'DELIVERED';
    if (daysDiff === 1) return 'IN_TRANSIT';
    if (daysDiff === 0) return 'PLACED';
    return currentStatus || 'PLACED';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'DELIVERED': return 'success';
      case 'IN_TRANSIT': return 'warning';
      case 'PLACED': return 'info';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'DELIVERED': return '✅';
      case 'IN_TRANSIT': return '🚚';
      case 'PLACED': return '📦';
      default: return '❓';
    }
  };

  useEffect(() => {
    fetchOrdersData();
  }, []);

  async function fetchOrdersData() {
    try {
      const userId = localStorage.getItem("userId");
      
      if (!userId) {
        toast.error("🔐 Please login to view orders");
        setOrders([]);
        setLoading(false);
        return;
      }
      
      let ordersData = [];
      let booksData = [];
      
      try {
        const [ordersResponse, booksResponse] = await Promise.all([
          axios.get(`${ORDER_API_URL}/user/${userId}`),
          axios.get(BOOKS_API_URL)
        ]);
        ordersData = ordersResponse.data;
        booksData = booksResponse.data;
      } catch (apiError) {
        console.log("API error:", apiError);
        ordersData = [];
        booksData = [];
      }
      
      // Create books lookup object
      const booksLookup = {};
      booksData.forEach(book => {
        booksLookup[book.id] = book;
      });
      console.log("Books lookup:", booksLookup);
      
      // Update order statuses based on date
      const updatedOrders = ordersData.map(order => ({
        ...order,
        status: getOrderStatus(order.orderDate, order.status)
      }));
      
      setOrders(updatedOrders.reverse());
      setBooks(booksLookup);
    } catch (err) {
      console.error("Error loading orders:", err);
      toast.error("❌ Failed to load orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingTop: "100px" }}>
      <Container>
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading orders...</p>
        </div>
      </Container>
    </div>
  );

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingTop: "100px", paddingBottom: "2rem" }}>
      <Container>
        <div className="text-center mb-5">
          <FaShoppingBag size={50} className="text-primary mb-3" />
          <h2 className="fw-bold mb-3">Your Orders</h2>
          <p className="text-muted">Track and manage your book orders</p>
          

        </div>

        {orders.length === 0 ? (
          <Card className="border-0 shadow-sm text-center py-5">
            <Card.Body>
              <BiBookOpen size={80} className="text-muted mb-3" />
              <h4 className="text-muted mb-3">No orders yet</h4>
              <p className="text-muted mb-0">Start shopping to see your orders here!</p>
            </Card.Body>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="border shadow-sm mb-4">
                <Card.Header className="bg-light py-3">
                  <Row className="align-items-center">
                    <Col md={6}>
                      <div className="d-flex align-items-center">
                        <Badge bg={getStatusColor(order.status)} className="me-3 px-3 py-2">
                          {getStatusIcon(order.status)} {order.status}
                        </Badge>
                        <div>
                          <p className="mb-0 fw-bold">Ordered on {new Date(order.orderDate).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</p>
                        </div>
                      </div>
                    </Col>
                    <Col md={6} className="text-end">
                      <h5 className="mb-0 fw-bold text-primary">₹{order.totalAmount}</h5>
                    </Col>
                  </Row>
                </Card.Header>
                
                <Card.Body className="p-0">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item, itemIndex) => {
                      const book = books[item.bookId];
                      return (
                        <div key={itemIndex} className={`p-4 ${itemIndex !== order.items.length - 1 ? 'border-bottom' : ''}`}>
                          <Row className="align-items-center">
                            <Col md={2}>
                              <img
                                src={book?.imageUrl}
                                alt={book?.title || "Book"}
                                className="img-fluid rounded"
                                style={{ width: "80px", height: "100px", objectFit: "cover" }}
                              />
                            </Col>
                            <Col md={6}>
                              <h6 className="fw-bold mb-1">{book?.title || `Book ID: ${item.bookId}`}</h6>
                              <p className="text-muted small mb-1">{book?.author || 'Unknown Author'}</p>
                              <p className="text-muted small mb-0">Quantity: {item.quantity}</p>
                            </Col>
                            <Col md={2}>
                              <span className="fw-bold">₹{item.price}</span>
                            </Col>
                            <Col md={2} className="text-end">
                              <Button variant="outline-primary" size="sm">
                                Buy Again
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-4 text-center text-muted">
                      No items found in this order
                    </div>
                  )}
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

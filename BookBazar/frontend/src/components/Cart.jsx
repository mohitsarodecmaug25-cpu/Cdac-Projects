import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form, Badge } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { ORDER_API_URL } from "../constants/APIConstants";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTrash, FaPlus, FaMinus, FaCreditCard, FaArrowLeft } from "react-icons/fa";
import { BiBookOpen } from "react-icons/bi";
import "react-toastify/dist/ReactToastify.css";

export function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setCartItems([]);
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(cart);
  }, []);

  
  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  }, [cartItems]);

  
  const handleQuantityChange = (id, newQty) => {
    if (newQty < 1) return;
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQty } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  
  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
    toast.info("🗑️ Item removed from cart", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.warning("🛒 Your cart is empty!");
      return;
    }



    // Dummy Razorpay Payment
    const options = {
      key: "rzp_test_dummy123456789",
      amount: total * 100,
      currency: "INR",
      name: "BookBazar",
      description: "Book Purchase",
      handler: async function (response) {
        try {
          const userId = localStorage.getItem("userId");
          
          const orderData = {
            userId: userId,
            totalAmount: total,
            status: "PLACED",
            items: cartItems.map(item => ({
              bookId: item.id,
              quantity: item.quantity,
              price: item.price
            }))
          };

          await axios.post(ORDER_API_URL, orderData);
          
          toast.success("💳 Payment successful! Order placed.", { autoClose: 2000 });
          localStorage.removeItem("cartItems");
          setCartItems([]);
          window.dispatchEvent(new Event('cartUpdated'));
          
          setTimeout(() => {
            navigate("/orders");
          }, 2000);
        } catch (error) {
          console.error('Order creation failed:', error);
          toast.error("❌ Order failed. Please try again.", { autoClose: 3000 });
        }
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#667eea"
      }
    };

    const rzp = {
      open: () => {
        const paymentModal = document.createElement('div');
        paymentModal.innerHTML = `
          <div onclick="event.target === this && window.closePaymentModal()" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 9999; display: flex; align-items: center; justify-content: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <div style="background: white; border-radius: 12px; width: 90%; max-width: 500px; height: auto; box-shadow: 0 20px 40px rgba(0,0,0,0.2);">
              
              <!-- Header -->
              <div style="padding: 20px; border-bottom: 1px solid #e2e8f0; text-align: center;">
                <h3 style="margin: 0; color: #1a202c; font-size: 20px; font-weight: 600;">BookBazar Payment</h3>
                <p style="margin: 5px 0 0; color: #718096; font-size: 14px;">Secure Checkout - ₹${total}</p>
              </div>
              
              <!-- Payment Methods -->
              <div style="padding: 20px;">
                <h4 style="color: #2d3748; margin-bottom: 15px; font-size: 16px; font-weight: 600;">Select Payment Method</h4>
                
                <!-- UPI -->
                <div onclick="window.showPaymentForm('upi')" style="border: 2px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 12px; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.borderColor='#667eea'" onmouseout="this.style.borderColor='#e2e8f0'">
                  <div style="display: flex; align-items: center;">
                    <div style="width: 40px; height: 40px; background: #00d4aa; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                    </div>
                    <div>
                      <div style="font-weight: 600; color: #2d3748; font-size: 16px;">UPI Payment</div>
                      <div style="color: #718096; font-size: 13px;">Pay using any UPI app</div>
                    </div>
                  </div>
                </div>
                
                <!-- Cards -->
                <div onclick="window.showPaymentForm('card')" style="border: 2px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 12px; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.borderColor='#667eea'" onmouseout="this.style.borderColor='#e2e8f0'">
                  <div style="display: flex; align-items: center;">
                    <div style="width: 40px; height: 40px; background: #667eea; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
                    </div>
                    <div>
                      <div style="font-weight: 600; color: #2d3748; font-size: 16px;">Credit/Debit Cards</div>
                      <div style="color: #718096; font-size: 13px;">Visa, Mastercard, RuPay</div>
                    </div>
                  </div>
                </div>
                
                <!-- Net Banking -->
                <div onclick="window.showPaymentForm('netbanking')" style="border: 2px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 12px; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.borderColor='#667eea'" onmouseout="this.style.borderColor='#e2e8f0'">
                  <div style="display: flex; align-items: center;">
                    <div style="width: 40px; height: 40px; background: #4ecdc4; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10z"/></svg>
                    </div>
                    <div>
                      <div style="font-weight: 600; color: #2d3748; font-size: 16px;">Net Banking</div>
                      <div style="color: #718096; font-size: 13px;">All major banks supported</div>
                    </div>
                  </div>
                </div>
                
                <!-- Wallets -->
                <div onclick="window.showPaymentForm('wallet')" style="border: 2px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 20px; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.borderColor='#667eea'" onmouseout="this.style.borderColor='#e2e8f0'">
                  <div style="display: flex; align-items: center;">
                    <div style="width: 40px; height: 40px; background: #ffa726; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
                    </div>
                    <div>
                      <div style="font-weight: 600; color: #2d3748; font-size: 16px;">Digital Wallets</div>
                      <div style="color: #718096; font-size: 13px;">Paytm, PhonePe, Amazon Pay, Mobikwik</div>
                    </div>
                  </div>
                </div>
                
                <!-- Payment Form -->
                <div id="paymentFormContainer" style="display: none; margin-bottom: 20px;"></div>
                
                <!-- Security Badge -->
                <div style="background: #f0fff4; border: 1px solid #9ae6b4; border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                  <div style="display: flex; align-items: center; color: #2f855a; justify-content: center;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 8px;"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
                    <span style="font-size: 13px; font-weight: 600;">100% Secure & Encrypted Payment</span>
                  </div>
                </div>
                
                <!-- Cancel Button -->
                <button onclick="window.closePaymentModal()" style="width: 100%; padding: 14px; background: #f7fafc; color: #4a5568; border: 1px solid #e2e8f0; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 15px;">Cancel Payment</button>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(paymentModal);
        
        window.showPaymentForm = (method) => {
          const container = document.getElementById('paymentFormContainer');
          container.style.display = 'block';
          
          let formHTML = '';
          
          if (method === 'upi') {
            formHTML = `
              <h4 style="color: #1a202c; margin-bottom: 20px; font-size: 16px; font-weight: 600;">UPI Payment</h4>
              <input type="text" placeholder="Enter UPI ID (e.g., user@paytm)" style="width: 100%; padding: 14px; margin-bottom: 15px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 15px;" />
              <div style="background: #f0fff4; border: 1px solid #9ae6b4; border-radius: 8px; padding: 12px; margin-bottom: 15px; color: #2f855a; font-size: 13px;">
                🚀 Instant payment confirmation
              </div>
              <button onclick="window.rzpSuccess('upi')" style="width: 100%; padding: 14px; background: #00d4aa; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 15px;">Pay ₹${total}</button>
            `;
          } else if (method === 'card') {
            formHTML = `
              <h4 style="color: #1a202c; margin-bottom: 20px; font-size: 16px; font-weight: 600;">Card Details</h4>
              <input type="text" placeholder="Card Number" style="width: 100%; padding: 14px; margin-bottom: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 15px;" />
              <div style="display: flex; gap: 12px; margin-bottom: 12px;">
                <input type="text" placeholder="MM/YY" style="flex: 1; padding: 14px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 15px;" />
                <input type="text" placeholder="CVV" style="flex: 1; padding: 14px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 15px;" />
              </div>
              <input type="text" placeholder="Cardholder Name" style="width: 100%; padding: 14px; margin-bottom: 15px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 15px;" />
              <div style="background: #fef5e7; border: 1px solid #f6ad55; border-radius: 8px; padding: 12px; margin-bottom: 15px; color: #c05621; font-size: 13px;">
                🛡️ Your payment information is encrypted and secure
              </div>
              <button onclick="window.rzpSuccess('card')" style="width: 100%; padding: 14px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 15px;">Pay ₹${total}</button>
            `;
          } else if (method === 'netbanking') {
            formHTML = `
              <h4 style="color: #1a202c; margin-bottom: 20px; font-size: 16px; font-weight: 600;">Select Bank</h4>
              <select style="width: 100%; padding: 14px; margin-bottom: 15px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 15px;">
                <option>State Bank of India</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
                <option>Punjab National Bank</option>
                <option>Bank of Baroda</option>
                <option>Canara Bank</option>
              </select>
              <div style="background: #ebf8ff; border: 1px solid #90cdf4; border-radius: 8px; padding: 12px; margin-bottom: 15px; color: #2b6cb0; font-size: 13px;">
                🔐 Secure bank authentication
              </div>
              <button onclick="window.rzpSuccess('netbanking')" style="width: 100%; padding: 14px; background: #4ecdc4; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 15px;">Pay ₹${total}</button>
            `;
          } else if (method === 'wallet') {
            formHTML = `
              <h4 style="color: #1a202c; margin-bottom: 15px; font-size: 16px; font-weight: 600;">Choose Your Wallet</h4>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
                <button onclick="window.rzpSuccess('paytm')" style="padding: 12px; background: #00baf2; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 13px;">Paytm</button>
                <button onclick="window.rzpSuccess('phonepe')" style="padding: 12px; background: #5f259f; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 13px;">PhonePe</button>
                <button onclick="window.rzpSuccess('amazonpay')" style="padding: 12px; background: #ff9900; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 13px;">Amazon Pay</button>
                <button onclick="window.rzpSuccess('mobikwik')" style="padding: 12px; background: #d32f2f; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 13px;">Mobikwik</button>
              </div>
            `;
          }
          
          container.innerHTML = formHTML;
        };
        
        window.rzpSuccess = (method) => {
          const modal = document.querySelector('[style*="position: fixed"]');
          if (modal) modal.remove();
          options.handler({ razorpay_payment_id: "pay_" + method + "_" + Date.now() });
        };
        
        window.closePaymentModal = () => {
          const modal = document.querySelector('[style*="position: fixed"]');
          if (modal) modal.remove();
        };
      }
    };

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      rzp.open();
    }, 1000);
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingTop: "2rem", paddingBottom: "2rem" }}>
      <Container>
        <ToastContainer position="top-center" />
        
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <Button 
            variant="outline-primary" 
            onClick={() => navigate("/products")}
            className="d-flex align-items-center"
          >
            <FaArrowLeft className="me-2" />
            Continue Shopping
          </Button>
          <div className="text-center">
            <FaShoppingCart size={40} className="text-primary mb-2" />
            <h2 className="fw-bold mb-0">Shopping Cart</h2>
          </div>
          <div></div>
        </div>

        {cartItems.length === 0 ? (
          <Card className="border-0 shadow-sm text-center py-5">
            <Card.Body>
              <BiBookOpen size={80} className="text-muted mb-3" />
              <h4 className="text-muted mb-3">Your cart is empty</h4>
              <p className="text-muted mb-4">Looks like you haven't added any items to your cart yet.</p>
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => navigate("/products")}
                style={{ backgroundColor: "#667eea", borderColor: "#667eea" }}
              >
                <BiBookOpen className="me-2" />
                Start Shopping
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <Row>
            {/* Cart Items */}
            <Col lg={8}>
              <Card className="border-0 shadow-sm mb-4">
                <Card.Header className="bg-white border-0 py-3">
                  <h5 className="mb-0 fw-bold">Cart Items ({cartItems.length})</h5>
                </Card.Header>
                <Card.Body className="p-0">
                  {cartItems.map((item, index) => (
                    <div key={item.id} className={`p-4 ${index !== cartItems.length - 1 ? 'border-bottom' : ''}`}>
                      <Row className="align-items-center">
                        <Col md={2}>
                          <img
                            src={item.imageUrl || "https://via.placeholder.com/100x120?text=No+Image"}
                            alt={item.name}
                            className="img-fluid rounded"
                            style={{ width: "80px", height: "100px", objectFit: "cover" }}
                          />
                        </Col>
                        <Col md={4}>
                          <h6 className="fw-bold mb-1">{item.name}</h6>
                          <p className="text-muted small mb-0">{item.type === 'book' ? 'Book' : 'Product'}</p>
                        </Col>
                        <Col md={2}>
                          <span className="fw-bold text-primary">₹{item.price}</span>
                        </Col>
                        <Col md={3}>
                          <div className="d-flex align-items-center justify-content-center">
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <FaMinus size={10} />
                            </Button>
                            <span className="mx-3 fw-bold">{item.quantity}</span>
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <FaPlus size={10} />
                            </Button>
                          </div>
                        </Col>
                        <Col md={1}>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleRemove(item.id)}
                          >
                            <FaTrash />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>

            {/* Order Summary */}
            <Col lg={4}>
              <Card className="border-0 shadow-sm sticky-top" style={{ top: "2rem" }}>
                <Card.Header className="bg-primary text-white py-3">
                  <h5 className="mb-0 fw-bold text-center">Order Summary</h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="fw-bold">₹{total}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Shipping</span>
                    <span className="text-success fw-bold">FREE</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Tax</span>
                    <span>₹0</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-4">
                    <h5 className="fw-bold">Total</h5>
                    <h5 className="fw-bold text-primary">₹{total}</h5>
                  </div>
                  
                  <div className="mb-3">
                    <Badge bg="success" className="w-100 py-2 fs-6">
                      Free shipping for every order
                    </Badge>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-100 d-flex align-items-center justify-content-center"
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    style={{ backgroundColor: "#667eea", borderColor: "#667eea" }}
                  >
                    {loading ? (
                      "Processing..."
                    ) : (
                      <>
                        <FaCreditCard className="me-2" />
                        Proceed to Checkout
                      </>
                    )}
                  </Button>
                  
                  <p className="text-muted small text-center mt-3 mb-0">
                    Secure checkout powered by SSL encryption
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

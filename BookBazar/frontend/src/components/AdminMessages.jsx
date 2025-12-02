import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Alert, Badge, Table, Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { FaEnvelope, FaUsers, FaTrash } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";
import { CONTACT_API_URL } from "../constants/APIConstants";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Add bulk purchase API URL - you can create this
const BULK_PURCHASE_API_URL = "/api/bulk-purchases";

export function AdminMessages() {
  const [queries, setQueries] = useState([]);
  const [bulkOrders, setBulkOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bulkLoading, setBulkLoading] = useState(true);
  const { colors } = useTheme();
  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please login to access this page");
      navigate("/login");
      return;
    }
  }, [navigate]);

  useEffect(() => {
    fetchQueries();
    fetchBulkOrders();
  }, []);

  const fetchQueries = async () => {
    try {
      const response = await axios.get(`${CONTACT_API_URL}/send-message`);
      setQueries(response.data || []);
    } catch (error) {
      console.error("Error fetching contact requests:", error);
      toast.error("Failed to load requests.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBulkOrders = async () => {
    try {
      const response = await axios.get(`${CONTACT_API_URL}/bulk-order`);
      setBulkOrders(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching bulk orders:", error);
      toast.error("Failed to load bulk orders.");
      setBulkOrders([]);
    } finally {
      setBulkLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;

    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${CONTACT_API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQueries(queries.filter((q) => q.id !== id));
      toast.success("Request deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete request.");
    }
  };

  return (
    <div style={{ backgroundColor: colors.background, minHeight: "100vh", paddingTop: "100px" }}>
      <Container>
        <ToastContainer position="top-center" />
        
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold d-flex align-items-center" style={{ color: colors.text }}>
              <FaEnvelope className="me-3" style={{ color: colors.primary }} />
              Admin Messages
            </h2>
          </Col>
        </Row>

        <Row>
          {/* Contact Requests */}
          <Col lg={8}>
            <Card className="shadow-sm mb-4" style={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}` }}>
              <Card.Header className="d-flex justify-content-between align-items-center" style={{ backgroundColor: colors.primary, color: "white" }}>
                <h5 className="mb-0 fw-bold">Contact Requests</h5>
                <Badge bg="light" text="dark">{queries.length} Total</Badge>
              </Card.Header>
              <Card.Body>
                {loading ? (
                  <div className="text-center py-4">
                    <Spinner animation="border" />
                    <p className="mt-2">Loading requests...</p>
                  </div>
                ) : queries.length === 0 ? (
                  <div className="text-center py-4" style={{ color: colors.textMuted }}>
                    <FaEnvelope size={50} className="mb-3" />
                    <p>No contact requests found</p>
                  </div>
                ) : (
                  <Table striped bordered hover responsive>
                    <thead style={{ backgroundColor: colors.background }}>
                      <tr>
                        <th style={{ color: colors.text }}>Sr No</th>
                        <th style={{ color: colors.text }}>Name</th>
                        <th style={{ color: colors.text }}>Phone</th>
                        <th style={{ color: colors.text }}>Description</th>
                        <th style={{ color: colors.text }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {queries.map((query, index) => (
                        <tr key={query.id}>
                          <td style={{ color: colors.text }}>{index + 1}</td>
                          <td style={{ color: colors.text }}>{query.fullName}</td>
                          <td style={{ color: colors.text }}>{query.phoneNumber}</td>
                          <td style={{ color: colors.text }}>{query.message}</td>
                          <td className="text-center">
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(query.id)}
                            >
                              <FaTrash size={12} className="me-1" />
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Bulk Purchase Requests */}
          <Col lg={4}>
            <Card className="shadow-sm" style={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}` }}>
              <Card.Header style={{ backgroundColor: colors.secondary, color: "white" }}>
                <h5 className="mb-0 fw-bold d-flex align-items-center">
                  <FaUsers className="me-2" />
                  Bulk Purchase Requests
                </h5>
              </Card.Header>
              <Card.Body style={{ maxHeight: "600px", overflowY: "auto" }}>
                {bulkLoading ? (
                  <div className="text-center py-4">
                    <Spinner animation="border" size="sm" />
                    <p className="mt-2 small">Loading bulk orders...</p>
                  </div>
                ) : bulkOrders.length === 0 ? (
                  <div className="text-center py-4" style={{ color: colors.textMuted }}>
                    <FaUsers size={40} className="mb-3" />
                    <p className="small">No bulk orders yet</p>
                  </div>
                ) : (
                  Array.isArray(bulkOrders) && bulkOrders.map((order) => (
                    <Card key={order.id} className="mb-3" style={{ backgroundColor: colors.background, border: `1px solid ${colors.border}` }}>
                      <Card.Body className="p-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="fw-bold mb-1" style={{ color: colors.text, fontSize: "14px" }}>
                            {order.fullName}
                          </h6>
                          <Badge bg={order.status === 'pending' ? 'warning' : order.status === 'approved' ? 'success' : 'danger'} className="small">
                            {order.status}
                          </Badge>
                        </div>
                        <p className="small mb-1" style={{ color: colors.text }}>
                          <strong>Qty:</strong> {order.quantity} books
                        </p>
                        <p className="small mb-2" style={{ color: colors.textMuted }}>
                          {order.details}
                        </p>
                        <div className="small mb-2" style={{ color: colors.textMuted }}>
                          <div>📧 {order.email}</div>
                          <div>📞 {order.phoneNumber}</div>
                        </div>
                        <small className="text-muted">
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                        </small>
                      </Card.Body>
                    </Card>
                  ))
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
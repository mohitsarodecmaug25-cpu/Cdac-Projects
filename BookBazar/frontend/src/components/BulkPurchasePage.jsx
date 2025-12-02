import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Button,
  Col,
  Container,
  Form as BootstrapForm,
  Row,
  Card,
} from "react-bootstrap";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { FaBoxes, FaEnvelope, FaUser, FaPhone, FaComment, FaPaperPlane } from "react-icons/fa";
import { BiBookOpen } from "react-icons/bi";
import axios from "axios";
import { CONTACT_API_URL } from "../constants/APIConstants";

export function BulkPurchasePage() {
  const validationSchema = Yup.object({
    requestType: Yup.string().required("Please select request type"),
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .required("Phone number required")
      .matches(/^[0-9]{10}$/, "Enter valid 10-digit phone"),
    quantity: Yup.number().when("requestType", {
      is: "bulk",
      then: () => Yup.number().min(50, "Minimum 50 books for bulk order").required("Quantity is required"),
      otherwise: () => Yup.number().notRequired()
    }),
    comment: Yup.string().required("Please enter your message"),
  });

  const handleSubmit = async (formData, { resetForm }) => {
    try {
      if (formData.requestType === "bulk") {
        const payload = {
          fullName: formData.name,
          email: formData.email,
          phoneNumber: formData.phone,
          quantity: parseInt(formData.quantity),
          details: formData.comment
        };
        await axios.post(`${CONTACT_API_URL}/bulk-order`, payload);
        toast.success("Your bulk purchase request has been submitted!");
      } else {
        const payload = {
          fullName: formData.name,
          email: formData.email,
          phoneNumber: formData.phone,
          message: formData.comment
        };
        await axios.post(`${CONTACT_API_URL}/send-message`, payload);
        toast.success("Your message has been sent successfully!");
      }
      resetForm();
    } catch (error) {
      console.error('Error submitting request:', error);
      toast.error("Failed to submit request. Please try again.");
    }
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingTop: "2rem", paddingBottom: "2rem" }}>
      <Container>
        {/* Header */}
        <div className="text-center mb-5">
          <FaBoxes size={60} className="text-primary mb-3" />
          <h1 className="fw-bold mb-3">Bulk Purchase & Contact</h1>
          <p className="text-muted lead">Get special pricing for bulk orders or send us a message</p>
        </div>

        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <Card className="border-0 shadow-lg" style={{ borderRadius: "20px" }}>
              <Card.Body className="p-5">
                <Formik
                  initialValues={{ 
                    requestType: "", 
                    name: "", 
                    email: "", 
                    phone: "", 
                    quantity: "",
                    comment: "" 
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {(formik) => {
                    const { handleChange, values, touched, errors, dirty, isValid } = formik;

                    return (
                      <BootstrapForm as={Form}>
                        {/* Request Type Selection */}
                        <div className="mb-4">
                          <h5 className="fw-bold mb-3">What would you like to do?</h5>
                          <Row>
                            <Col md={6}>
                              <Card 
                                className={`border-2 cursor-pointer ${values.requestType === 'bulk' ? 'border-primary bg-light' : 'border-light'}`}
                                style={{ cursor: "pointer" }}
                                onClick={() => formik.setFieldValue('requestType', 'bulk')}
                              >
                                <Card.Body className="text-center p-4">
                                  <Field
                                    type="radio"
                                    name="requestType"
                                    value="bulk"
                                    className="me-2"
                                  />
                                  <FaBoxes size={40} className="text-primary mb-2 d-block mx-auto" />
                                  <h6 className="fw-bold">Bulk Purchase</h6>
                                  <p className="text-muted small mb-0">Order 50+ books with special pricing</p>
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col md={6}>
                              <Card 
                                className={`border-2 cursor-pointer ${values.requestType === 'message' ? 'border-primary bg-light' : 'border-light'}`}
                                style={{ cursor: "pointer" }}
                                onClick={() => formik.setFieldValue('requestType', 'message')}
                              >
                                <Card.Body className="text-center p-4">
                                  <Field
                                    type="radio"
                                    name="requestType"
                                    value="message"
                                    className="me-2"
                                  />
                                  <FaEnvelope size={40} className="text-success mb-2 d-block mx-auto" />
                                  <h6 className="fw-bold">Send Message</h6>
                                  <p className="text-muted small mb-0">General inquiry or feedback</p>
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>
                          {touched.requestType && errors.requestType && (
                            <div className="text-danger small mt-2">{errors.requestType}</div>
                          )}
                        </div>

                        {values.requestType && (
                          <>
                            {/* Personal Information */}
                            <h5 className="fw-bold mb-3">Personal Information</h5>
                            <Row className="mb-3">
                              <Col md={6}>
                                <BootstrapForm.Group className="mb-3">
                                  <BootstrapForm.Label className="fw-semibold">
                                    <FaUser className="me-2" />
                                    Full Name
                                  </BootstrapForm.Label>
                                  <BootstrapForm.Control
                                    as={Field}
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    onChange={handleChange}
                                    value={values.name}
                                    isInvalid={touched.name && errors.name}
                                    style={{ 
                                      borderRadius: "10px",
                                      border: "2px solid #e9ecef",
                                      padding: "12px 16px"
                                    }}
                                  />
                                  <BootstrapForm.Control.Feedback type="invalid">
                                    <ErrorMessage name="name" />
                                  </BootstrapForm.Control.Feedback>
                                </BootstrapForm.Group>
                              </Col>

                              <Col md={6}>
                                <BootstrapForm.Group className="mb-3">
                                  <BootstrapForm.Label className="fw-semibold">
                                    <FaEnvelope className="me-2" />
                                    Email Address
                                  </BootstrapForm.Label>
                                  <BootstrapForm.Control
                                    as={Field}
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    onChange={handleChange}
                                    value={values.email}
                                    isInvalid={touched.email && errors.email}
                                    style={{ 
                                      borderRadius: "10px",
                                      border: "2px solid #e9ecef",
                                      padding: "12px 16px"
                                    }}
                                  />
                                  <BootstrapForm.Control.Feedback type="invalid">
                                    <ErrorMessage name="email" />
                                  </BootstrapForm.Control.Feedback>
                                </BootstrapForm.Group>
                              </Col>
                            </Row>

                            <Row className="mb-3">
                              <Col md={6}>
                                <BootstrapForm.Group className="mb-3">
                                  <BootstrapForm.Label className="fw-semibold">
                                    <FaPhone className="me-2" />
                                    Phone Number
                                  </BootstrapForm.Label>
                                  <BootstrapForm.Control
                                    as={Field}
                                    type="text"
                                    name="phone"
                                    placeholder="Enter phone number"
                                    onChange={handleChange}
                                    value={values.phone}
                                    isInvalid={touched.phone && errors.phone}
                                    style={{ 
                                      borderRadius: "10px",
                                      border: "2px solid #e9ecef",
                                      padding: "12px 16px"
                                    }}
                                  />
                                  <BootstrapForm.Control.Feedback type="invalid">
                                    <ErrorMessage name="phone" />
                                  </BootstrapForm.Control.Feedback>
                                </BootstrapForm.Group>
                              </Col>

                              {values.requestType === 'bulk' && (
                                <Col md={6}>
                                  <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label className="fw-semibold">
                                      <BiBookOpen className="me-2" />
                                      Quantity (Minimum 50)
                                    </BootstrapForm.Label>
                                    <BootstrapForm.Control
                                      as={Field}
                                      type="number"
                                      name="quantity"
                                      placeholder="Enter quantity"
                                      min="50"
                                      onChange={handleChange}
                                      value={values.quantity}
                                      isInvalid={touched.quantity && errors.quantity}
                                      style={{ 
                                        borderRadius: "10px",
                                        border: "2px solid #e9ecef",
                                        padding: "12px 16px"
                                      }}
                                    />
                                    <BootstrapForm.Control.Feedback type="invalid">
                                      <ErrorMessage name="quantity" />
                                    </BootstrapForm.Control.Feedback>
                                  </BootstrapForm.Group>
                                </Col>
                              )}
                            </Row>

                            {/* Message */}
                            <BootstrapForm.Group className="mb-4">
                              <BootstrapForm.Label className="fw-semibold">
                                <FaComment className="me-2" />
                                {values.requestType === 'bulk' ? 'Bulk Order Details' : 'Your Message'}
                              </BootstrapForm.Label>
                              <BootstrapForm.Control
                                as={Field}
                                component="textarea"
                                name="comment"
                                rows={5}
                                placeholder={
                                  values.requestType === 'bulk' 
                                    ? "Please specify book categories, preferred genres, or any special requirements for your bulk order..."
                                    : "Write your message here..."
                                }
                                onChange={handleChange}
                                value={values.comment}
                                isInvalid={touched.comment && errors.comment}
                                style={{ 
                                  borderRadius: "10px",
                                  border: "2px solid #e9ecef",
                                  padding: "12px 16px"
                                }}
                              />
                              <BootstrapForm.Control.Feedback type="invalid">
                                <ErrorMessage name="comment" />
                              </BootstrapForm.Control.Feedback>
                            </BootstrapForm.Group>

                            {/* Submit Button */}
                            <div className="d-grid">
                              <Button
                                type="submit"
                                disabled={!(dirty && isValid)}
                                size="lg"
                                className="fw-bold d-flex align-items-center justify-content-center"
                                style={{
                                  backgroundColor: "#667eea",
                                  borderColor: "#667eea",
                                  borderRadius: "10px",
                                  padding: "12px"
                                }}
                              >
                                <FaPaperPlane className="me-2" />
                                {values.requestType === 'bulk' ? 'Submit Bulk Request' : 'Send Message'}
                              </Button>
                            </div>

                            {values.requestType === 'bulk' && (
                              <div className="mt-4 p-3 bg-light rounded">
                                <h6 className="fw-bold text-primary">Bulk Order Benefits:</h6>
                                <ul className="mb-0 small">
                                  <li>Special discounted pricing for orders 50+ books</li>
                                  <li>Free shipping on all bulk orders</li>
                                  <li>Dedicated customer support</li>
                                  <li>Flexible payment terms available</li>
                                </ul>
                              </div>
                            )}
                          </>
                        )}
                      </BootstrapForm>
                    );
                  }}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
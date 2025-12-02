import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Button,
  Col,
  Container,
  Form as BootstrapForm,
  Row,
  Card,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { signUpSchema } from "../schemas/SignUpSchema";
import { useNavigate } from "react-router";
import { signupUser } from "../services/AuthService";
import { FaBook, FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaUserPlus, FaSignInAlt } from "react-icons/fa";

export function SignUpForm() {
  const navigate = useNavigate();


  const handleSubmit = async (formData, { resetForm }) => {
    try {
      await signupUser(formData);
      toast.success("Registration successful!");
      resetForm();
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data || "Registration failed!");
    }
  };

  return (
    <div 
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        paddingTop: "2rem",
        paddingBottom: "2rem"
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="border-0 shadow-lg" style={{ borderRadius: "20px" }}>
              <Card.Body className="p-5">
                {/* Logo and Title */}
                <div className="text-center mb-4">
                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <FaBook size={40} className="text-primary me-2" />
                    <h3 className="fw-bold mb-0" style={{ color: "#667eea" }}>BookBazar</h3>
                  </div>
                  <h2 className="fw-bold mb-2">Create Account</h2>
                  <p className="text-muted">Join thousands of book lovers today</p>
                </div>

              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  phone: "",
                  address: "",
                  role: "CUSTOMER",
                }}
                validationSchema={signUpSchema}
                onSubmit={handleSubmit}
              >
                {(formik) => {
                  const { errors, touched, dirty, isValid, handleChange, values } =
                    formik;
                  return (
                    <BootstrapForm as={Form}>
                      <Row>
                        {/* NAME */}
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

                        {/* EMAIL */}
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
                              onChange={(e) => {
                                handleChange(e);
                               
                                if (!e.target.value.endsWith('@bookbazaar.com') && values.role === 'ADMIN') {
                                  formik.setFieldValue('role', 'CUSTOMER');
                                }
                              }}
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

                      <Row>
                        {/* PASSWORD */}
                        <Col md={6}>
                          <BootstrapForm.Group className="mb-3">
                            <BootstrapForm.Label className="fw-semibold">
                              <FaLock className="me-2" />
                              Password
                            </BootstrapForm.Label>
                            <BootstrapForm.Control
                              as={Field}
                              type="password"
                              name="password"
                              placeholder="Create a password"
                              onChange={handleChange}
                              value={values.password}
                              isInvalid={touched.password && errors.password}
                              style={{ 
                                borderRadius: "10px",
                                border: "2px solid #e9ecef",
                                padding: "12px 16px"
                              }}
                            />
                            <BootstrapForm.Control.Feedback type="invalid">
                              <ErrorMessage name="password" />
                            </BootstrapForm.Control.Feedback>
                          </BootstrapForm.Group>
                        </Col>

                        {/* PHONE */}
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
                      </Row>

                      {/* ADDRESS */}
                      <BootstrapForm.Group className="mb-3">
                        <BootstrapForm.Label className="fw-semibold">
                          <FaMapMarkerAlt className="me-2" />
                          Address
                        </BootstrapForm.Label>
                        <BootstrapForm.Control
                          as={Field}
                          type="text"
                          name="address"
                          placeholder="Enter your complete address"
                          onChange={handleChange}
                          value={values.address}
                          isInvalid={touched.address && errors.address}
                          style={{ 
                            borderRadius: "10px",
                            border: "2px solid #e9ecef",
                            padding: "12px 16px"
                          }}
                        />
                        <BootstrapForm.Control.Feedback type="invalid">
                          <ErrorMessage name="address" />
                        </BootstrapForm.Control.Feedback>
                      </BootstrapForm.Group>

                      {/* ROLE */}
                      <BootstrapForm.Group className="mb-4">
                        <BootstrapForm.Label className="fw-semibold">
                          Account Type
                        </BootstrapForm.Label>
                        <Field
                          as={BootstrapForm.Select}
                          name="role"
                          style={{ 
                            borderRadius: "10px",
                            border: "2px solid #e9ecef",
                            padding: "12px 16px"
                          }}
                        >
                          <option value="CUSTOMER">Customer</option>
                          {values.email.endsWith('@bookbazaar.com') && (
                            <option value="ADMIN">Admin</option>
                          )}
                        </Field>
                        {!values.email.endsWith('@bookbazaar.com') && values.role === 'ADMIN' && (
                          <div className="text-danger small mt-1">
                            Admin accounts require @bookbazaar.com email
                          </div>
                        )}
                        <BootstrapForm.Control.Feedback type="invalid">
                          <ErrorMessage name="role" />
                        </BootstrapForm.Control.Feedback>
                      </BootstrapForm.Group>

                      {/* SUBMIT BUTTON */}
                      <div className="d-grid mb-4">
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
                          <FaUserPlus className="me-2" />
                          Create Account
                        </Button>
                      </div>

                      {/* Login Link */}
                      <div className="text-center">
                        <p className="text-muted mb-0">
                          Already have an account?{" "}
                          <Button 
                            variant="link" 
                            className="p-0 fw-bold"
                            style={{ color: "#667eea", textDecoration: "none" }}
                            onClick={() => navigate("/login")}
                          >
                            <FaSignInAlt className="me-1" />
                            Sign In
                          </Button>
                        </p>
                      </div>
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

import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Button,
  Col,
  Container,
  Form as BootstrapForm,
  Row,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../services/AuthService";
import { FaBook, FaEnvelope, FaLock, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import * as Yup from "yup";

export function LoginPage() {
  const navigate = useNavigate();

  const loginSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (formData, { resetForm }) => {
    try {
      const res = await loginUser(formData);

      toast.success("Login successful!");
      resetForm();

      // FIX: safer way
      const role = localStorage.getItem("userRole");

      if (role === "ADMIN") navigate("/");
      else navigate("/");

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed!");
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
          <Col xs={12} md={8} lg={5}>
            <Card className="border-0 shadow-lg" style={{ borderRadius: "20px" }}>
              <Card.Body className="p-5">
                {/* Logo and Title */}
                <div className="text-center mb-4">
                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <FaBook size={40} className="text-primary me-2" />
                    <h3 className="fw-bold mb-0" style={{ color: "#667eea" }}>BookBazar</h3>
                  </div>
                  <h2 className="fw-bold mb-2">Welcome Back!</h2>
                  <p className="text-muted">Sign in to your account to continue</p>
                </div>

              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
              >
                {(formik) => {
                  const {
                    errors,
                    touched,
                    dirty,
                    isValid,
                    handleChange,
                    values,
                  } = formik;

                  return (
                    <BootstrapForm as={Form}>
                      {/* EMAIL */}
                      <BootstrapForm.Group className="mb-4">
                        <BootstrapForm.Label className="fw-semibold">
                          <FaEnvelope className="me-2" />
                          Email Address
                        </BootstrapForm.Label>
                        <BootstrapForm.Control
                          as={Field}
                          type="email"
                          name="email"
                          placeholder="Enter your email address"
                          onChange={handleChange}
                          value={values.email}
                          isInvalid={touched.email && errors.email}
                          size="lg"
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

                      {/* PASSWORD */}
                      <BootstrapForm.Group className="mb-4">
                        <BootstrapForm.Label className="fw-semibold">
                          <FaLock className="me-2" />
                          Password
                        </BootstrapForm.Label>
                        <BootstrapForm.Control
                          as={Field}
                          type="password"
                          name="password"
                          placeholder="Enter your password"
                          onChange={handleChange}
                          value={values.password}
                          isInvalid={touched.password && errors.password}
                          size="lg"
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

                      {/* LOGIN BUTTON */}
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
                          <FaSignInAlt className="me-2" />
                          Sign In
                        </Button>
                      </div>

                      {/* Sign Up Link */}
                      <div className="text-center">
                        <p className="text-muted mb-0">
                          Don't have an account?{" "}
                          <Button 
                            variant="link" 
                            className="p-0 fw-bold"
                            style={{ color: "#667eea", textDecoration: "none" }}
                            onClick={() => navigate("/signup")}
                          >
                            <FaUserPlus className="me-1" />
                            Create Account
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

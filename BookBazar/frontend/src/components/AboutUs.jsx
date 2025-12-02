import { Container, Row, Col } from "react-bootstrap";
import { FaBook, FaUsers, FaShippingFast, FaAward, FaHeart, FaGlobe, FaGraduationCap, FaCode } from "react-icons/fa";
import { BiBookOpen } from "react-icons/bi";

export function AboutUs() {
  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Hero Section */}
      <div 
        className="position-relative"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          color: "white"
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="mb-4">
                <FaBook className="mb-3" size={60} color="#ffd700" />
                <h1 className="display-4 fw-bold mb-3">About BookBazar</h1>
                <p className="lead mb-4">
                  A CDAC WPJ Mini Project - Your trusted digital bookstore connecting readers 
                  with their favorite stories. Built with modern web technologies to provide 
                  the best book shopping experience.
                </p>
                <div className="d-flex align-items-center mb-3">
                  <FaGraduationCap className="me-2" size={24} />
                  <span className="fs-5">CDAC WPJ Mini Project 2024</span>
                </div>
                <div className="d-flex align-items-center">
                  <FaCode className="me-2" size={24} />
                  <span>Built with React, Spring Boot & Modern Web Technologies</span>
                </div>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="BookBazar - Online Bookstore"
                className="img-fluid rounded shadow-lg"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Project Info Section */}
      <Container className="py-5">
        <Row className="mb-5">
          <Col lg={10} className="mx-auto">
            <div className="bg-white rounded shadow-lg p-5">
              <h2 className="fw-bold mb-4 text-center text-primary">Project Information</h2>
              <Row className="g-4">
                <Col md={6}>
                  <div className="border-start border-primary border-4 ps-4">
                    <h5 className="fw-bold text-primary">Course Details</h5>
                    <p className="mb-1"><strong>Program:</strong> Post Graduate Diploma in Advanced Computing (PG-DAC)</p>
                    <p className="mb-1"><strong>Module:</strong> Web Programming Technologies (WPT)</p>
                    <p className="mb-1"><strong>Project Type:</strong> Mini Project</p>
                    <p className="mb-0"><strong>Academic Year:</strong> 2024-25</p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="border-start border-success border-4 ps-4">
                    <h5 className="fw-bold text-success">Technology Stack</h5>
                    <p className="mb-1"><strong>Frontend:</strong> React.js, Bootstrap, Tailwind CSS</p>
                    <p className="mb-1"><strong>Backend:</strong> Spring Boot, REST APIs</p>
                    <p className="mb-1"><strong>Database:</strong> MySQL</p>
                    <p className="mb-0"><strong>Tools:</strong> Vite, Axios, React Router</p>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        {/* Statistics */}
        <Row className="g-4 mb-5">
          <Col md={3} className="text-center">
            <div className="bg-white border-0 shadow-sm h-100 p-4 rounded">
              <BiBookOpen size={50} className="text-primary mx-auto mb-3" />
              <h3 className="fw-bold text-primary">1,000+</h3>
              <p className="text-muted mb-0">Books Available</p>
            </div>
          </Col>
          <Col md={3} className="text-center">
            <div className="bg-white border-0 shadow-sm h-100 p-4 rounded">
              <FaUsers size={50} className="text-success mx-auto mb-3" />
              <h3 className="fw-bold text-success">500+</h3>
              <p className="text-muted mb-0">Registered Users</p>
            </div>
          </Col>
          <Col md={3} className="text-center">
            <div className="bg-white border-0 shadow-sm h-100 p-4 rounded">
              <FaShippingFast size={50} className="text-warning mx-auto mb-3" />
              <h3 className="fw-bold text-warning">200+</h3>
              <p className="text-muted mb-0">Orders Processed</p>
            </div>
          </Col>
          <Col md={3} className="text-center">
            <div className="bg-white border-0 shadow-sm h-100 p-4 rounded">
              <FaCode size={50} className="text-info mx-auto mb-3" />
              <h3 className="fw-bold text-info">100%</h3>
              <p className="text-muted mb-0">Modern Tech Stack</p>
            </div>
          </Col>
        </Row>

        {/* Features */}
        <Row className="mb-5">
          <Col>
            <h2 className="fw-bold text-center mb-5">Key Features</h2>
            <Row className="g-4">
              <Col md={4}>
                <div className="bg-white border-0 shadow-sm h-100 text-center p-4 rounded">
                  <FaHeart size={50} className="text-danger mx-auto mb-3" />
                  <h5 className="fw-bold">User-Friendly Interface</h5>
                  <p className="text-muted">
                    Modern, responsive design with intuitive navigation and 
                    seamless user experience across all devices.
                  </p>
                </div>
              </Col>
              <Col md={4}>
                <div className="bg-white border-0 shadow-sm h-100 text-center p-4 rounded">
                  <FaAward size={50} className="text-warning mx-auto mb-3" />
                  <h5 className="fw-bold">Secure Transactions</h5>
                  <p className="text-muted">
                    Implemented secure authentication and authorization with 
                    JWT tokens and encrypted data transmission.
                  </p>
                </div>
              </Col>
              <Col md={4}>
                <div className="bg-white border-0 shadow-sm h-100 text-center p-4 rounded">
                  <FaUsers size={50} className="text-primary mx-auto mb-3" />
                  <h5 className="fw-bold">Admin Panel</h5>
                  <p className="text-muted">
                    Comprehensive admin dashboard for managing books, users, 
                    orders, and monitoring system performance.
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Team Section */}
      <div style={{ backgroundColor: "#fff", padding: "60px 0" }}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold mb-3">Development Team</h2>
              <p className="text-muted">CDAC WPT Mini Project Team Members</p>
            </Col>
          </Row>
          <Row className="g-4 justify-content-center">
            <Col md={4}>
              <div className="bg-white border-0 shadow-sm text-center p-4 rounded">
                <div className="mb-3">
                  <img 
                    src="/src/assets/images/WhatsApp Image 2025-08-28 at 09.43.58_176a2003.jpg"
                    alt="Team Member 1"
                    className="rounded-circle"
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>
                <h5 className="fw-bold">Sanket Shalukar</h5>
                <p className="text-primary small fw-semibold">Full Stack Developer</p>
                <p className="text-muted">
                  
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="bg-white border-0 shadow-sm text-center p-4 rounded">
                <div className="mb-3">
                  <img 
                    src="src\assets\images\WhatsApp Image 2025-11-29 at 21.52.11_bd947c90.jpg"
                    alt="Team Member 2"
                    className="rounded-circle"
                    style={{ width: "150px", height: "150px"}}
                  />
                </div>
                <h5 className="fw-bold">Mohit Sarode</h5>
                <p className="text-success small fw-semibold">Full Stack Developer</p>
                <p className="text-muted">
                  
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="bg-white border-0 shadow-sm text-center p-4 rounded">
                <div className="mb-3">
                  <img 
                    src="src\assets\images\Image20251130231918.jpg"
                    alt="Team Member 3"
                    className="rounded-circle"
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>
                <h5 className="fw-bold">Om Pawar</h5>
                <p className="text-warning small fw-semibold">Full Stack Developer</p>
                <p className="text-muted">
                  
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Mission & Vision */}
      <Container className="py-5">
        <Row className="g-4">
          <Col md={6}>
            <div className="h-100 p-4 rounded shadow-sm" style={{ backgroundColor: "#667eea", color: "white" }}>
              <h4 className="fw-bold mb-3">Project Objective</h4>
              <p className="mb-0">
                To develop a comprehensive e-commerce platform for books using modern web technologies, 
                demonstrating proficiency in full-stack development, RESTful APIs, database management, 
                and responsive web design as part of the CDAC WPT curriculum.
              </p>
            </div>
          </Col>
          <Col md={6}>
            <div className="h-100 p-4 rounded shadow-sm" style={{ backgroundColor: "#764ba2", color: "white" }}>
              <h4 className="fw-bold mb-3">Learning Outcomes</h4>
              <p className="mb-0">
                Gained hands-on experience in React.js, Spring Boot, MySQL, REST API development, 
                authentication & authorization, responsive design, and modern development practices 
                including version control and deployment strategies.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
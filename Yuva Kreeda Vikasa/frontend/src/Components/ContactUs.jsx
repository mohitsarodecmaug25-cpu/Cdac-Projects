import { Container, Alert, Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { toast, Bounce } from "react-toastify";

export function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Message sent successfully! We'll get back to you soon.", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
            transition: Bounce,
        });
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <Container className="mt-3 signupForm">
            <Alert variant="primary">Contact Us</Alert>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label className="text-white">Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="text-white">Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="text-white">Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        required
                    />
                </Form.Group>
                <div className="text-center mb-4">
                    <Button variant="primary" type="submit">Send Message</Button>
                </div>
            </Form>
            <Row className="text-white">
                <Col md={6}>
                    <h5>Get in Touch</h5>
                    <p>Email: info@yuvakreedasvikas.com</p>
                    <p>Phone: +91 9876543210</p>
                </Col>
                <Col md={6}>
                    <h5>Address</h5>
                    <p>Yuva Kreeda Vikas<br/>Sports Complex<br/>Mumbai, Maharashtra 400001</p>
                </Col>
            </Row>
        </Container>
    );
}
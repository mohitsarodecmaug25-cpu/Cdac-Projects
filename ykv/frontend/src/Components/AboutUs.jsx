import { Container, Alert } from "react-bootstrap";

export function AboutUs() {
    return (
        <Container className="mt-3 signupForm">
            <Alert variant="primary">About Yuva Kreeda Vikas</Alert>
            <div className="text-white">
                <p>Yuva Kreeda Vikas is dedicated to promoting sports and physical fitness among youth. Our platform connects aspiring athletes with experienced coaches to foster talent development and create opportunities for sporting excellence.</p>
                <p>We believe in nurturing young talent through structured training programs, professional coaching, and comprehensive sports management systems.</p>
                <h4 className="mt-4">Our Mission</h4>
                <p>To create a comprehensive sports ecosystem that empowers youth to achieve their athletic potential through quality coaching and systematic training programs.</p>
                <h4 className="mt-4">Our Vision</h4>
                <p>To be the leading platform for youth sports development in India, creating champions of tomorrow.</p>
            </div>
        </Container>
    );
}
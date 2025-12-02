import React from 'react';
import {  Row, Col } from 'react-bootstrap';


export function Footer() {
  return (
    
    <footer className=" footer  text-white mt-auto ">
      
        <Row>
          <Col md={6}>
            <p>&copy; {new Date().getFullYear()} Yuva Kreeda Vikas. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <p>Follow us on:
              <a href="#" className="text-white ms-2">Facebook</a>,
              <a href="#" className="text-white ms-2">Twitter</a>,
              <a href="#" className="text-white ms-2">Instagram</a>
            </p>
          </Col>
        </Row>
      
    </footer>
  );
};


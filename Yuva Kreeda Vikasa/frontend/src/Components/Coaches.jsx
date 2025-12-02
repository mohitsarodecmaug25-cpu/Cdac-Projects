import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { API_BASE_URL } from "../constants/APIConstants";

export const Coaches = () => {
  const [coaches_details, setDetails] = useState([]);

  async function fetchCoaches() {
    try {
      const response = await axios.get(`${API_BASE_URL}/coaches_details`);
      setDetails(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchCoaches();
  }, []);
  

  return (
    <Container className="mt-3 signupForm">
            <Row>
                <Col lg={8}>
                    <Alert variant="primary">Coaches List</Alert>
                </Col>
            </Row>
            {
                coaches_details.length === 0 ? <Alert variant="warning">No Coaches found</Alert> : <Table striped bordered hover variant="dark" className="mt-3">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>CoachName</th>
                            <th>Sport</th>
                            <th>Athlete</th>
                            <th>Athlete-gender</th>
                            <th>Athlete-age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            coaches_details.map((coach, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{coach.CoachName}</td>
                                        <td>{coach.name}</td>
                                        <td>{coach.AthleteName}</td>
                                        <td>{coach.gender}</td>
                                        <td>{coach.age}</td>
                                       
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>

            }

        </Container>
    
  );
};

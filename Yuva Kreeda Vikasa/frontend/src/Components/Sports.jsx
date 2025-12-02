import { useEffect, useState } from "react";
import { Alert, Container, Table, Button, Modal } from "react-bootstrap";
import { getAllSports } from "../services/SportService";
import axios from "axios";
import { API_BASE_URL } from "../constants/APIConstants";

export function Sports() {
    const [sports, setSports] = useState([]);
    const [coaches, setCoaches] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSport, setSelectedSport] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchSports = async () => {
        try {
            const response = await getAllSports();
            setSports(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCoaches = async (sportId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/coaches/${sportId}`);
            setCoaches(response.data);
        } catch (error) {
            console.log(error);
            setCoaches([]);
        }
    };

    const handleViewCoaches = (sport) => {
        setSelectedSport(sport);
        fetchCoaches(sport.id);
        setShowModal(true);
    };

    useEffect(() => {
        fetchSports();
    }, []);

    if (loading) return <div className="text-center text-white">Loading...</div>;

    return (
        <Container className="mt-3 signupForm">
            <Alert variant="primary">Available Sports</Alert>
            {sports.length === 0 ? (
                <Alert variant="warning">No sports available</Alert>
            ) : (
                <Table striped bordered hover variant="dark" className="mt-3">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Sport</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sports.map((sport, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{sport.name}</td>
                                <td>{sport.description}</td>
                                <td>
                                    <Button 
                                        variant="info" 
                                        size="sm"
                                        onClick={() => handleViewCoaches(sport)}
                                    >
                                        View Coaches
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Coaches for {selectedSport?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {coaches.length === 0 ? (
                        <Alert variant="warning">No coaches available for this sport</Alert>
                    ) : (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Experience</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coaches.map((coach, index) => (
                                    <tr key={index}>
                                        <td>{coach.name}</td>
                                        <td>{coach.experience} years</td>
                                        <td>{coach.email}</td>
                                        <td>{coach.phone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
}
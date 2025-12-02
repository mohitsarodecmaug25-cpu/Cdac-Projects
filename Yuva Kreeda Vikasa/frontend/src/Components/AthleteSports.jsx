import { useEffect, useState } from "react";
import { Alert, Button, Container, Table, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { API_BASE_URL } from "../constants/APIConstants";
import { jwtDecode } from "jwt-decode";
import { toast, Bounce } from "react-toastify";
import { getAthleteEnrollments, sendSportRequest } from "../services/AthleteService";

export function AthleteSports() {
    const [enrollments, setEnrollments] = useState([]);
    const [sports, setSports] = useState([]);
    const [coaches, setCoaches] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSport, setSelectedSport] = useState('');
    const [selectedCoach, setSelectedCoach] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchEnrollments = async () => {
        try {
            const token = localStorage.getItem('token');
            const decoded = jwtDecode(token);
            const athleteId = decoded.userId;
            
            const response = await getAthleteEnrollments(athleteId);
            setEnrollments(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSports = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/sports`);
            setSports(response.data);
        } catch (error) {
            console.log(error);
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

    const handleSportChange = (e) => {
        const sportId = e.target.value;
        setSelectedSport(sportId);
        setSelectedCoach('');
        if (sportId) {
            fetchCoaches(sportId);
        } else {
            setCoaches([]);
        }
    };

    const handleSendRequest = async () => {
        try {
            const token = localStorage.getItem('token');
            const decoded = jwtDecode(token);
            const athleteId = decoded.userId;

            await sendSportRequest(athleteId, selectedCoach, selectedSport);

            toast.success("Request sent successfully", {
                position: "top-right",
                autoClose: 3000,
                theme: "colored",
                transition: Bounce,
            });

            setShowModal(false);
            setSelectedSport('');
            setSelectedCoach('');
            fetchEnrollments();
        } catch (error) {
            console.log(error);
            toast.error("Failed to send request", {
                position: "top-right",
                autoClose: 3000,
                theme: "colored",
                transition: Bounce,
            });
        }
    };

    useEffect(() => {
        fetchEnrollments();
        fetchSports();
    }, []);

    if (loading) return <div className="text-center text-white">Loading...</div>;

    return (
        <Container className="mt-3 signupForm">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Alert variant="primary" className="mb-0">My Sports Enrollments</Alert>
                <Button variant="success" onClick={() => setShowModal(true)}>
                    Request New Sport
                </Button>
            </div>
            
            {enrollments.length === 0 ? (
                <Alert variant="warning">No enrollments found</Alert>
            ) : (
                <Table striped bordered hover variant="dark" className="mt-3">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Sport</th>
                            <th>Coach</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrollments.map((enrollment, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{enrollment.sport_name}</td>
                                <td>{enrollment.coach_name}</td>
                                <td>
                                    <span className={`badge ${
                                        enrollment.status === 'approved' ? 'bg-success' :
                                        enrollment.status === 'pending' ? 'bg-warning' : 'bg-danger'
                                    }`}>
                                        {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Request New Sport</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Select Sport</Form.Label>
                            <Form.Select value={selectedSport} onChange={handleSportChange}>
                                <option value="">Choose a sport...</option>
                                {sports.map(sport => (
                                    <option key={sport.id} value={sport.id}>{sport.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        
                        {coaches.length > 0 && (
                            <Form.Group className="mb-3">
                                <Form.Label>Select Coach</Form.Label>
                                <Form.Select value={selectedCoach} onChange={(e) => setSelectedCoach(e.target.value)}>
                                    <option value="">Choose a coach...</option>
                                    {coaches.map(coach => (
                                        <option key={coach.id} value={coach.id}>{coach.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleSendRequest}
                        disabled={!selectedSport || !selectedCoach}
                    >
                        Send Request
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
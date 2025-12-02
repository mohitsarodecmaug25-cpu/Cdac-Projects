import { useEffect, useState } from "react";
import { Alert, Button, Container, Table } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { toast, Bounce } from "react-toastify";
import { getRequestsByCoach, updateRequestStatus } from "../services/CoachService";

export function CoachRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem('token');
            const decoded = jwtDecode(token);
            const coachId = decoded.userId;
            
            const response = await getRequestsByCoach(coachId);
            setRequests(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleRequestAction = async (requestId, status) => {
        try {
            await updateRequestStatus(requestId, status);
            
            toast.success(`Request ${status} successfully`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                transition: Bounce,
            });
            
            fetchRequests();
        } catch (error) {
            console.log(error);
            toast.error("Failed to update request", {
                position: "top-right",
                autoClose: 3000,
                theme: "colored",
                transition: Bounce,
            });
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if (loading) return <div className="text-center text-white">Loading...</div>;

    return (
        <Container className="mt-3 signupForm">
            <Alert variant="primary">Pending Requests</Alert>
            {requests.length === 0 ? (
                <Alert variant="warning">No pending requests</Alert>
            ) : (
                <Table striped bordered hover variant="dark" className="mt-3">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Athlete Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Sport</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{request.athlete_name}</td>
                                <td>{request.age}</td>
                                <td>{request.gender}</td>
                                <td>{request.sport_name}</td>
                                <td>
                                    <Button 
                                        variant="success" 
                                        size="sm" 
                                        className="me-2"
                                        onClick={() => handleRequestAction(request.id, 'approved')}
                                    >
                                        Accept
                                    </Button>
                                    <Button 
                                        variant="danger" 
                                        size="sm"
                                        onClick={() => handleRequestAction(request.id, 'rejected')}
                                    >
                                        Reject
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}
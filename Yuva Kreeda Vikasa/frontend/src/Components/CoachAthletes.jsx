import { useEffect, useState } from "react";
import { Alert, Container, Table } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { getAthletesByCoach } from "../services/CoachService";

export function CoachAthletes() {
    const [athletes, setAthletes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAthletes = async () => {
        try {
            const token = localStorage.getItem('token');
            const decoded = jwtDecode(token);
            const coachId = decoded.userId;
            
            const response = await getAthletesByCoach(coachId);
            setAthletes(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAthletes();
    }, []);

    if (loading) return <div className="text-center text-white">Loading...</div>;

    return (
        <Container className="mt-3 signupForm">
            <Alert variant="primary">My Athletes</Alert>
            {athletes.length === 0 ? (
                <Alert variant="warning">No athletes found</Alert>
            ) : (
                <Table striped bordered hover variant="dark" className="mt-3">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Sport</th>
                        </tr>
                    </thead>
                    <tbody>
                        {athletes.map((athlete, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{athlete.name}</td>
                                <td>{athlete.age}</td>
                                <td>{athlete.gender}</td>
                                <td>{athlete.sport_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}
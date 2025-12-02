
import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Modal, Row, Table } from "react-bootstrap";

import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { deleteSport, getAllSports } from "../services/SportService";

export function AdminDashboard() {

    const [sports,setSports] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedSport, setSelectedSport] = useState(null);

    const navigate = useNavigate();

    const fetchSports = async () => {
        try {
            const response = await getAllSports();
            // console.log(response.data);
            setSports(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchSports();
    }, []);

    const hideConfirmation = () => {
        setShowConfirmation(false);
    }


    const showSuccessToast = () => {
        toast.success("Sport deleted", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    }

    const showErrorToast = () => {
        toast.error("Sport deletion failed", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    }

    const handleSportDelete = async () => {
        try {
            if (selectedSport) {
                const response = await deleteSport(selectedSport.id);
                if (response.status === 200) {
                    showSuccessToast();
                    const remainingSports = sports.filter((p) => {
                        return p.id !== selectedSport.id
                    });
                    setSports(remainingSports);
                }
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 500) {
                showErrorToast();
            }
        }
        finally {
            setShowConfirmation(false);
        }
    }

    return (
        <Container className="mt-3 signupForm">
            <Row>
                <Col lg={8}>
                    <Alert variant="primary">Sports List</Alert>
                </Col>
                <Col>
                
                </Col>
            </Row>
            {
                sports.length === 0 ? <Alert variant="warning">No Sports found</Alert> : <Table striped bordered hover variant="dark" className="mt-3">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Sport</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sports.map((sport, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{sport.name}</td>
                                        <td>{sport.description}</td>
                                        <td>
                                            <Button variant="danger" size="sm" className="action-button" onClick={() => {
                                                setShowConfirmation(true);
                                                setSelectedSport(sport);
                                            }}>Delete</Button>
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                className="action-button ms-1"
                                                onClick={() => {
                                                    navigate(`/AdminDashboard/${sport.id}`);
                                                }}>Edit</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>

            }
            <div className="text-center">
            <Button variant="success" size="lg" className="action-button " onClick={() => {
                                                navigate("/AddSport");
                                            }}>Add Sport</Button>
            </div>
            <Modal show={showConfirmation} onHide={hideConfirmation}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure, you want to delete {selectedSport ? selectedSport.name : 'sport'} ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={hideConfirmation}>
                        No
                    </Button>
                    <Button variant="success" onClick={handleSportDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
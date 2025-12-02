import { useEffect, useState } from "react";
import { Table, Container, Alert, Spinner, Button } from "react-bootstrap";
import axios from "axios";
import { CONTACT_API_URL } from "../constants/APIConstants";
import { toast, Bounce } from "react-toastify";

export function ContactRequest() {
    const [messages, setMessages] = useState([]);
    const [bulkOrders, setBulkOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('messages');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            console.log('Fetching from:', `${CONTACT_API_URL}/send-message`, `${CONTACT_API_URL}/bulk-order`);
            const [messagesResponse, bulkOrdersResponse] = await Promise.all([
                axios.get(`${CONTACT_API_URL}/send-message`),
                axios.get(`${CONTACT_API_URL}/bulk-order`)
            ]);
            console.log('Messages:', messagesResponse.data);
            console.log('Bulk Orders:', bulkOrdersResponse.data);
            
            // Sort by date (newest first)
            const sortedMessages = messagesResponse.data.sort((a, b) => 
                new Date(b.createdAt || b.id) - new Date(a.createdAt || a.id)
            );
            const sortedBulkOrders = bulkOrdersResponse.data.sort((a, b) => 
                new Date(b.createdAt || b.id) - new Date(a.createdAt || a.id)
            );
            
            setMessages(sortedMessages);
            setBulkOrders(sortedBulkOrders);
        } catch (error) {
            console.error("Error fetching data:", error);
            console.error("Error details:", error.response?.data);
            toast.error(`Failed to load data: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };



    return (
        <Container className="mt-4">
            <Alert variant="primary" className="fw-bold text-center">
                Admin Messages - Contact Requests: {messages.length} Total | Bulk Purchase Requests: {bulkOrders.length} Total
            </Alert>

            {/* Tab Navigation */}
            <div className="d-flex mb-4">
                <Button 
                    variant={activeTab === 'messages' ? 'primary' : 'outline-primary'}
                    className="me-2"
                    onClick={() => setActiveTab('messages')}
                >
                    Messages ({messages.length})
                </Button>
                <Button 
                    variant={activeTab === 'bulk' ? 'success' : 'outline-success'}
                    onClick={() => setActiveTab('bulk')}
                >
                    Bulk Orders ({bulkOrders.length})
                </Button>
            </div>

            {loading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" />
                    <p>Loading...</p>
                </div>
            ) : (
                <>
                    {/* Messages Tab */}
                    {activeTab === 'messages' && (
                        messages.length === 0 ? (
                            <Alert variant="warning" className="text-center">
                                No messages found.
                            </Alert>
                        ) : (
                            <Table striped bordered hover responsive className="shadow-sm">
                                <thead className="table-light">
                                    <tr>
                                        <th>Sr No</th>
                                        <th>Date</th>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {messages.map((message, index) => (
                                        <tr key={message.id}>
                                            <td>{index + 1}</td>
                                            <td>{message.createdAt ? new Date(message.createdAt).toLocaleDateString('en-IN') : 'N/A'}</td>
                                            <td>{message.fullName}</td>
                                            <td>{message.email}</td>
                                            <td>{message.phoneNumber}</td>
                                            <td style={{maxWidth: '200px', wordWrap: 'break-word'}}>{message.message}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )
                    )}

                    {/* Bulk Orders Tab */}
                    {activeTab === 'bulk' && (
                        bulkOrders.length === 0 ? (
                            <Alert variant="warning" className="text-center">
                                No bulk orders found.
                            </Alert>
                        ) : (
                            <Table striped bordered hover responsive className="shadow-sm">
                                <thead className="table-light">
                                    <tr>
                                        <th>Sr No</th>
                                        <th>Date</th>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Quantity</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bulkOrders.map((order, index) => (
                                        <tr key={order.id}>
                                            <td>{index + 1}</td>
                                            <td>{order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN') : 'N/A'}</td>
                                            <td>{order.fullName}</td>
                                            <td>{order.email}</td>
                                            <td>{order.phoneNumber}</td>
                                            <td><span className="badge bg-primary">{order.quantity}</span></td>
                                            <td style={{maxWidth: '200px', wordWrap: 'break-word'}}>{order.details}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )
                    )}
                </>
            )}
        </Container>
    );
}

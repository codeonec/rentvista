import React, { useState, useEffect } from "react";
import {
    Button,
    ButtonGroup,
    Col,
    Container,
    Modal,
    Row,
    Table,
} from "react-bootstrap";

const AdminUserTab = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEditUser = (user) => {
        // Implement logic to open modal for editing user details
        setShowModal(true);
        setSelectedUser(user);
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/admin/users", {
                headers: {
                    Authorization: JSON.parse(
                        localStorage.getItem("adminToken")
                    ),
                },
            });
            const data = await response.json();

            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h2 className="mb-3">User List</h2>
                    <div className="overflow-hidden rounded-3 border">
                        <Table className="rounded-4 mb-0" striped hover>
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{`${user.firstname} ${user.lastname}`}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.accountType}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    className="px-3"
                                                    onClick={() =>
                                                        handleEditUser(user)
                                                    }
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                >
                                                    Delete
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedUser && <>
                            <p>{selectedUser.email}</p>
                            </>}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </Button>
                            <Button variant="primary">Save Changes</Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminUserTab;

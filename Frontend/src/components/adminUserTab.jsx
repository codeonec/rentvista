import { useState, useEffect } from "react";
import {
    Alert,
    Button,
    ButtonGroup,
    Col,
    Container,
    Form,
    Modal,
    Row,
    Spinner,
    Table,
} from "react-bootstrap";

const AdminUserTab = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const adminToken = JSON.parse(localStorage.getItem("adminToken"));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser({ ...selectedUser, [name]: value });
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/admin/users", {
                headers: {
                    Authorization: adminToken,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();

            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleModalClose = () => {
        setError("");
        setSelectedUser({});
        setSuccess(false);
        setShowModal(false);
    };

    const handleUpdateUser = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `http://localhost:5000/admin/users/${selectedUser._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: adminToken,
                    },
                    body: JSON.stringify(selectedUser),
                }
            );
            const data = await response.json();
            if (response.ok) {
                setLoading(false);
                setSuccess(true);
                setUsers(
                    users.map((u) => (u._id === data.user._id ? data.user : u))
                );
            } else {
                setError("Error updating user");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            setError(error);
        }
    };

    const handleDeleteUser = async (user) => {
        try {
            const response = await fetch(`http://localhost:5000/admin/users/${user._id}`, {
                method: "DELETE",
                headers: {
                    Authorization: adminToken,
                },
            });

            if (response.ok) {
                // Remove the deleted user from the local state
                setUsers(users.filter((u) => u._id !== user._id));
                // Close the modal
                setDeleteModal(false);
                setSelectedUser({});
            } else {
                // Handle error response
                // Show error message
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            // Show error message
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
                                                    onClick={() => {
                                                        setShowModal(true);
                                                        setSelectedUser(user);
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => {
                                                        setDeleteModal(true);
                                                        setSelectedUser(user);
                                                    }}
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
                    {/* Edit user Modal */}
                    <Modal show={showModal} onHide={() => handleModalClose()}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {success && (
                                <Alert variant="success">
                                    User updated successfully.
                                </Alert>
                            )}
                            {error && <Alert variant="danger">{error}.</Alert>}
                            {selectedUser && (
                                <>
                                    <Form>
                                        <Form.Group
                                            controlId="formFirstname"
                                            className="mb-3"
                                        >
                                            <Form.Label>Firstname</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="firstname"
                                                value={selectedUser.firstname}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            controlId="formLastname"
                                            className="mb-3"
                                        >
                                            <Form.Label>Lastname</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="lastname"
                                                value={selectedUser.lastname}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            controlId="formUsername"
                                            className="mb-3"
                                        >
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="username"
                                                value={selectedUser.username}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            controlId="formEmail"
                                            className="mb-3"
                                        >
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={selectedUser.email}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            controlId="formAccountType"
                                            className="mb-3"
                                        >
                                            <Form.Label>
                                                Account Type
                                            </Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="accountType"
                                                value={selectedUser.accountType}
                                                onChange={handleChange}
                                            >
                                                <option value="Traveler">
                                                    Traveler
                                                </option>
                                                <option value="Property Owner">
                                                    Property Owner
                                                </option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={() => handleModalClose()}
                            >
                                Close
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => handleUpdateUser()}
                            >
                                {loading ? (
                                    <Spinner
                                        animation="border"
                                        variant="light"
                                        size="sm"
                                    />
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    {/* Delete user modal */}
                    <Modal
                        show={deleteModal}
                        onHide={() => {
                            setDeleteModal(false);
                            setSelectedUser({});
                        }}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Delete User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete{" "}
                            {selectedUser && selectedUser.username}?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setDeleteModal(false);
                                    setSelectedUser({});
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => handleDeleteUser(selectedUser)}
                            >
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminUserTab;

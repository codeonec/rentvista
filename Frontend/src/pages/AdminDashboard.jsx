import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import AdminUserTab from "../components/adminUserTab";
import AdminListingTab from "../components/adminListingTab";

const AdminDashboard = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1 className="py-5">Admin Dashboard</h1>
                        <Tabs
                            defaultActiveKey="user"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="user" title="Users">
                                <AdminUserTab />
                            </Tab>
                            <Tab eventKey="listing" title="Listings">
                                <AdminListingTab />
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AdminDashboard;

import { Container, Row, Col, Card, Button } from "react-bootstrap";
import backgroundImage from "../assets/images/dtk.jpg";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <Container>
                <Row className="mt-2">
                    <Col md={6} className="my-4">
                        <img src={backgroundImage} className="shadow border border-dark-subtle" alt="Background" style={{ width: '100%', height: 'auto', borderRadius: "10px" }} />
                    </Col>
                    <Col md={6} className="d-flex align-items-center">
                        <div style={{ textAlign: 'center' }}>
                            <h1>Welcome to UrbanNest</h1>
                            <p className="fs-5">
                                Your trusted partner in finding your dream home. Whether you are looking for a cozy apartment, a spacious house, or a luxury villa, we have something for everyone. Let us help you make your dream a reality.
                            </p>
                            <Link to="/listings">
                                <Button variant="primary" size="lg">View Listings</Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
                <Row className="my-5">
                    <Col md={4} className="text-center">
                        <h2>Featured Properties</h2>
                        <p>Explore our handpicked selection of featured properties</p>
                        <Link to="/featured">
                            <Button variant="primary">View Featured Properties</Button>
                        </Link>
                    </Col>
                    <Col md={4} className="text-center">
                        <h2>Find an Agent</h2>
                        <p>Connect with one of our experienced agents</p>
                        <Link to="/agents">
                            <Button variant="primary">Find an Agent</Button>
                        </Link>
                    </Col>
                    <Col md={4} className="text-center">
                        <h2>Resources</h2>
                        <p>Explore our resources for buyers and sellers</p>
                        <Link to="/resources">
                            <Button variant="primary">Explore Resources</Button>
                        </Link>
                    </Col>
                </Row>
                <Row className="my-5">
                    <Col md={12} className="text-center">
                        <h2 className="my-5">Why Choose Us?</h2>
                        <Row xs={1} md={2} className="g-4 justify-content-center">
                            <Col>
                                <Card className="h-100">
                                    <Card.Body>
                                        <Card.Title>Extensive Property Listings</Card.Title>
                                        <Card.Text>
                                            Discover a wide range of properties tailored to your preferences.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="h-100">
                                    <Card.Body>
                                        <Card.Title>Experienced Agents</Card.Title>
                                        <Card.Text>
                                            Our agents have years of experience and local expertise to guide you through the process.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="h-100">
                                    <Card.Body>
                                        <Card.Title>Personalized Service</Card.Title>
                                        <Card.Text>
                                            We provide personalized service to meet your specific needs and preferences.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="h-100">
                                    <Card.Body>
                                        <Card.Title>Transparent Communication</Card.Title>
                                        <Card.Text>
                                            We believe in transparent and honest communication to build trust with our clients.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="h-100">
                                    <Card.Body>
                                        <Card.Title>Access to Resources</Card.Title>
                                        <Card.Text>
                                            Access our resources and tools to make informed decisions throughout your real estate journey.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="h-100">
                                    <Card.Body>
                                        <Card.Title>Exceptional Support</Card.Title>
                                        <Card.Text>
                                            Our dedicated support team is available to assist you at every step of the process.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home;

import { Container, Row, Col } from "react-bootstrap";
import backgroundImage from "../assets/images/dtk.jpg";

const Home = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col md={6} className="my-4">
                        <img src={backgroundImage} className="shadow border border-dark-subtle" alt="Background" style={{ width: '100%', height: 'auto', borderRadius: "10px" }} />
                    </Col>
                    <Col md={6} className="d-flex align-items-center">
                        <div style={{ textAlign: 'center' }}>
                            <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Welcome to UrbanNest</h1>
                            <p style={{ fontSize: '1.5rem' }}>
                                Your trusted partner in finding your dream home. Whether you are looking for a cozy apartment, a spacious house, or a luxury villa, we have something for everyone. Let us help you make your dream a reality.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home

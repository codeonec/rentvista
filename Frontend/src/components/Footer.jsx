import { Col, Row, Container } from 'react-bootstrap';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import { AiFillFacebook, AiFillTwitterSquare, AiFillInstagram } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-primary text-light py-4" style={{ marginTop: "15rem", width: "100%", zIndex: 1000 }}>
            <Container>
                <Row className="mb-4">
                    <Col md={4}>
                        <h5>Contact Us</h5>
                        <div>509 King Street North</div>
                        <div>Waterloo, ON</div>
                        <br />
                        <div>
                            <FaEnvelope style={{ color: 'white', fontSize: '1.5rem' }} /> <a href="mailto:info@urbannest.com" className="text-white">info@urbannest.com</a>
                        </div>
                        <div>
                            <FaPhone style={{ color: 'white', fontSize: '1.5rem' }} /> <a href="tel:+1234567890" className="text-white">+123-456-7890</a>
                        </div>
                    </Col>

                    <Col md={4}>
                        <h5>Useful Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/about" className="text-white">About Us</Link></li>
                            <li><Link to="/services" className="text-white">Services</Link></li>
                            <li><Link to="/blog" className="text-white">Blog</Link></li>
                            <li><Link to="/faq" className="text-white">FAQ</Link></li>
                        </ul>
                    </Col>
                    <Col md={4} className="text-center text-md-end">
                        <h5>Follow Us</h5>
                        <div className="social-links">
                            <a href="https://www.facebook.com/UrbanNest" target="_blank" rel="noopener noreferrer"><AiFillFacebook style={{ color: 'white', fontSize: '2rem' }} /></a>
                            <a href="https://twitter.com/UrbanNest" target="_blank" rel="noopener noreferrer"><AiFillTwitterSquare style={{ color: 'white', fontSize: '2rem' }} /></a>
                            <a href="https://www.instagram.com/UrbanNest" target="_blank" rel="noopener noreferrer"><AiFillInstagram style={{ color: 'white', fontSize: '2rem' }} /></a>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <p>&copy; 2024 UrbanNest. All rights reserved.</p>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;

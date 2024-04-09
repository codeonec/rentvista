import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Success = () => {
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <div className="text-center">
                        <h2>Payment Successful!</h2>
                        <p>Thank you for your booking. Your payment has been successfully processed.</p>
                        <p>You will receive a confirmation email shortly.</p>
                        {/* Add any additional information or action buttons here */}
                        <Button variant="primary" href="/">Back to Home</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Success;

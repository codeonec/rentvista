import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Cancel = () => {
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <div className="text-center">
                        <h2>Payment Canceled</h2>
                        <p>Your booking payment has been canceled.</p>
                        <p>If you have any questions or concerns, please feel free to contact us.</p>
                        {/* Add any additional information or action buttons here */}
                        <Button variant="primary" href="/">Back to Home</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Cancel;

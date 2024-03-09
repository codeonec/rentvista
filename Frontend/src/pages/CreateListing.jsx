import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const CreateListing = () => {

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    return (
        <Container className='my-4'>
            <h2>Create a Listing</h2>
            <Form onSubmit={handleSubmit} className='my-4'>
                <Row>
                    <Col md={6} className="mb-3">
                        <Form.Group controlId="validationCustom01" className='my-2'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                required
                                type="text"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1" className="my-2">
                            <Form.Label>description</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid description.
                            </Form.Control.Feedback>
                        </Form.Group><Form.Group controlId="exampleForm.ControlTextarea1" className="my-2">
                            <Form.Label>Address</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid address.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="my-4 d-flex flex-wrap gap-3">
                            <Form.Check
                                type="checkbox"
                                id="for-sale"
                                label="For Sale"
                            />
                            <Form.Check
                                type="checkbox"
                                id="for-rent"
                                label="For Rent"
                            />
                            <Form.Check
                                type="checkbox"
                                id="parking"
                                label="Parking"
                            />
                            <Form.Check
                                type="checkbox"
                                id="furnished"
                                label="Furnished"
                            />
                            <Form.Check
                                type="checkbox"
                                id="gym"
                                label="Gym"
                            />
                        </Form.Group>
                        <Row md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Bedrooms</Form.Label>
                                <Form.Control
                                    type="number"
                                    id="bedrooms"
                                    min="1"
                                    max="10"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Bathrooms</Form.Label>
                                <Form.Control
                                    type="number"
                                    id="bathrooms"
                                    min="1"
                                    max="10"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Regular Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    id="regualPrice"
                                    min="1"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Discount Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    id="discountPrice"
                                />
                            </Form.Group>
                        </Row>
                    </Col>
                    <Col md={6} className="mb-3">
                        <p>Images</p>
                        <span>The first image will be the cover</span>
                        <div className='d-flex gap-2'>
                            <input className='border border-dark-subtle p-2' type="file" id='images' accept='images/*' multiple />
                            <Button>Upload</Button>
                        </div>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                    />
                </Form.Group>
                <Button type="submit" className='w-50 my-2'>Submit Listing</Button>
            </Form>
        </Container>
    );
}

export default CreateListing;

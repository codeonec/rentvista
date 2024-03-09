import { useRef } from 'react';
import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const CreateListing = () => {
    const initialFormData = {
        title: '',
        description: '',
        address: '',
        regularPrice: '',
        discountPrice: '',
        sale: false,
        rent: false,
        furnished: false,
        parking: false,
        gym: false,
        bedrooms: '',
        bathrooms: '',
        images: [],
    };

    const [formData, setFormData] = useState(initialFormData);
    const imageRef = useRef(null);

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleImages = (e) => {
        const selectedFiles = e.target.files;

        if (selectedFiles.length > 5) {
            console.log("Exceeded the maximum limit of 5 images");
            setFormData((prevFormData) => ({
                ...prevFormData,
                images: [],
            }));
            imageRef.current.value = null;
        } else (
            setFormData((prevFormData) => ({
                ...prevFormData,
                images: selectedFiles,
            }))
        )
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData.images);

        const formDataObject = new FormData();

        formDataObject.append('title', formData.title);
        formDataObject.append('description', formData.description);
        formDataObject.append('address', formData.address);
        formDataObject.append('regularPrice', formData.regularPrice);
        formDataObject.append('discountPrice', formData.discountPrice);
        formDataObject.append('sale', formData.sale);
        formDataObject.append('rent', formData.rent);
        formDataObject.append('furnished', formData.furnished);
        formDataObject.append('parking', formData.parking);
        formDataObject.append('gym', formData.gym);
        formDataObject.append('bedrooms', formData.bedrooms);
        formDataObject.append('bathrooms', formData.bathrooms);

        Array.from(formData.images).forEach(item => {
            formDataObject.append('images', item)
        })

        const token = JSON.parse(localStorage.getItem("token"));

        const createListing = () => {
            try {
                setLoading(true);
                fetch('http://localhost:5000/listing/auth/create', {
                    method: 'POST',
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    body: formDataObject,
                }).then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        setLoading(false);
                        throw new Error("Failed to create listing");
                    }
                }).then((data) => {
                    setLoading(false);
                    console.log(data);
                    setFormData(initialFormData);
                    imageRef.current.value = null;
                });
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }

        createListing();
    };

    return (
        <Container className='my-4'>
            <h3>Create a Listing</h3>
            <Form onSubmit={handleSubmit} className='my-4'>
                <Row>
                    <Col md={6} className="mb-3">
                        <Form.Group controlId="title" className='my-2'>
                            <Form.Label className='fw-semibold'>Title</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={formData.title}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="description" className="my-2">
                            <Form.Label className='fw-semibold'>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="address" className="my-2">
                            <Form.Label className='fw-semibold'>Address</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="my-4 d-flex flex-wrap gap-3">
                            <Form.Check
                                type="checkbox"
                                label="For Sale"
                                className='fw-semibold'
                                id="sale"
                                checked={formData.sale}
                                onChange={handleChange}
                            />
                            <Form.Check
                                type="checkbox"
                                label="For Rent"
                                className='fw-semibold'
                                id="rent"
                                checked={formData.rent}
                                onChange={handleChange}
                            />
                            <Form.Check
                                type="checkbox"
                                label="Parking"
                                className='fw-semibold'
                                id="parking"
                                checked={formData.parking}
                                onChange={handleChange}
                            />
                            <Form.Check
                                type="checkbox"
                                label="Furnished"
                                className='fw-semibold'
                                id="furnished"
                                checked={formData.furnished}
                                onChange={handleChange}
                            />
                            <Form.Check
                                type="checkbox"
                                label="Gym"
                                className='fw-semibold'
                                id="gym"
                                checked={formData.gym}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6} className="my-2">
                        <Row md={4}>
                            <Form.Group className="mb-3" controlId="bedrooms">
                                <Form.Label className='fw-semibold'>Bedrooms</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={formData.bedrooms}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="bathrooms">
                                <Form.Label className='fw-semibold'>Bathrooms</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={formData.bathrooms}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Row>
                        <Row md={4}>
                            <Form.Group className="mb-3" controlId="regularPrice">
                                <Form.Label className='fw-semibold'>Regular Price($)</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    value={formData.regularPrice}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="discountPrice">
                                <Form.Label className='fw-semibold'>Discount Price($)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={formData.discountPrice}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Row>
                        <div className='my-2'>
                            <p className='fw-semibold'>Add Images to listing (max 5)</p>
                        </div>
                        <Row md={2}>
                            <div className='d-flex flex-column gap-2'>
                                <input
                                    className='border border-dark-subtle p-1 rounded'
                                    type="file"
                                    ref={imageRef}
                                    accept='image/*'
                                    multiple
                                    onChange={handleImages}

                                />

                                <div className="d-flex flex-wrap">
                                    {Array.from(formData.images).map((item, i) => (
                                        <span key={i} className="p-2">
                                            <img
                                                className="rounded"
                                                style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                                                src={item ? URL.createObjectURL(item) : null}
                                                alt={`Image ${i + 1}`}
                                            />
                                        </span>
                                    ))}
                                </div>

                            </div>
                        </Row>
                    </Col>
                </Row>

                <Row md={2} className="p-2">
                    <Button
                        type="submit"
                        onSubmit={handleSubmit}
                        variant='success'
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Listing"}
                    </Button>
                </Row>
            </Form>
        </Container >
    );
}

export default CreateListing;

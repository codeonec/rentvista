import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom'

const UpdateListing = () => {
    const initialFormData = {
        title: '',
        description: '',
        address: '',
        regularPrice: 0,
        discountPrice: 0,
        type: 'rent',
        furnished: false,
        parking: false,
        gym: false,
        bedrooms: 1,
        bathrooms: 1,
        imageUrls: [],
    };

    const [formData, setFormData] = useState(initialFormData);
    const imageRef = useRef(null);
    const navigate = useNavigate();
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const listingImageUrl = `${import.meta.env.VITE_URBANNEST_API}/assets/listings/`;

    useEffect(() => {
        const fetchListing = async () => {
            const listingId = params.id;
            const res = await fetch(`${import.meta.env.VITE_URBANNEST_API}/listing/get/${listingId}`);
            const data = await res.json();

            setFormData(data);
            setLoading(false);
        }

        fetchListing();
    }, [params.id]);

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;

        if (type === 'checkbox') {
            if (id === 'sale') {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    type: checked ? 'sale' : 'rent',
                }));
            } else if (id === 'rent') {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    type: checked ? 'rent' : 'sale',
                }));
            } else {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [id]: checked,
                }));
            }
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [id]: value,
            }));
        }
    };

    const handleImages = (e) => {
        const selectedFiles = e.target.files;

        if (selectedFiles.length > 5) {
            setError("Exceeded the maximum limit of 5 image");
            setFormData((prevFormData) => ({
                ...prevFormData,
                imageUrls: [],
            }));
            imageRef.current.value = null;
        } else {
            setError("");
            if (selectedFiles.length > 0) {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    imageUrls: selectedFiles,
                }))
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formDataObject = new FormData();

        formDataObject.append('title', formData.title);
        formDataObject.append('description', formData.description);
        formDataObject.append('address', formData.address);
        formDataObject.append('regularPrice', formData.regularPrice);
        formDataObject.append('discountPrice', formData.discountPrice);
        formDataObject.append('type', formData.type);
        formDataObject.append('furnished', formData.furnished);
        formDataObject.append('parking', formData.parking);
        formDataObject.append('gym', formData.gym);
        formDataObject.append('bedrooms', formData.bedrooms);
        formDataObject.append('bathrooms', formData.bathrooms);

        // Convert FileList to an array and iterate over it
        if (formData.imageUrls.length > 0) {
            Array.from(formData.imageUrls).forEach((file) => {
                formDataObject.append('imageUrls', file);
            });
        }

        const authToken = JSON.parse(localStorage.getItem('token'));

        const updateListing = async () => {
            try {
                if (formData.imageUrls.length < 1) {
                    return setError('You must upload at least one image');
                }
                if (+formData.regularPrice < +formData.discountPrice) {
                    return setError('Discount price must be lower than regular price');
                }

                setError('');
                setLoading(true);

                const response = await fetch(`${import.meta.env.VITE_URBANNEST_API}/listing/auth/update-listing/${params.id}`, {
                    method: 'PUT',
                    headers: {
                        authorization: `Bearer ${authToken}`,
                    },
                    body: formDataObject,
                });

                if (!response.ok) {
                    throw new Error('Failed to update listing');
                }

                const data = await response.json();
                setLoading(false);
                console.log(data);

                setFormData(initialFormData);
                // Assuming imageRef is a ref to the input element for file upload
                imageRef.current.value = null;

                navigate(`/listing/${params.id}`);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        updateListing();
    };

    return (
        <Container className='my-4'>
            <h4>Update Listing</h4>
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
                                required
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="address" className="my-2">
                            <Form.Label className='fw-semibold'>Address</Form.Label>
                            <Form.Control
                                as="textarea"
                                required
                                rows={2}
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="my-4 d-flex flex-wrap gap-3">
                            <Form.Check
                                type="checkbox"
                                label="Sale"
                                className='fw-semibold'
                                id="sale"
                                checked={formData.type === 'sale'}
                                onChange={handleChange}
                            />
                            <Form.Check
                                type="checkbox"
                                label="Rent"
                                className='fw-semibold'
                                id="rent"
                                checked={formData.type === 'rent'}
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
                                    required
                                    max="10"
                                    value={formData.bedrooms}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="bathrooms">
                                <Form.Label className='fw-semibold'>Bathrooms</Form.Label>
                                <Form.Control
                                    type="number"
                                    required
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
                                    {Array.from(formData.imageUrls).map((item, i) => (
                                        <span key={i} className="p-2">
                                            <img
                                                className="rounded"
                                                style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                                                src={typeof item === 'string' ? listingImageUrl + item : URL.createObjectURL(item)}
                                                alt={`Image ${i + 1}`}
                                            />

                                        </span>
                                    ))}
                                </div>

                            </div>
                        </Row>
                    </Col>
                </Row>
                {error &&
                    <p className='text-danger'>{error} </p>
                }
                <Row md={2} className="p-2">

                    <Button
                        type="submit"
                        onSubmit={handleSubmit}
                        variant='success'
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Listing"}
                    </Button>
                </Row>
            </Form>
        </Container >
    );
}

export default UpdateListing;

import { useEffect, useState } from "react";
import { Container, Carousel, Row, Col, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { FaChair, FaLocationDot, FaDumbbell } from "react-icons/fa6";
import { FaBed, FaBath, FaParking } from "react-icons/fa";
import { useLogin } from "../contexts/login-context";
import BookingModal from "../components/bookingModal";

const IndividualListing = () => {
    const [listing, setListing] = useState([]);
    const [listedBy, setListedBy] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [showBookingModal, setShowBookingModal] = useState(false);
    const params = useParams();
    const { currentUser } = useLogin();

    useEffect(() => {
        const fetchIndividualListing = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `${import.meta.env.VITE_URBANNEST_API}/listing/get/${params.id}`
                );

                if (!response.ok) {
                    throw new Error("Something went wrong");
                }

                const data = await response.json();

                setListing(data);
                setIsLoading(false);
                setError("");
            } catch (error) {
                console.log(error.message);
                setIsLoading(false);
                setError("Please try again! Something went wrong");
            }
        };

        const fetchUser = async () => {
            try {
                if (listing?.userRef) {
                    const response = await fetch(`${import.meta.env.VITE_URBANNEST_API}/user/${listing?.userRef}`);

                    if (!response.ok) {
                        throw new Error("Something went wrong");
                    }

                    const data = await response.json();
                    console.log({ data })
                    setListedBy(data.user);
                }
            } catch (error) {
                console.log(error.message);
            }
        }

        fetchIndividualListing();
        fetchUser();
    }, [params.id, listing?.userRef]);

    if (isLoading) {
        return <Loading />;
    }
    const handleOpenModal = () => setShowBookingModal(true);
    const handleCloseModal = () => setShowBookingModal(false);

    return (
        <Container className="my-3">
            {error && <div className="fw-semibold fs-3">{error}</div>}
            <Carousel fade data-bs-theme="dark" className="my-3">
                {listing?.imageUrls?.map((image, i) => (
                    <Carousel.Item key={i}>
                        <img
                            className="d-block w-100"
                            style={{
                                height: "400px",
                                borderRadius: "10px",
                                objectFit: "cover",
                            }}
                            src={`${import.meta.env.VITE_URBANNEST_API}/assets/listings/${image}`}
                            alt={image}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>

            <Row className="justify-content-center">
                <Col md={8}>
                    <div>
                        <div className="fw-bold fs-3 mb-4">{listing.title}</div>
                        <div>
                            <span className="fw-semibold fs-3">
                                ${listing.discountPrice}{" "}
                            </span>
                            <span className="text-decoration-line-through fs-6 fw-semibold">${listing.regularPrice}</span>
                            <span>{listing.type === "rent" && "/ Month"}</span>
                        </div>
                        <span>
                            (You're getting $
                            {listing.regularPrice - listing.discountPrice}{" "}
                            discount on this listing)
                        </span>
                        <div className="d-flex justify-content-start align-items-center gap-2 my-3">
                            <FaLocationDot />
                            <div>{listing.address}</div>
                        </div>

                        <div className="d-flex justify-content-start align-items-center gap-2 my-3">
                            {listing.userRef === currentUser?._id
                                ? null
                                : <span className="text">
                                    {listing.type === "sell" ? (
                                        <Button>
                                            <span>Buy Now</span>
                                        </Button>
                                    ) : (
                                        <Button onClick={handleOpenModal}>
                                            <span>Rent Now</span>
                                        </Button>
                                    )}
                                </span>
                            }

                            <BookingModal
                                showModal={showBookingModal}
                                onCloseModal={handleCloseModal}
                                listingId={params.id}
                            />
                        </div>

                        <div className="d-flex flex-column gap-2">
                            <div className="fw-bold">Description</div>
                            <p>{listing.description}</p>
                        </div>

                        <div className="d-flex justify-content-start align-items-center gap-3 my-2">
                            <div className="d-flex justify-content-start align-items-center my-2">
                                <FaBed
                                    style={{
                                        width: "30px",
                                    }}
                                />
                                <div>
                                    {listing.bedrooms}{" "}
                                    {listing.bedrooms > 1 ? "Beds" : "Bed"}
                                </div>
                            </div>

                            <div className="d-flex justify-content-start align-items-center my-2">
                                <FaBath
                                    style={{
                                        width: "30px",
                                    }}
                                />
                                <div>
                                    {listing.bathrooms}{" "}
                                    {listing.bathrooms > 1 ? "Baths" : "Bath"}
                                </div>
                            </div>

                            <div className="d-flex justify-content-start align-items-center my-2">
                                <FaParking
                                    style={{
                                        width: "30px",
                                    }}
                                />
                                <div>
                                    {" "}
                                    {listing.parking ? "Parking" : "No Parking"}
                                </div>
                            </div>

                            <div className="d-flex justify-content-start align-items-center my-2">
                                <FaChair
                                    style={{
                                        width: "30px",
                                    }}
                                />
                                <div>
                                    {" "}
                                    {listing.furnished
                                        ? "Furnished"
                                        : "No Furnished"}
                                </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-center my-2">
                                <FaDumbbell
                                    style={{
                                        width: "30px",
                                    }}
                                />
                                <div> {listing.gym ? "Gym" : "No Gym"}</div>
                            </div>
                        </div>

                        <hr />

                        <span className="fw-bold">Listed By</span>
                        <div className="mx-2 my-3">
                            <div className="d-flex gap-3 align-items-center">
                                <img
                                    src={`${import.meta.env.VITE_URBANNEST_API}/assets/uploads/` + listedBy?.profilePicture}
                                    alt="profile photo"
                                    className="shadow-sm"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        objectFit: "cover",
                                        borderRadius: "100px"
                                    }}
                                />
                                <div className="fw-semibold">
                                    {listedBy?.firstname} {listedBy?.lastname}
                                </div>
                            </div>
                        </div>

                        {listing.userRef === currentUser?._id && (
                            <Button
                                as={Link}
                                to={`/update-listing/${listing._id}`}
                            >
                                Update Listing
                            </Button>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default IndividualListing;

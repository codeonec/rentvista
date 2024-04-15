/* eslint-disable react/prop-types */
import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const ListingComponent = ({ listing }) => {
    return (
        <Col className="my-3">
            <Link to={`/listing/${listing._id}`} className="text-decoration-none text-dark">
                <Card className="h-100 cursor-pointer">
                    <Card.Img
                        variant="top"
                        src={`${import.meta.env.VITE_URBANNEST_API}/assets/listings/` + (listing.imageUrls[0])}
                        alt={listing.title}
                        style={{
                            objectFit: "cover",
                            height: "200px",
                            borderTopLeftRadius: "5px",
                            borderTopRightRadius: "5px"
                        }}
                    />
                    <Card.Body className="d-flex justify-content-between flex-column">
                        <Card.Text>{listing.title}</Card.Text>
                        <Card.Text>
                            <span className="fw-semibold">${listing.discountPrice}{" "}</span>
                            <span className="text-decoration-line-through">${listing.regularPrice}</span>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    )
}

export default ListingComponent
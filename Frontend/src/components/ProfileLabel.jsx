import PropTypes from "prop-types";
import { Form, InputGroup } from "react-bootstrap";

const ProfileLabel = ({ label, name, value, isDisabled, onHandleChange }) => {
    const handleInputChange = (event) => onHandleChange(event);

    return (
        <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
                {label}
            </InputGroup.Text>
            <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                name={name}
                value={value}
                disabled={isDisabled}
                onChange={handleInputChange}
            />
        </InputGroup>
    );
}

ProfileLabel.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onHandleChange: PropTypes.func.isRequired
};

export default ProfileLabel;

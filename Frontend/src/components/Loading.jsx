import { Spinner } from 'react-bootstrap';

const Loading = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ marginBlock: "15rem" }}>
            <Spinner animation="border" role="status" size='lg' className='my-3'>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default Loading;

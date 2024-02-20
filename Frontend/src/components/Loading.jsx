import { Spinner } from 'react-bootstrap'

const Loading = () => {
    return (
        <Spinner animation="border" role="status" className='my-3'>
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
}

export default Loading
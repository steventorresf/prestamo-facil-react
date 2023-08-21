import { Spinner } from 'react-bootstrap';
import '../../../assets/sass/spinner.css';

const SpinnerCustom = () => {
    return (
        <div id='spinnerCustom' className="spinnerCustom d-flex justify-content-center visually-hidden">
            <div className='text-center'>
                <Spinner animation="border" variant="primary" />
                <p className='spinner-text mt-1'>Por favor espere...</p>
            </div>
        </div>
    )
}
export default SpinnerCustom;
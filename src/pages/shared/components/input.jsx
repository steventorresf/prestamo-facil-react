import { ErrorMessage, Field } from "formik";
import { FormGroup, FormLabel } from "react-bootstrap";

function FormikText({ className = '', label, type = 'text', name, required = false, error }) {
    return (
        <FormGroup className={'col-12 ' + className}>
            <FormLabel className={(error ? ' text-danger' : '')}>{label}{required ? <span className="text-danger">*</span> : null}</FormLabel>
            <Field type={type} name={name} className={'form-control' + (error ? ' invalid' : '')} required={required} />
            <ErrorMessage className="text-danger" component='div' name={name} />
        </FormGroup>
    )
}
export default FormikText;
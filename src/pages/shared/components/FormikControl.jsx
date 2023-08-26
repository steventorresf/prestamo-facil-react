import { ErrorMessage, Field } from "formik";
import { FormGroup, FormLabel } from "react-bootstrap";
import Select from "react-select";

export const FormikText = ({ className = '', label, type = 'text', name, required = false, error }) => {
    return (
        <FormGroup className={'col-12 ' + className}>
            <FormLabel className={(error ? ' text-danger' : '')}>{label}{required ? <span className="text-danger">*</span> : null}</FormLabel>
            <Field type={type} name={name} className={'form-control' + (error ? ' invalid' : '')} required={required} />
            <ErrorMessage className="text-danger" component='div' name={name} />
        </FormGroup>
    )
}

export const FormikSelect = ({ className = '', label, options, name, value, onChange, onBlur, required = false, error }) => {
    const defaultValue = options?.find(x => x.value === value) || null;
    return (
        <FormGroup className={"col-12 " + className}>
            <FormLabel className={(error ? ' text-danger' : '')}>{label}{required ? <span className="text-danger">*</span> : null}</FormLabel>
            <Select
                className={error ? ' invalid' : null}
                options={options}
                required={required}
                placeholder={'Seleccione...'}
                name={name}
                value={defaultValue}
                onChange={onChange}
                onBlur={onBlur}
            />
            {error ? <div className="text-danger">{error}</div> : null}
        </FormGroup>
    )
}
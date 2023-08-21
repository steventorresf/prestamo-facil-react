import { FormGroup, FormLabel } from "react-bootstrap";
import Select from "react-select";

function FormikSelect({ className = '', label, options, name, value, onChange, onBlur, required = false, error }) {
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

export default FormikSelect;
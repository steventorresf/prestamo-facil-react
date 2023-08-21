import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { getTablaDetalleByCodigos } from "../shared/services/tablaService";
import { Form, Formik } from "formik";
import FormikSelect from "../shared/components/select";
import FormikText from "../shared/components/input";
import * as Yup from 'yup';
import { create, update } from "../shared/services/clienteService";
import { AlertSuccess } from "../shared/services/alertService";

const yupSchema = Yup.object().shape({
    tipoId: Yup.string().required("Este campo es obligatorio"),
    identificacion: Yup.string().required("Este campo es obligatorio"),
    nombreCompleto: Yup.string().required("Este campo es obligatorio"),
    generoId: Yup.string().required("Este campo es obligatorio"),
    direccion: Yup.string().required("Este campo es obligatorio"),
    telCel: Yup.string().required("Este campo es obligatorio")
})

const FormCliente = ({ data, modoForm, setModoForm, refresh }) => {
    const formBase = {
        usuarioId: '64d9871b2d0396e2e5a6aa6b',
        tipoId: '',
        identificacion: '',
        nombreCompleto: '',
        generoId: '',
        direccion: '',
        telCel: '',
    };

    const [tiposIdenList, setTiposIdenList] = useState([]);
    const [tiposGenList, setTiposGenList] = useState([]);
    const [title, setTitle] = useState('');
    const [form, setForm] = useState(null);

    useEffect(() => {
        if (modoForm != null) {
            if (modoForm === 'E') {
                setTitle('Editar cliente');
                setForm({
                    usuarioId: '64d9871b2d0396e2e5a6aa6b',
                    tipoId: data.identificacion.codigo,
                    identificacion: data.identificacion.numero,
                    nombreCompleto: data.nombreCompleto,
                    generoId: data.genero.codigo,
                    direccion: data.direccion,
                    telCel: data.telCel,
                });
            } else if (modoForm === 'A') {
                setTitle('Agregar cliente');
                setForm({ ...formBase });
            }
            getTablasDetalle();
        }
    }, [modoForm]);

    const getTablasDetalle = () => {
        getTablaDetalleByCodigos('GEN,TDO').then(res => {
            if (res.isSuccess) {
                const data = res.data;
                for (var i = 0; i < data.length; i++) {
                    const element = data[i];
                    const dataArray = [];
                    for (var k = 0; k < element.detalles.length; k++) {
                        const item = element.detalles[k];
                        dataArray.push({ value: item.codigo, label: item.descripcion });
                    }

                    if (element.codigo === 'GEN') {
                        setTiposGenList(dataArray);
                    } else if (element.codigo === 'TDO') {
                        setTiposIdenList(dataArray);
                    }
                }
            }
        });
    }

    const onSubmit = (values) => {
        const payload = {
            usuarioId: formBase.usuarioId,
            identificacion: {
                codigo: values.tipoId,
                descripcion: tiposIdenList.find(x => x.value == values.tipoId).label,
                numero: values.identificacion
            },
            nombreCompleto: values.nombreCompleto,
            genero: {
                codigo: values.generoId,
                descripcion: tiposGenList.find(x => x.value == values.generoId).label
            },
            direccion: values.direccion,
            telCel: values.telCel,
            estado: {
                codigo: 'AC',
                descripcion: 'ACTIVO'
            }
        }

        const response = modoForm === 'E' ? update(data._id, payload) : create(payload);
        response.then((res) => {
            if (res.isSuccess) {
                setModoForm(null);
                refresh();
                AlertSuccess({});
            }
        });
    }

    return (
        <Modal size="lg" show={modoForm} backdrop={"static"} onHide={() => setModoForm(null)}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{ ...form }}
                    enableReinitialize={true}
                    validationSchema={yupSchema}
                    onSubmit={(values) => {
                        onSubmit(values);
                    }}>
                    {({ values, setFieldValue, errors, touched, setTouched }) => (
                        <Form noValidate autoComplete={'off'}>
                            <Row>
                                <FormikSelect
                                    className="col-sm-6"
                                    required={true}
                                    label='Tipo de identificación'
                                    options={tiposIdenList}
                                    name='tipoId'
                                    value={values.tipoId}
                                    onChange={(option) => { setFieldValue('tipoId', option.value) }}
                                    onBlur={() => setTouched({ ...touched, tipoId: true })}
                                    error={touched.tipoId ? errors.tipoId : null}
                                />
                                <FormikText
                                    className="col-sm-6"
                                    label='Número de identificación'
                                    name='identificacion'
                                    required={true}
                                    error={touched.identificacion ? errors.identificacion : null}
                                />
                            </Row>
                            <Row className="mt-3">
                                <FormikText
                                    className="col-sm-6"
                                    label='Nombre completo'
                                    name='nombreCompleto'
                                    required={true}
                                    error={touched.nombreCompleto ? errors.nombreCompleto : null}
                                />
                                <FormikSelect
                                    className="col-sm-6"
                                    required={true}
                                    label='Género'
                                    options={tiposGenList}
                                    name='generoId'
                                    value={values.generoId}
                                    onChange={(option) => { setFieldValue('generoId', option.value) }}
                                    onBlur={() => setTouched({ ...touched, generoId: true })}
                                    error={touched.generoId ? errors.generoId : null}
                                />
                            </Row>
                            <Row className="mt-3">
                                <FormikText
                                    className="col-sm-6"
                                    label='Teléfono'
                                    name='telCel'
                                    required={true}
                                    error={touched.telCel ? errors.telCel : null}
                                />
                                <FormikText
                                    className="col-sm-6"
                                    label='Dirección'
                                    name='direccion'
                                    required={true}
                                    error={touched.direccion ? errors.direccion : null}
                                />
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-12 text-end">
                                    <Button type="button" variant="secondary" onClick={() => setModoForm(null)}>Cancelar</Button>
                                    <Button type="submit" className="ms-1" variant="primary">Guardar</Button>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    )
}
export default FormCliente;
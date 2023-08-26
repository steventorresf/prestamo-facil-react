import '../../assets/sass/login.css';
import { Formik, Form } from "formik";
import { Button, Card, Col, Row } from "react-bootstrap";
import * as Yup from 'yup';
import { login } from "../shared/services/usuarioService";
import { Navigate, useNavigate } from "react-router-dom";
import { establecerVariablesSesion, isAuthenticated } from "../shared/services/sesionService";
import { useState } from 'react';
import { FormikText } from '../shared/components/FormikControl';

const yupSchema = Yup.object().shape({
    username: Yup.string().required('Este campo es obligatorio'),
    password: Yup.string().required('Este campo es obligatorio')
})

const Login = () => {
    const navigate = useNavigate();
    const [anioActual] = useState(new Date().getFullYear());

    const isLogin = isAuthenticated();
    if (isLogin) {
        return (<Navigate to={'/'} />);
    }

    return (
        <div id='main-container' className="d-flex vh-100 justify-content-center align-items-center">
            <div className="w-login">
                <Card className='card-login'>
                    <Card.Header>
                        <Card.Title>Inicio de sesión</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Formik
                            initialValues={{ username: null, password: null }}
                            enableReinitialize={true}
                            validationSchema={yupSchema}
                            onSubmit={(values) => {
                                login(values).then((res) => {
                                    if (res.isSuccess) {
                                        establecerVariablesSesion(res.data);
                                        navigate('/');
                                    }
                                })
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form noValidate autoComplete="off">
                                    <Row>
                                        <FormikText
                                            className="col-12"
                                            label='Nombre de usuario'
                                            name='username'
                                            required={true}
                                            error={touched.username ? errors.username : null}
                                        />
                                        <FormikText
                                            className="col-12 mt-3"
                                            type="password"
                                            label='Contraseña'
                                            name='password'
                                            required={true}
                                            error={touched.password ? errors.password : null}
                                        />
                                        <Col className="col-12 mt-3">
                                            <Button type="submit" className="btn-block" variant="primary">Iniciar sesión</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            )}
                        </Formik>
                        <div className='design-by text-center mt-3'>
                            <strong>Desarrollado por:</strong> Steven Torres Fernández
                            <div>&copy; {anioActual}</div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
export default Login;
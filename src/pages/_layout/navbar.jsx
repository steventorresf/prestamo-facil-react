import { Button, Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { limpiarVariablesSesion } from "../shared/services/sesionService";

function NavBar({ title, dataUser, setShowMenu }) {
    const navigate = useNavigate();

    const cerrarSesion = () => {
        limpiarVariablesSesion();
        navigate('/login');
    }

    return (
        <Navbar bg="primary" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand className='m-0'>
                    <Button className="btn-menu" variant="primary" onClick={() => setShowMenu(true)}>
                        <i class="bi bi-list"></i>
                    </Button>
                </Navbar.Brand>
                <Nav className='me-auto nav-title'>
                    <Nav.Link onClick={() => navigate('/')}><h1 className='m-0'>{title}</h1></Nav.Link>
                </Nav>
                <Nav>
                    <Dropdown>
                        <Dropdown.Toggle variant='primary'>
                            <i class="bi bi-person-circle me-1"></i>
                            {dataUser.username}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>{dataUser.name}</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={cerrarSesion}>Cerrar sesión</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    )
}
export default NavBar;
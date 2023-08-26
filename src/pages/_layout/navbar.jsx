import { Button, Dropdown, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { limpiarVariablesSesion } from "../shared/services/sesionService";
import ImgLogo from "../shared/components/ImgLogo";

function NavBar({ title, dataUser, setShowMenu }) {
    const navigate = useNavigate();

    const cerrarSesion = () => {
        limpiarVariablesSesion();
        navigate('/login');
    }

    return (
        <Navbar bg="light" className="bg-body-tertiary">
            <Navbar.Brand className='ps-3'>
                <Button className="btn-menu" size="sm" variant="light" onClick={() => setShowMenu(true)}>
                    <i class="bi bi-list"></i>
                </Button>
            </Navbar.Brand>
            <Nav className='me-auto nav-title'>
                <a onClick={() => navigate('/')}>
                    <ImgLogo className="me-2" width={'50px'} height={'50px'} />
                    {title}
                </a>
            </Nav>
            <Nav className="pe-3">
                <Dropdown align={"end"}>
                    <Dropdown.Toggle variant='light'>
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
        </Navbar>
    )
}
export default NavBar;
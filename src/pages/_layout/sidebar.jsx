import { Dropdown, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HEADER = 'Menú principal';
const MENU = [
    { name: 'Inicio', link: '/', icon: 'bi bi-house-door' },
    { name: 'Clientes', link: '/clientes', icon: 'bi bi-people' }
]

function SideBar({ title, showMenu, setShowMenu }) {
    const navigate = useNavigate();

    const goUrl = (item) => {
        setShowMenu(false);
        navigate(item.link);
    }

    return (
        <Offcanvas show={showMenu} onHide={() => setShowMenu(false)}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{title}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Dropdown.Menu show className="w-90">
                    <Dropdown.Header>{HEADER}</Dropdown.Header>
                    {MENU.map(item => {
                        return (
                            <Dropdown.Item onClick={() => goUrl(item)}>
                                <i className={item.icon + ' me-1'}></i>
                                {item.name}
                            </Dropdown.Item>
                        )
                    })}
                </Dropdown.Menu>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
export default SideBar;
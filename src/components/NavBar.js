import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, DropdownButton, Nav, Navbar, Dropdown} from "react-bootstrap";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {NavLink} from "react-router-dom";
import {observer} from "mobx-react-lite";
import ListGroup from "react-bootstrap/ListGroup";
import {useNavigate} from "react-router-dom";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const {device} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(true)
        console.log(user)
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <NavLink to={SHOP_ROUTE} style={{color: 'white'}}>Магазин техники</NavLink>
                <Nav className="ml-auto">
                    <DropdownButton id="dropdown-basic-button" title="Категории" className=''>
                        {device.types.map(type =>
                            <Dropdown.Item as="li"
                                            style={{cursor: 'pointer'}}
                                            active={type.id === device.selectedType.id}
                                            onClick={() => device.setSelectedType(type)}
                                            key={type.id}
                            >
                                {type.name}
                            </Dropdown.Item>
                        )}
                    </DropdownButton>
                    {user.isAuth ?
                    <Nav style={{color: 'white'}}>
                        <Nav.Link
                            variant={"outline-light"}
                            onClick={() => navigate(ADMIN_ROUTE)}
                        >
                            Админ панель
                        </Nav.Link>
                        <Nav.Link variant={"outline-light"} className={'ms-4'} onClick={() => logOut()}>Выйти</Nav.Link>
                    </Nav>
                    :
                    <Nav style={{color: 'white'}}>
                        <Nav.Link variant={"outline-light"} className={'ms-4'} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Nav.Link>
                    </Nav>
                    }
                </Nav>

            </Container>
        </Navbar>
    )
})

export default NavBar;



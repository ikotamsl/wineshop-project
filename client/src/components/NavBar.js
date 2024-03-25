import React, {useContext} from 'react';
import {Context} from "../index";
import {Container, Navbar, Nav, Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {AUTH_ROUTE, EMPLOYEE_ROUTE, HOME_ROUTE, SPECIAL_ORDER_ROUTE} from "../utils/const";
import {useHistory} from "react-router-dom";

const NavBar = observer(() => {
    const {customer, employee} = useContext(Context);
    const history = useHistory();
    const logOut = () => {
        customer.setIsAuth(false);
        customer.setCustomer({});
        employee.setIsAuth(false);
        employee.setEmployee({});

        history.push(HOME_ROUTE);
    }

    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand
                    onClick={() => history.push(HOME_ROUTE)}
                    style={
                        {
                            color: '#7B0323',
                            cursor: "pointer"
                        }
                    }
                >Wineterria</Navbar.Brand>
                <Button variant={"outline-warning"} onClick={() => history.push(SPECIAL_ORDER_ROUTE)}>Order your preferred bottle there!</Button>
                {employee.isAuth ?
                    <Nav className={"ml-auto"}>
                        <Button
                            variant={"outline-dark"}
                            onClick={() => history.push(EMPLOYEE_ROUTE)}
                        >View current orders</Button>
                    </Nav>
                    :
                    <></>
                }
                {customer.isAuth ?
                    <Nav className="ml-auto">
                        <Button variant={"outline-primary"} onClick={() => logOut()}>Exit</Button>
                    </Nav>
                        :
                    <Nav className="ml-auto">
                        <Button variant={"outline-primary"} onClick={() => history.push(AUTH_ROUTE)} >Log In</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;
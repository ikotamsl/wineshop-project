import React, {useContext} from 'react';
import {Context} from "../index";
import {Container, Navbar, Nav, Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {AUTH_ROUTE} from "../utils/const";
import {useHistory} from "react-router-dom";

const NavBar = observer(() => {
    const {customer} = useContext(Context);
    const history = useHistory();
    const logOut = () => {
        customer.setIsAuth(false);
        customer.setCustomer({});
    }

    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="/" style={{color: '#7B0323'}}>Wineterria</Navbar.Brand>
                <Button variant={"outline-warning"}>Order your preferred bottle there!</Button>
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
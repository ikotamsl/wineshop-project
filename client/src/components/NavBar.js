import React, {useContext} from 'react';
import {Context} from "../index";
import {Container, Navbar, Nav, Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {customer} = useContext(Context);
    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="/" style={{color: '#7B0323'}}>Wineterria</Navbar.Brand>
                {customer.isAuth ?
                    <Nav className="ml-auto">
                        <Button variant={"outline-primary"}>Exit</Button>
                    </Nav>
                        :
                    <Nav className="ml-auto">
                        <Button variant={"outline-primary"} href="/auth">Log In</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;
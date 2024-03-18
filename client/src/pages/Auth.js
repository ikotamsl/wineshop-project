import React from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";

const Auth = () => {
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 64}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className={"m-auto"}>Authorization</h2>
                <Form className={"d-flex flex-column"}>
                    <Form.Control
                        className={"mt-2"}
                        placeholder={"Enter your login"}
                    />
                    <Form.Control
                        className={"mt-2"}
                        placeholder={"Enter your password"}
                    />
                    <Button className={"mt-3 align-self-end"} variant={"outline-success"}>Enter</Button>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;
import React from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";

const WinePage = (position) => {
    const attributes = [
        {
            attr_name: "Shore",
            attr_value: "Left"
        }
    ]
    return (
        <Container mt={4}>
            <Row>
                <Col md={4}>
                    <Image />
                </Col>

                <Col md={4}>
                    <Row>
                        <h2>{position.name}</h2>
                    </Row>
                </Col>

                <Col md={4}>
                    <Card
                        className={"d-flex flex-column align-items-center justify-content-around"}
                        style={{width: 500, height: 500, fontSize: 32, border: '3px solid darkred'}}
                    >
                        <h3>{position.price}</h3>
                        <Button variant={'outline-dark'}>Add to cart</Button>
                    </Card>
                </Col>
            </Row>
            <Row className={"d-flex flex-column m-5 align-items-end"}>
                {attributes.map(e =>
                    <Row>
                        <h3>{e.attr_name}</h3>
                        <p>{e.attr_value}</p>
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default WinePage;
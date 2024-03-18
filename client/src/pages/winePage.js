import React from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";

const WinePage = () => {
    const position = {
        id: 1,
        name: 'Chevalier Noir',
        price: 250
    }
    const attributes = [
        {
            attr_name: "Shore",
            attr_value: "Left"
        }
    ]
    return (
        <Container mt={4}>
            <h2>{position.name}</h2>
            {attributes.map(e =>
                <Row>
                    <h4>{e.attr_name}</h4>
                    <p>{e.attr_value}</p>
                </Row>
            )}
            <h3>{position.price}</h3>
            <Button variant={'outline-dark'}>Add to cart</Button>
        </Container>
    );
};

export default WinePage;
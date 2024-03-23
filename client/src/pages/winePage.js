import React from 'react';
import {Button, Card, Col, Container, Image, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import stockPic from '../static/stock_wine_pic.png';
const WinePage = () => {
    // position and attributes variables are for testing only
    // They MUST be commented out or deleted before going to production

    const position = {
        id: 1,
        name: 'Chevalier Noir',
        price: 250,
        type: {
            id: 1,
            code: 'red_dry',
            name: 'Red Dry'
        },
        grape: {
            id: 1,
            code: 'merlot',
            name: 'Merlot'
        },
        year: 2022,
        stock: 15
    };

    const attributes = [
        {
            attr_name: "Shore",
            attr_value: "Left"
        }
    ];
    return (
        <Container mt={4} style={{width: '50%'}}>
            <h2>{position.name}</h2>
            <div style={{width: 500, height: 500, background: 'darkred'}}>
                <Image height={"100%"} width={"100%"} alt={'No Image'} />
            </div>

            <hr />
            <h3>Additional attributes:</h3>
            <ListGroup>
                {attributes.map(e =>
                    <ListGroupItem>
                        <h5>{e.attr_name}</h5>
                        <p>{e.attr_value}</p>
                    </ListGroupItem>
                )}
            </ListGroup>
            <h3>Price: {position.price}$</h3>
            <Button variant={'outline-dark'}>Add to cart</Button>
        </Container>
    );
};

export default WinePage;
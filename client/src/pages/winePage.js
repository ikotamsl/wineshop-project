import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import stockPic from '../static/stock_wine_pic.png';
import {getOnePosition} from "../http/positionAPI";
import {useParams} from "react-router-dom";
import data from "bootstrap/js/src/dom/data";
const WinePage = () => {
    // position and attributes variables are for testing only
    // They MUST be commented out or deleted before going to production

    let attributes = [];
    const [wine, setWine] = useState({attributes: []})
    const {id} = useParams();

    useEffect(() => {
        getOnePosition(id).then(data => {
            setWine(data);
        });
    }, []);

    return (
        <Container mt={4} style={{width: '50%'}}>
            <h2>{wine.name}</h2>
            <div style={{width: 500, height: 500, background: 'darkred'}}>
                <Image height={"100%"} width={"100%"} alt={'No Image'}/>
            </div>
            <hr/>
            <h3>Additional attributes:</h3>
            <ListGroup>
                {
                    wine.attributes.map(e =>
                    <ListGroupItem>
                        <h5>{e.attr_name}</h5>
                        <p>{e.attr_value}</p>
                    </ListGroupItem>
                    )
                }
            </ListGroup>
            <h3>Price: {wine.price}$</h3>
            <Button variant={'outline-dark'}>Add to cart</Button>
        </Container>
    );
};

export default WinePage;
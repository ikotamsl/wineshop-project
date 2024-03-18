import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";

const Shop = () => {
    return (
        <Container>
            <Row>
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    asdfasdfasdfasdf
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;
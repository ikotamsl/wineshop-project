import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import GrapeBar from "../components/GrapeBar";
import YearBar from "../components/YearBar";
import PositionList from "../components/PositionList";

const Shop = () => {
    return (
        <Container>
            <Row>
                <Col md={3}>
                    <TypeBar />
                    <GrapeBar />
                    <YearBar />
                </Col>
                <Col md={9}>
                    <PositionList />
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;
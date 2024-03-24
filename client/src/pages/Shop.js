import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import GrapeBar from "../components/GrapeBar";
import PositionList from "../components/PositionList";
import {Context} from "../index";
import {getGrapes, getTypes} from "../http/positionAPI";
import {observer} from "mobx-react-lite";

const Shop = observer(() => {
    const {wine} = useContext(Context);


    useEffect(() => {
        getTypes().then(data => wine.setTypes(data.data)).catch(e => console.log(e));
        getGrapes().then(data => wine.setGrapes(data.data)).catch(e => console.log(e));


    }, []);

    return (
        <Container>
            <Row>
                <Col md={2}>
                    <h4>Wine Type</h4>
                    <TypeBar />
                    <h4>Grape Sort</h4>
                    <GrapeBar />
                </Col>
                <Col md={9}>
                    <PositionList />
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
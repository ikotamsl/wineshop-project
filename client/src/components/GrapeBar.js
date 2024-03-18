import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Container, ListGroup, Row} from "react-bootstrap";

const GrapeBar = observer(() => {
    const {wine} = useContext(Context);


    return (
        <Container>
            <ListGroup className={"d-flex mt-4"}>
                {
                    wine.grapes.map(grape =>
                        <ListGroup.Item
                            style={{cursor: 'pointer'}}
                            active={grape.id === wine.selectedGrape.id}
                            onClick={() => wine.setSelectedGrape(grape)}
                            key={grape.id}
                            className={"p-3"}
                        >
                            {grape.name}
                        </ListGroup.Item>
                    )
                }
            </ListGroup>
        </Container>
    );
});

export default GrapeBar;
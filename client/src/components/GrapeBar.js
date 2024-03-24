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
                            style={
                                {
                                    cursor: 'pointer',
                                    background: grape.id === wine.selectedGrape.id ? '#7B0323' : 'white',
                                    border: grape.id === wine.selectedGrape.id ? '#7B0323' : 'white',
                                }
                            }
                            active={grape.code === wine.selectedGrape.code}
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
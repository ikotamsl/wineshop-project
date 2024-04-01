import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Container, ListGroup} from "react-bootstrap";

const TypeBar = observer(() => {
    const {wine} = useContext(Context);
    return (
        <Container>
            <ListGroup className={"mt-4 d-flex"}>
                {wine.types.map(type =>
                    <ListGroup.Item
                        style={
                            {
                                cursor: 'pointer',
                                background: type.id === wine.selectedType.id ? '#7B0323' : 'white',
                                border: type.id === wine.selectedType.id ? '#7B0323' : 'white',
                            }
                        }
                        active={type.code === wine.selectedType.code}
                        key={type.id}
                        onClick={() => {
                                if (type.id === wine.selectedType.id) {
                                    wine.setSelectedType({}); // Deselect if already selected
                                } else {
                                    wine.setSelectedType(type); // Select if not selected
                                }
                            }
                        }
                    >
                        {type.name}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Container>
    );
});

export default TypeBar;
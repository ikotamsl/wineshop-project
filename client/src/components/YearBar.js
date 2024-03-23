import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Container, ListGroup} from "react-bootstrap";

const YearBar = observer(() => {
    const {wine} = useContext(Context);
    return (
        <Container>
            <ListGroup className={"mt-4 d-flex"}>
                {wine.years.map(year =>
                    <ListGroup.Item
                        active={year === wine.selectedYear}
                        key={year}
                        onClick={() => wine.setSelectedYear(year)}
                        style={
                            {
                                cursor: 'pointer',
                                background: year === wine.selectedYear ? '#7B0323' : 'white',
                                border: year === wine.selectedYear ? '#7B0323' : 'white',
                            }
                        }
                    >
                        {year}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Container>
    );
});

export default YearBar;
import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import wineStore from "../store/wineStore";
import {ListGroup} from "react-bootstrap";

const TypeBar = observer(() => {
    const {wine} = useContext(Context);
    return (
        <ListGroup>
            {wine.types.map(type =>
                <ListGroup.Item key={type}>
                    {type}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;
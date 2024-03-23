import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import PositionItem from "./PositionItem";

const PositionList = observer(() => {
    const {wine} = useContext(Context);

    return (
        <Row className={"d-flex mt-4"}>
            {wine.positions.map(position =>
                <PositionItem key={position.id} position={position} />
            )}
        </Row>
    );
});

export default PositionList;
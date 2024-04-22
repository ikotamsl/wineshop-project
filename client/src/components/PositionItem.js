import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {POSITION_ROUTE} from "../utils/const";

const PositionItem = ({position}) => {
    const history = useHistory();

    return (
        <Col md={3} onClick={
            () => history.push(`${POSITION_ROUTE}/${position.id}` )
        }>
            <Card
                style={
                    {
                        width: 168,
                        cursor: 'pointer',
                        borderRadius: 5,
                        background: 'darkred',
                        color: 'white'
                    }
                }

            >
                <Image width={168} height={168} src={position.image} style={{position: 'static'}}/>
                <div>
                    <div>{position.name}</div>
                </div>
            </Card>
        </Col>
    );
};

export default PositionItem;
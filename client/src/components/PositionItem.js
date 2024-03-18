import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import {useHistory} from "react-router-dom";

const PositionItem = ({position}) => {
    const history = useHistory();

    return (
        <Col md={3} onClick={
            () => history.push(`/positions/${position.id}` )
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
                <Image width={168} height={168} src={'../../public/favicon.ico'} style={{position: 'static'}}/>
                <div>
                    <div>{position.name}</div>
                </div>
            </Card>
        </Col>
    );
};

export default PositionItem;
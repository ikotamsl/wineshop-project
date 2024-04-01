import React, {useState} from 'react';
import {Button, Container, Image, ListGroup} from "react-bootstrap";

const cart = [
    {
        id: 1,
        quantity: 5,
        position: {
            id: 1,
            name: 'Chevalier Noir'
        }
    }
];

const Counter = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(prevCount => prevCount + 1);
    };

    const decrement = () => {
        if (count > 0)
            setCount(prevCount => prevCount - 1);
    };

    return (
        <div className={"d-flex flex-row bd-highlight mb-3"} style={{alignItems: 'center'}}>
            <Button onClick={decrement} style={{marginRight: '5%'}} variant={"outline-primary"}>-</Button>
            <h4>{count}</h4>
            <Button onClick={increment} style={{marginLeft: '5%'}} variant={"outline-primary"}>+</Button>
        </div>
    );
};


const Cart = () => {
    return (
        <Container>
            <h1>Your cart</h1>
            <ListGroup>
                {
                    cart.map(e =>
                        <ListGroup.Item
                            key={e.id}
                            className={"p-3"}
                        >
                            <div className="d-flex align-items-center">
                                <Image width={168} height={168} src={'../../public/favicon.ico'}
                                       style={{position: 'static'}}/>
                                <div style={{marginRight: '10px', marginLeft: '5%'}}>
                                    <h3>{e.position.name}</h3>
                                    <h1>Quantity</h1>
                                    <Counter></Counter>
                                </div>
                            </div>
                        </ListGroup.Item>
                    )
                }
            </ListGroup>
        </Container>
);
};

export default Cart;
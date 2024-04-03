import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Image, ListGroup} from "react-bootstrap";
import {getGrapes, getOnePosition, getPositions, getTypes} from "../http/positionAPI";
import {Context} from "../index";
import {getOrders} from "../http/orderAPI";
import {getCustomerCart} from "../http/userAPI";

const cart = {
    "id": 1,
    "customer_id": 1,
    "cart_positions": [
        {
            "id": 1,
            "quantity": 3,
            "cart_id": 1,
            "position_id": 1
        }
    ]
}

const Counter = ({initial}) => {
    const [count, setCount] = useState(initial);

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
    const {customer} = useContext(Context);
    const [cart, setCart] = useState({positions: []})

    useEffect(() => {
        getCustomerCart(customer.id).then(data => {
            let positions = [];

            const cartData = data;

            console.log(cartData)

            data.cart_positions.forEach(e => {
                getOnePosition(e.id).then(data => {
                    positions.push(
                        {
                            id: data.id,
                            name: data.name,
                            quantity: e.quantity
                        }
                    );
                    setCart(
                        {
                            id: cartData.id,
                            customer_id: cartData.customer_id,
                            positions: [...positions]
                        }
                    );
                })
            });
        });
        }, []);

    console.log(cart);

    return (
        <Container>
            <h1>Your cart</h1>
            <ListGroup>
                {
                    cart.positions.map(e =>
                        <ListGroup.Item
                            key={e.id}
                            className={"p-3"}
                        >
                            <div className="d-flex align-items-center">
                                <Image width={168} height={168} src={'../../public/favicon.ico'}
                                       style={{position: 'static'}}/>
                                <div style={{marginRight: '10px', marginLeft: '5%'}}>
                                    <h3>{e.name}</h3>
                                    <h1>Quantity</h1>
                                    <Counter initial={e.quantity}></Counter>
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
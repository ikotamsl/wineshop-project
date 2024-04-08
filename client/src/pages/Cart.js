import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Image, ListGroup} from "react-bootstrap";
import {getOnePosition} from "../http/positionAPI";
import {Context} from "../index";
import {getCustomerCart} from "../http/userAPI";
import Counter from "../components/Component";

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
                            cart_position: e.id,
                            quantity: e.quantity,
                            total: e.quantity * data.price
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
                                    <h1>Total</h1>
                                    <h2>{e.total} USD</h2>
                                    <h1>Quantity</h1>
                                    <Counter initial={e.quantity} context={e} cart={cart}></Counter>
                                </div>
                            </div>
                        </ListGroup.Item>
                    )
                }
            </ListGroup>
            <Button className={'m-5'}>Create order</Button>
        </Container>
);
};

export default Cart;
import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Image, ListGroup, ListGroupItem} from "react-bootstrap";
import {getOnePosition} from "../http/positionAPI";
import {useParams} from "react-router-dom";
import {updateCart} from "../http/cartAPI";
import {getCustomerCart} from "../http/userAPI";
import {Context} from "../index";
import {useHistory} from "react-router-dom";
import {HOME_ROUTE} from "../utils/const";

const Counter = ({initial, onCountChange}) => {
    const [count, setCount] = useState(initial);

    const increment = () => {
        setCount(prevCount => prevCount + 1);
        onCountChange(count + 1);
    };

    const decrement = () => {
        if (count > 1) {
            setCount(prevCount => prevCount - 1);
            onCountChange(count - 1);
        }
    };

    return (
        <div className={"d-flex flex-row bd-highlight mb-3"} style={{alignItems: 'center'}}>
            <Button onClick={decrement} style={{marginRight: '5%'}} variant={"outline-primary"}>-</Button>
            <h4>{count}</h4>
            <Button onClick={increment} style={{marginLeft: '5%'}} variant={"outline-primary"}>+</Button>
        </div>
    );
};

const WinePage = () => {
    // position and attributes variables are for testing only
    // They MUST be commented out or deleted before going to production

    const history = useHistory();
    const {customer} = useContext(Context);
    const [wine, setWine] = useState({attributes: []});
    const [count, setCount] = useState(1);
    const {id} = useParams();
    const [cart, setCart] = useState({positions: []})

    useEffect(() => {
        let cartData = {};
        let positions = [];

        getCustomerCart(customer.id).then(data => {
            cartData = data;

            setCart({
                id: cartData.id,
                customer_id: cartData.customer_id,
                positions: [...positions]
            });

            data.cart_positions.forEach(e => {
                getOnePosition(e.position_id).then(data => {
                    positions.push(
                        {
                            id: data.id,
                            name: data.name,
                            cart_position: e.id,
                            quantity: e.quantity,
                            total: e.quantity * data.price
                        }
                    );

                    setCart({
                        id: cartData.id,
                        customer_id: cartData.customer_id,
                        positions: [...positions]
                    });
                });
            });
        });
    }, []);

    const handleCountChange = (newCount) => {
        setCount(newCount);
    };

    useEffect(() => {
        getOnePosition(id).then(data => {
            setWine(data);
        });
    }, []);

    const addToCart = () => {
        try {
            if (!customer.isAuth) {
                alert('You should be authorized as a customer');
                throw new Error();
            }

            updateCart(cart.id, {
                position: wine.id,
                quantity: count
            }).then(
                data => {
                    if (!data) {
                        alert('The bottle may have been already added');
                        console.log(data);
                    } else {
                        alert('Bottle added!');
                    }
                    history.push(HOME_ROUTE);
                }
            );
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Container mt={4} style={{width: '50%'}}>
            <h2>{wine.name}</h2>
            <div style={{width: 500, height: 500, background: 'darkred'}}>
                <Image height={"100%"} width={"100%"} alt={'No Image'} src={wine.image}/>
            </div>
            <hr/>
            <h3>Additional attributes:</h3>
            <ListGroup>
                {
                    wine.attributes.map(e =>
                    <ListGroupItem>
                        <h5>{e.attr_name}</h5>
                        <p>{e.attr_value}</p>
                    </ListGroupItem>
                    )
                }
            </ListGroup>
            <h3>Price: {wine.price}$</h3>
            <h5>In Stock</h5>
            <p>{wine.stock}</p>
            <h2>Quantity</h2>
            <Counter initial={count} onCountChange={handleCountChange}/>
            <Button variant={'outline-dark'} onClick={addToCart}>Add to cart</Button>
        </Container>
    );
};

export default WinePage;
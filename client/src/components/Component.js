import React, {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import {updateCart} from "../http/cartAPI";
import {Button} from "react-bootstrap";

const Counter = ({initial, context, cart}) => {
    const {customer} = useContext(Context);
    const [count, setCount] = useState(initial);

    const increment = () => {
        setCount(prevCount => prevCount + 1);

        console.log('increment');
        console.log(context);
        console.log(cart);
    };

    const decrement = () => {
        if (count > 0) {
            setCount(prevCount => prevCount - 1);
            console.log('decrement');
            console.log(context);
            console.log(cart);
        }
    };

    const body = {
        cart_position: context.cart_position,
        quantity: count,
        position: context.id
    }

    useEffect(() => {
        updateCart(cart.id, body).catch(data => console.log(data)).then(data => console.log('success', data));
    }, [count]);


    return (
        <div className={"d-flex flex-row bd-highlight mb-3"} style={{alignItems: 'center'}}>
            <Button onClick={decrement} style={{marginRight: '5%'}} variant={"outline-primary"}>-</Button>
            <h4>{count}</h4>
            <Button onClick={increment} style={{marginLeft: '5%'}} variant={"outline-primary"}>+</Button>
        </div>
    );
};

export default Counter;
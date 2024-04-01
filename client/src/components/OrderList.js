import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Container, ListGroup} from "react-bootstrap";
import {getOrders} from "../http/orderAPI";
import {Context} from "../index";

const OrdersList = observer(() => {

    const {customer, employee} = useContext(Context);
    const [orders, setOrders] = useState({data: []});

    customer.setCustomer(customer);

    useEffect(() => {
        if (employee.isAuth)
            getOrders().then(data => setOrders(data));
        if (customer.isAuth)
            getOrders({customer_id: customer.id}).then()
    }, []);

    let filteredData = [];

    if (employee.isAuth) {
        filteredData = orders.data.filter(item => item.is_special && item.comment);
    } else {
        filteredData = orders.data;
    }

    console.log(filteredData);

    return (
        <Container>
            <h2>Customer's special orders</h2>
            <ListGroup className={"d-flex mt-4"}>
                {
                    filteredData.map(order =>
                        <ListGroup.Item
                            style={
                                {
                                    cursor: 'pointer',
                                }
                            }
                            key={order.id}
                            className={"p-3"}
                        >
                            <pre>{order.comment}</pre>
                        </ListGroup.Item>
                    )
                }
            </ListGroup>
        </Container>
    );
});

export default OrdersList;
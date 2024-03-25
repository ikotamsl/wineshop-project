import React from 'react';
import {observer} from "mobx-react-lite";
import OrderList from "../components/OrderList";

const EmpOrders = observer(() => {
    return (
        <OrderList />
    );
});

export default EmpOrders;
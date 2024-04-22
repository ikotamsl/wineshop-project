import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check, checkEmp} from "./http/userAPI";
import {Spinner} from "react-bootstrap";

const App = observer(() => {
    const {customer, employee} = useContext(Context);
    const [loading, setLoading] = useState(true);

    console.log(`employee`, employee.isAuth);
    console.log(`customer`, customer.isAuth);

    try {
        useEffect(() => {
            check().then(data => {
                customer.setCustomer(customer);
                customer.setIsAuth(true);
            }).catch(e => console.log(e)).finally(() => setLoading(false));
        }, []);


        useEffect(() => {
            checkEmp().then(data => {
                employee.setIsAuth(true);
                employee.setEmployee(employee);
            }).catch(e => console.log(e)).finally(() => setLoading(false));
        }, []);

        if (loading) {
            return <Spinner animation={'grow'}/>
        }
    } catch (e) {
        console.log(e);
    }

    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
});

export default App;

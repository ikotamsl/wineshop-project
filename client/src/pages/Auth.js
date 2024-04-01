import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {customerLogin, empLogin} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useHistory} from "react-router-dom";
import {EMPLOYEE_ROUTE, HOME_ROUTE} from "../utils/const";
import employeeStore from "../store/employeeStore";

const Auth = observer(() => {
    const {customer, employee} = useContext(Context);
    const history = useHistory();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const click = async (e) => {
        try {
            if (e.target.id === 'emp_button') {
                const data = await empLogin(login, password);

                employee.setIsAuth(true);
                employee.setEmployee(employee);
                history.push(EMPLOYEE_ROUTE);
            }
            if (e.target.id === 'cust_button') {
                const data = await customerLogin(login, password);

                customer.setIsAuth(true);
                customer.setCustomer(customer);
                history.push(HOME_ROUTE);
            }
        } catch (e) {
            alert(e.response.data.message);
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 64}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className={"m-auto"}>Authorization</h2>
                <Form className={"d-flex flex-column"}>
                    <Form.Control
                        className={"mt-2"}
                        placeholder={"Enter your login"}
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <Form.Control
                        className={"mt-2"}
                        placeholder={"Enter your password"}
                        type={'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                        id={'cust_button'}
                        className={"mt-3 align-self-end"}
                        variant={"outline-success"}
                        onClick={click}
                    >
                        Enter
                    </Button>
                    <Button
                        id={'emp_button'}
                        className={"mt-3 align-self-end"}
                        variant={"outline-warning"}
                        onClick={click}
                    >
                        Log in as Employee
                    </Button>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
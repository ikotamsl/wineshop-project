import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {customerLogin, empLogin} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useHistory} from "react-router-dom";
import {HOME_ROUTE} from "../utils/const";
import InputMask from 'react-input-mask';
import {placeOrder} from "../http/orderAPI";

const SpecialOrder = observer(() => {
    const history = useHistory();

    const [comment, setComment] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const click = async (e) => {
        try {
            const data = placeOrder({
                is_special: true,
                comment: `${comment}\nPhone number: ${phone}\nEmail: ${email}`
            });

            alert('Order placed! We\'ll contact you soon!');
            history.push(HOME_ROUTE);
        } catch (e) {
            alert('Input error');
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 64}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className={"m-auto"}>Specify your request here!</h2>
                <Form className={"d-flex flex-column"}>
                    <Form.Control
                        className={"mt-2"}
                        placeholder={"Enter your request"}
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        className={"mt-2"}
                        placeholder={"Enter your email"}
                        value={email}
                        type={"email"}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Label>Phone Number</Form.Label>
                    <InputMask
                        mask="(99) 999-9999"
                        className="form-control"
                        placeholder="(12) 345-6789"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        Please enter your phone number.
                    </Form.Text>
                    <Button
                        id={'cust_button'}
                        className={"mt-3 align-self-end"}
                        variant={"outline-success"}
                        onClick={click}
                    >
                        Submit
                    </Button>
                </Form>
            </Card>
        </Container>
    );
});

export default SpecialOrder;
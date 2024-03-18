import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {authRouter, publicRoutes} from "../routes";
import {Context} from "../index";

const AppRouter = () => {
    const {customer} = useContext(Context);

    console.log(customer);
    return (
        <Switch>
            {customer.isAuth && authRouter.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={'/'}/>
        </Switch>
    );
};

export default AppRouter;
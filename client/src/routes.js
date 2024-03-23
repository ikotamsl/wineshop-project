import ordersList from "./pages/ordersList";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import winePage from "./pages/winePage";
import Auth from "./pages/Auth";
import Shop from "./pages/Shop";
import {AUTH_ROUTE, CART_ROUTE, CHECKOUT_ROUTE, HOME_ROUTE, ORDERS_ROUTE, POSITION_ROUTE} from "./utils/const";
export const authRouter = [
    {
        path: `${ORDERS_ROUTE}`,
        Component: ordersList
    },
    {
        path: `${CART_ROUTE}`,
        Component: Cart
    },
    {
        path: `${CHECKOUT_ROUTE}`,
        Component: Checkout
    }
];

export const publicRoutes = [
    {
        path: `${POSITION_ROUTE}/:id`,
        Component: winePage
    },
    {
        path: `${AUTH_ROUTE}`,
        Component: Auth
    },
    {
        path: `${HOME_ROUTE}`,
        Component: Shop
    }
]
import ordersList from "./pages/ordersList";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import winePage from "./pages/winePage";
import Auth from "./pages/Auth";
import Shop from "./pages/Shop";
export const authRouter = [
    {
        path: '/orders',
        Component: ordersList
    },
    {
        path: '/cart',
        Component: Cart
    },
    {
        path: '/checkout',
        Component: Checkout
    }
];

export const publicRoutes = [
    {
        path: '/wine/:id',
        Component: winePage
    },
    {
        path: '/auth',
        Component: Auth
    },
    {
        path: '/',
        Component: Shop
    }
]
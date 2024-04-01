import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import customerStore from "./store/customerStore";
import wineStore from "./store/wineStore"
import employeeStore from "./store/employeeStore";
export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        customer: new customerStore(),
        wine: new wineStore(),
        employee: new employeeStore()
    }}>
        <App />
    </Context.Provider>,
);

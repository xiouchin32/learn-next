import React, { Dispatch } from "react";
import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
        ? {
              type: Key;
          }
        : {
              type: Key;
              payload: M[Key];
          };
};

export enum ProductCartInfoType {
    "CART_ADD_ITEM" = "CART_ADD_ITEM",
    "CART_REMOVE_ITEM" = "CART_REMOVE_ITEM",
}

export interface productInfo {
    name: string;
    slug: string;
    category: string;
    image: string;
    price: number;
    brand: string;
    rating: number;
    numReviews: number;
    countInStock: number;
    description: string;
    quantity: number;
}

type ActionPayload = {
    [ProductCartInfoType.CART_ADD_ITEM]: {
        cartItems: productInfo;
    };
    [ProductCartInfoType.CART_REMOVE_ITEM]: {
        cartItems: productInfo;
    };
};

export type StoreAction = ActionMap<ActionPayload>[keyof ActionMap<ActionPayload>];

const initialState: { cart: { cartItems: productInfo[] } } = {
    cart: Cookies.get("cart") ? JSON.parse(Cookies.get("cart")!) : { cartItems: [] },
};

export const Store = createContext<{
    state: {
        cart: { cartItems: productInfo[] };
    };
    dispatch: Dispatch<{
        type: ProductCartInfoType.CART_ADD_ITEM | ProductCartInfoType.CART_REMOVE_ITEM;
        payload: any;
    }>;
}>({ state: initialState, dispatch: () => null });

export const reducer = (state: { cart: { cartItems: productInfo[] } }, action: StoreAction) => {
    switch (action.type) {
        case ProductCartInfoType.CART_ADD_ITEM: {
            const newItem = action.payload.cartItems;
            const existItem = state.cart.cartItems.find((item) => item.slug === newItem.slug);
            const cartItems = existItem
                ? state.cart.cartItems.map((item) => (item.name === existItem.name ? newItem : item))
                : [...state.cart.cartItems, newItem];
            Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
            return { ...state, cart: { ...state.cart, cartItems } };
        }
        case ProductCartInfoType.CART_REMOVE_ITEM: {
            const cartItems = state.cart.cartItems.filter((item) => item.slug !== action.payload.cartItems.slug);
            Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
            return { ...state, cart: { ...state.cart, cartItems } };
        }

        default:
            return state;
    }
};

export const StoreProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };

    return <Store.Provider value={value}>{children}</Store.Provider>;
};

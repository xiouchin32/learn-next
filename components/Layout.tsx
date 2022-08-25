import { CallTracker } from "assert";
import Head from "next/head";
import Link from "next/link";
import React, { Component, useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";

interface props {
    title: string;
    children: JSX.Element | string;
}

const Layout = ({ title, children }: props) => {
    const { state, dispatch } = useContext(Store);
    const { cart } = state;

    const [cartItemsCount, setcartItemsCount] = useState(0);

    useEffect(() => {
        setcartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    }, [cart.cartItems]);

    return (
        <>
            <Head>
                <title>{title ? title + "- Amazon" : "Amazon"}</title>
                <meta name="description" content="Ecommerce website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex min-h-screen flex-col justify-between">
                <header>
                    <nav className="flex h-12 items-center px-4 justify-between shadow-md">
                        <Link href="/">
                            <a className="text-lg font-bold">amazona</a>
                        </Link>
                        <div>
                            <Link href="/cart">
                                <a className="p-2">
                                    Cart
                                    {cartItemsCount > 0 && (
                                        <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                                            {cartItemsCount}
                                        </span>
                                    )}
                                </a>
                            </Link>
                            <Link href="/login">
                                <a className="p-2">Login</a>
                            </Link>
                        </div>
                    </nav>
                </header>
                <main className="container m-auto mt-4 px-4">{children}</main>
                <footer className="flex h-10 justify-center items-center shadow-inner">
                    <p>Copyright © 2022 Amazona</p>
                </footer>
            </div>
        </>
    );
};

export default Layout;

import Head from "next/head";
import Link from "next/link";
import React, { Component } from "react";

interface props {
    title: string;
    children: JSX.Element | string;
}

const Layout = ({ title, children }: props) => {
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
                                <a className="p-2">Cart</a>
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

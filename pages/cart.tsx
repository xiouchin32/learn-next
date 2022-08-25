import Link from "next/link";
import React, { Component, useContext } from "react";
import Layout from "../components/Layout";
import { ProductCartInfoType, productInfo, Store } from "../utils/Store";
import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

const cart = () => {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    const removeItemHandler = (item: productInfo) => {
        dispatch({
            type: ProductCartInfoType.CART_REMOVE_ITEM,
            payload: { cartItems: item },
        });
    };

    return (
        <Layout title="Shopping Cart">
            <>
                <h1 className="mb-4 text-xl font-bold">Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <div>
                        Cart is empty. <Link href="/">Go Shopping</Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-4 md:gap-5">
                        <div className="overflow-x-auto md:col-span-3">
                            <table className="min-w-full">
                                <thead className="border-b">
                                    <tr>
                                        <th className="p-5 text-left">Item</th>
                                        <th className="p-5 text-right">Quantity</th>
                                        <th className="p-5 text-right">Price</th>
                                        <th className="p-5">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => {
                                        return (
                                            <tr key={item.slug} className="border-b">
                                                <td>
                                                    <Link href={`/product/${item.slug}`}>
                                                        <a className="flex items-center">
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                width={50}
                                                                height={50}
                                                            ></Image>
                                                            &nbsp;
                                                            {item.name}
                                                        </a>
                                                    </Link>
                                                </td>
                                                <td className="p-5 text-right">{item.quantity}</td>
                                                <td className="p-5 text-right">${item.price}</td>
                                                <td className="p-5 text-center">
                                                    <button onClick={() => removeItemHandler(item)}>
                                                        <XCircleIcon className="h-5 w-5"></XCircleIcon>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="card p-5">
                            <ul>
                                <li>
                                    <div className="pb-3 text-xl">
                                        Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : ${" "}
                                        {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                                    </div>
                                </li>
                                <li>
                                    <button onClick={() => router.push("/shipping")} className="primary-button w-full">
                                        Check Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </>
        </Layout>
    );
};

export default cart;

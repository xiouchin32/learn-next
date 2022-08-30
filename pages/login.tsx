import Link from "next/link";
import React, { Component } from "react";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";

interface MyInputTypes {
    email: string;
    password: string;
}

const LoginScreen = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<MyInputTypes>({
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const submitHandler = ({ email, password }: MyInputTypes) => {};

    return (
        <Layout title="Login">
            <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(submitHandler)}>
                <h1 className="mb-4 text-xl">Login</h1>
                <div className="mb-4">
                    <label className="mb-4" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        {...register("email", {
                            required: "Please enter email",
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                message: "Please enter valid email",
                            },
                        })}
                        className="w-full"
                        id="email"
                        autoFocus
                    ></input>
                    {errors.email && <div className="text-red-500">{errors.email.message}</div>}
                </div>
                <div className="mb-4">
                    <label className="mb-4" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Please enter password",
                            minLength: { value: 6, message: "password is more than 5 chars" },
                        })}
                        className="w-full"
                        id="password"
                        autoFocus
                    />
                    {errors.password && <div className="text-red-500 ">{errors.password.message}</div>}
                </div>
                <div className="mb-4">
                    <button className="primary-button">Login</button>
                </div>
                <div className="mb-4">
                    Don't have an account? &nbsp;
                    <Link href="register">Register</Link>
                </div>
            </form>
        </Layout>
    );
};

export default LoginScreen;

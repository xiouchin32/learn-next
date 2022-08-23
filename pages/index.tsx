import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import styles from "../styles/Home.module.css";
import data from "../utils/data";

const Home: NextPage = () => {
    return (
        <Layout title="Home Page">
            <div className="grid grid-cols-1 gap-4 md:grid-clos-3 lg:grid-cols-4">
                {data.products.map((product) => (
                    <ProductItem product={product} key={product.slug}></ProductItem>
                ))}
            </div>
        </Layout>
    );
};

export default Home;

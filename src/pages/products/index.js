import axios from "axios";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get("/api/products")
            .then((res) => {
                setProducts(res.data.products);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    const productsView = (
        <>
            <h1 className="text-2xl font-bold mb-4">Products</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    );

    return (
        <Layout>
            <div className="container mx-auto">
                {products.length ? (
                    productsView
                ) : (
                    <h2 className="text-2xl font-bold text-center">
                        No Products Founded
                    </h2>
                )}
            </div>
        </Layout>
    );
};

export default Products;

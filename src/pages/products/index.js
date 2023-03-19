import axios from "axios";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import ProductCard from "@/components/products/ProductCard";
import { useEffect, useState } from "react";
import { setProducts } from "@/store/products.slice";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const productsData = useSelector((state) => state.productsData);

    useEffect(() => {
        axios
            .get("/api/products")
            .then((res) => {
                dispatch(setProducts(res.data.products));
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err.response);
                setIsLoading(false);
            });
    }, [dispatch]);

    const productsView = (
        <>
            <h1 className="text-2xl font-bold mb-4">Products</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {productsData.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    );

    const pageView = productsData.products.length ? (
        productsView
    ) : (
        <h2 className="text-2xl font-bold text-center">No Products Founded</h2>
    );

    return (
        <Layout>
            <div className="container mx-auto">
                {isLoading ? <Loader /> : pageView}
            </div>
        </Layout>
    );
};

export default Products;

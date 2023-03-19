import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Product = () => {
    const router = useRouter();
    const { pid } = router.query;
    const fakeImg = "https://placehold.co/160";

    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!pid) return;

        axios
            .get("/api/products/" + pid)
            .then((res) => {
                setProduct(res.data.product);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [pid]);

    const ImagesView =
        !isLoading && product.images.length ? (
            product.images.map((image) => (
                <Image
                    key={image.id}
                    priority
                    unoptimized
                    loader={() => image.image_path}
                    src={image.image_path}
                    alt={product.name}
                    height={160}
                    width={160}
                />
            ))
        ) : (
            <Image
                priority
                unoptimized
                loader={() => fakeImg}
                src={fakeImg}
                alt={product.name}
                height={160}
                width={160}
            />
        );

    const productView = (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ImagesView}
            </div>

            <div className="mt-4 font-bold text-xl uppercase text-gray-600">
                {product.name}
            </div>

            <div className="mt-2 font-bold text-2xl text-green-500">
                ${product.price}
            </div>
        </div>
    );

    return <Layout>{isLoading ? <Loader /> : productView}</Layout>;
};

export default Product;

import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import ProductImage from "@/components/products/ProductImage";
import AddImagesModal from "@/components/products/AddImagesModal";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

const Product = () => {
    const router = useRouter();
    const { pid } = router.query;
    const fakeImg = "https://placehold.co/160";
    const productsData = useSelector((state) => state.productsData);

    const [product, setProduct] = useState({});
    const [initial, setInitial] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [hoveredImageIndex, setHoveredImageIndex] = useState(-1);
    const [isAddImagesModalOpen, setIsAddImagesModalOpen] = useState(false);

    useEffect(() => {
        if (!pid) return;

        if (initial) {
            fetchData();
            setInitial(false);
        } else {
            let updatedProduct = productsData.products.find((product) => {
                return product.id == pid;
            });

            if (updatedProduct) setProduct(updatedProduct);
        }

        function fetchData() {
            axios
                .get("/api/products/" + pid)
                .then((res) => {
                    setProduct(res.data.product);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err.response);
                });
        }
    }, [pid, initial, productsData]);

    const handleAddImagesClick = () => {
        setIsAddImagesModalOpen(true);
    };

    const handleAddImagesModalClose = () => {
        setIsAddImagesModalOpen(false);
    };

    const handleDeleteProductImage = (imageId, index) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this image!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete("/api/products/images/" + imageId)
                    .then((res) => {
                        Swal.fire({
                            title: "Image deleted successfully!",
                            showConfirmButton: false,
                            icon: "success",
                            timer: 2000,
                        });

                        product.images.splice(index, 1);
                    })
                    .catch((err) => {
                        console.log(err.response);
                    });
            }
        });
    };

    const ImagesView =
        !isLoading && product.images.length ? (
            product.images.map((image, index) => (
                <ProductImage
                    key={image.id}
                    imgSrc={image.image_path}
                    productName={product.name}
                    isHovering={index === hoveredImageIndex}
                    onMouseLeave={() => setHoveredImageIndex(-1)}
                    onMouseEnter={() => setHoveredImageIndex(index)}
                    onDeleteProductImage={() =>
                        handleDeleteProductImage(image.id, index)
                    }
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

    const AddImagesView = (
        <>
            <button
                onClick={handleAddImagesClick}
                className="absolute top-20 right-10 m-2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
            >
                <ArrowUpTrayIcon className="h-6 w-6" />
            </button>

            <AddImagesModal
                productId={product.id}
                isOpen={isAddImagesModalOpen}
                onClose={handleAddImagesModalClose}
            />
        </>
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

            {AddImagesView}
        </div>
    );

    return <Layout>{isLoading ? <Loader /> : productView}</Layout>;
};

export default Product;

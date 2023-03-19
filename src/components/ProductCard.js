import Link from "next/link";
import Image from "next/image";

const ProductCard = ({ product }) => {
    const imgSrc = product.images.length
        ? product.images[0].image_path
        : "https://placehold.co/160";

    return (
        <div className="bg-white rounded-md overflow-hidden shadow-md flex content-center items-center">
            <Image
                priority
                unoptimized
                loader={() => imgSrc}
                src={imgSrc}
                alt={product.name}
                width={160}
                height={160}
            />

            <div className="p-4">
                <Link
                    href={"/products/" + product.id}
                    className="text-lg font-medium uppercase text-gray-600"
                >
                    {product.name}
                </Link>

                <h4 className="text-xl font-medium text-green-500">
                    ${product.price}
                </h4>
            </div>
        </div>
    );
};

export default ProductCard;

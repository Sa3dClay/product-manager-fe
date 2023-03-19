import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/solid";

const ProductImage = ({
    imgSrc,
    isHovering,
    productName,
    onMouseEnter,
    onMouseLeave,
    onDeleteProductImage,
}) => {
    return (
        <div
            className="relative overflow-hidden shadow-md"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <Image
                priority
                unoptimized
                loader={() => imgSrc}
                alt={productName}
                src={imgSrc}
                height={160}
                width={160}
            />
            {isHovering && (
                <div className="absolute top-0 left-0 p-4 bg-black bg-opacity-50 flex items-center justify-center">
                    <TrashIcon
                        className="h-6 w-6 text-white cursor-pointer hover:text-red-500 transition"
                        onClick={onDeleteProductImage}
                    />
                </div>
            )}
        </div>
    );
};

export default ProductImage;

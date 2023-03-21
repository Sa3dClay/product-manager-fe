import axios from "axios";
import Modal from "../Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProduct } from "@/store/products.slice";

const EditProductModal = ({
    isOpen,
    onClose,
    productId,
    productName,
    productPrice,
}) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(productName);
    const [price, setPrice] = useState(productPrice);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .patch("/api/products/" + productId, { name, price })
            .then((res) => {
                dispatch(
                    updateProduct({
                        id: productId,
                        updatedProduct: res.data.product,
                    })
                );
            })
            .catch((err) => {
                console.log(err.response);
            });

        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-lg font-medium mb-4">Edit Product</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-400 p-2 w-full"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="price"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="border border-gray-400 p-2 w-full"
                            required
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-gray-500 text-white rounded-md px-4 py-2 mr-2"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-500 text-white rounded-md px-4 py-2"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default EditProductModal;

import axios from "axios";
import Modal from "../Modal";
import { useRouter } from "next/router";

const AddImagesModal = ({ isOpen, onClose, productId }) => {
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        formData.append("product_id", productId);

        axios
            .post("/api/products/images/add", formData)
            .then((res) => {
                // TODO: sync products slice with product update
            })
            .catch((err) => {
                console.log(err.response);
            });

        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-lg font-medium mb-4">Add Image</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="images"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Image URL:
                        </label>
                        <input
                            type="file"
                            id="images"
                            name="images[]"
                            multiple
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
                            Add Image
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddImagesModal;

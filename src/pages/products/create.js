import axios from "axios";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

const NewProductForm = () => {
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        axios
            .post("/api/products/create", formData)
            .then((res) => {
                console.log(res);

                form.reset();

                router.push("/products");
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    return (
        <Layout>
            <form onSubmit={handleSubmit} className="lg:px-80 md:px-60">
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="price"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="images"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Images
                    </label>
                    <input
                        type="file"
                        id="images"
                        name="images[]"
                        multiple
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex">
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </Layout>
    );
};

export default NewProductForm;

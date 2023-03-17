import Head from "next/head";
const { default: Navbar } = require("./Navbar");

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Product Manager</title>
                <meta
                    name="description"
                    content="Manage your own product"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            {children}
        </>
    );
};

export default Layout;

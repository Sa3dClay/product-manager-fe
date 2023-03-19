import axios from "axios";
import Head from "next/head";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { userDataActions } from "@/store/user.slice";
import { useDispatch, useSelector } from "react-redux";

const Layout = ({ children }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData);

    useEffect(() => {
        if (userData.token) return;

        let user = localStorage.user,
            token = localStorage.token;

        if (!token || !user) {
            router.push("/login");
        } else {
            dispatch(userDataActions.setUser(JSON.parse(user)));
            dispatch(userDataActions.setToken(JSON.parse(token)));

            axios.defaults.baseURL = "http://127.0.0.1:8000";
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${JSON.parse(token)}`;
        }
    }, [userData, router, dispatch]);

    return (
        <>
            <Head>
                <title>Product Manager</title>
                <meta name="description" content="Manage your own product" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            <div className="my-4">{children}</div>
        </>
    );
};

export default Layout;

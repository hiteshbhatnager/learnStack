import React from "react";
import { Outlet } from "react-router";
import { Nav, Footer } from "./components";

function Layout() {
    return (
        <>
            <Nav />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout;
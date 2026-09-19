import { Outlet } from "react-router";
import { Nav, Footer } from "./components";

function Layout({ context }) {
    return (
        <div className="min-h-screen flex flex-col bg-background text-text-primary">
            <Nav />
            <main className="flex-1 py-6 sm:py-8">
                <Outlet context={context} />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
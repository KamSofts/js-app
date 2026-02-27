import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppMenu from "./compos/AppMenu";
import Register from "./compos/Register";
import Login from "./compos/Login";
import Profile from "./compos/Profile";
import Dashboard from "./compos/mdi/Dashboard";
import { useAccess } from "./utils/AccessContext";
import AllowAccess from './utils/AllowAccess';

export default function App() {

    const { user, fetched } = useAccess();

    return (
        <BrowserRouter>
            <AppMenu />
            <Routes>

                <Route path="/" element={<Navigate to="/mdi/dashboard" />} />
                <Route path="/login" element={user ? <Navigate to="/mdi/dashboard" /> : <Login />} />
                <Route path="/register" element={<Register />} />

                {/* <Route path="/mdi/dashboard" element={<Dashboard />} /> */}
                <Route element={<AllowAccess user={user} fetched={fetched} />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/mdi/dashboard" element={<Dashboard />} />
                </Route>

                {/* Catch-all for 404 pages (optional) */}
                <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
        </BrowserRouter>
    )
}
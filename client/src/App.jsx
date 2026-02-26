import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppMenu from "./compos/AppMenu";
import Register from "./compos/Register";
import Login from "./compos/Login";


export default function App() {
    return (
        <BrowserRouter>
            <AppMenu />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                
                {/* Catch-all for 404 pages (optional) */}
                <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
        </BrowserRouter>
    )
}
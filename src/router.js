import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Register from "./pages/register";
import Admin from "./pages/admin/Admin";
import Private from "./private";

function RouteApp(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<Private><Admin/></Private>} />

                
            </Routes>
        
        </BrowserRouter>
    )
}

export default RouteApp;
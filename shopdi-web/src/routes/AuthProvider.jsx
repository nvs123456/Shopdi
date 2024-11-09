import { useState,useContext, createContext } from "react";
const AuthContext = createContext();
import { useNavigate } from "react-router-dom";
import GET from "../api/GET";
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();
    const loginAction = async (data) => {
        console.log(data);
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();
            if (res.result) {
                setUser(data.username);
                setToken(res.result.token);
                localStorage.setItem("site", res.result.token);
                // console.log(GET("users/my-info"));
                localStorage.setItem("role", 'BUYER');
                if(localStorage.getItem("role") === "BUYER"){
                    console.log('role :',res.role);
                    navigate("/");
                }else if(localStorage.getItem("role") === "SELLER"){
                    navigate("/seller/");
                }
                return;
            }
            throw new Error(res.message);
        } catch (err) {
            console.error(err);
        }
    };
    const logOut = () => {
        console.log("logout");
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        localStorage.removeItem("role");
        navigate("/login");
    };
    return <AuthContext.Provider value={{ user, token, loginAction, logOut }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
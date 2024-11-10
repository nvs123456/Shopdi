import { useState,useContext, createContext } from "react";
const AuthContext = createContext();
import { useNavigate } from "react-router-dom";
import {useCookies} from 'react-cookie'
import GET from "../api/GET";
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(['Authorization']);
    const navigate = useNavigate();
    const loginAction = async (data) => {
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();
            if (res.result) {
                // console.log("res : ",res)
                setCookie('Authorization', `Bearer ${res.result.token}`, { path: '/' });
                setToken(res.result.token);
                // console.log(token)
                // console.log(cookies.Authorization)
                let tmp = await GET(`users/my-info`,`Bearer ${res.result.token}`)
                setUser(tmp.result?.username);
                navigate("/");
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
        removeCookie('Authorization', { path: '/' });
        navigate("/login");
    };
    return <AuthContext.Provider value={{ user, token, loginAction, logOut }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
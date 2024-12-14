import Loading from "@/components/bar/loading";
import {  getMeStaff } from "@/services/user-service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const withAuthAdmin = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
        const navigate = useNavigate();
        const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); 

        const checkUser = async () => {
            try {
                const data = await getMeStaff();
                if (!data) {
                    navigate("/"); 
                }
                setIsAuthenticated(true);
            } catch (error) {
                navigate("/"); 
            }
        };

        useEffect(() => {
            checkUser();
        }, [navigate]);

        if (!isAuthenticated) {
            return <Loading />; 
        }

        return isAuthenticated ? <WrappedComponent {...props} /> : null;
    };
};

export const withAuth = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
        const navigate = useNavigate();
        const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); 

        const checkUser = () => {
            const token = localStorage.getItem("accessToken") || "";
            if(token)
            {
                setIsAuthenticated(true)
            }else{
                navigate("/account/login");
            }
        };

        useEffect(() => {
            checkUser();
        }, [navigate]);

        if (!isAuthenticated) {
            return <Loading />; 
        }

        return isAuthenticated ? <WrappedComponent {...props} /> : null;
    };
};






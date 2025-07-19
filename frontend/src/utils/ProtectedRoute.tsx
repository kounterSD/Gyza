import { Navigate } from 'react-router-dom';
import type {ReactNode} from "react";
import { useUser } from "../contexts/UserContext.tsx";

type ProtectedRouteProps = {
    children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isLoggedIn } = useUser();

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
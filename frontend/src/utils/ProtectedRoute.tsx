import { Navigate } from 'react-router-dom';
import type {User} from "../contexts/UserContext.tsx";
import type {ReactNode} from "react";

type ProtectedRouteProps = {
    user: User | null;
    children: ReactNode;
};

export const ProtectedRoute = ({ user, children }: ProtectedRouteProps) => {
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
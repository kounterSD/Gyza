import {createContext, useContext, useState, type ReactNode} from 'react';
import {api} from "../utils/axios.tsx";

export interface User{
    id: string;
    username: string;
    email: string;
}

interface UserContextProps{
    user: User | null;
    isLoggedIn: boolean;
    login: (user: User) => void;
    logout: () => void;
}
export const UserContext = createContext<UserContextProps | undefined>(undefined);

export function UserProvider ({children}: {children: ReactNode}){
    const [user, setUser] = useState<User | null>(null);

    const login = (user: User) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    }

    const logout = async () => {
        // requests /users/logout/ to clear refresh_token cookie.
        const response = await api.post('/users/logout/', {}, {withCredentials:true})
        console.log(response.data);

        // Clear localStorage
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('access');
    }
    const isLoggedIn = !!user;


    return (
        <UserContext.Provider value={{user, isLoggedIn, login, logout}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if(!context){
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
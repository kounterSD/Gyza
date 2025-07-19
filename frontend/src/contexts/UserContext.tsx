import {createContext, useContext, useState, type ReactNode, useEffect} from 'react';
import {api} from "../utils/axios.tsx";

export interface User{
    id: string;
    username: string;
    email: string;
    pfp: string;
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

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (user: User) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    }

    const logout = async () => {
        try{
            // requests /users/logout/ to clear refresh_token cookie.
            const response = await api.post('/users/logout/', {}, {withCredentials:true})
            console.log(response.data);

            // Clear localStorage
            setUser(null);
            localStorage.removeItem('user');
            localStorage.removeItem('access');
        }catch (error){
            // when refresh_token is expired, the API call fails, we still want to delete localStorage data
            console.error('Logout API call failed:', error);
            setUser(null);
            localStorage.removeItem('user');
            localStorage.removeItem('access');
        }

    }
    const isLoggedIn = !!localStorage.getItem('user') || !!user;

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
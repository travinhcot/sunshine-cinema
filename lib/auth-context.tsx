'use client'

import React, {createContext, useContext, useState, useEffect} from "react";

interface User{
    id:string,
    username:string,
    email:string
}

interface AuthContextType{
    user: User | null; 
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (username:string, email:string, password:string) => Promise<void>;
    logout: () => void;
}


const AuthContext= createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if(savedToken){
        setToken(savedToken)
        fetchUser(savedToken);
    }else{
        setLoading(false);
    }
}, []);

    const fetchUser = async (authToken:string) => {
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`,{
                headers:{Authorization: `Bearer ${authToken}`},

            });
            if(res.ok){
                const userData = await res.json();
                setUser(userData);
            }
        }catch(error){
            console.error('[FAILED] Failed to fetch user', error)
        }finally{
            setLoading(false);
        }
    };


    const login = async (email:string, password:string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL/auth/login}`, {
            method: 'POST',
            headers: {'Content Type':'application/json'},
            body: JSON.stringify({email, password}), 
        });
        if(!res.ok){
            throw new Error('Login failed');
        }
        const data = await res.json();
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
    };

    const register = async (username: string, email:string, password:string) =>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
            method: 'POST',
            headers: {'Content Type' : 'application/json'}, 
            body: JSON.stringify({username, email, password}),
        })

        if(!res.ok){
            throw new Error('Registration failed');
        }

        const data = await res.json();
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
    }
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    }
    return (
        <AuthContext.Provider value={{user, token, loading, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be within AuthProvider')
    }
    return context;
};




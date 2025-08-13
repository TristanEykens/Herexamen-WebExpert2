import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

interface User {
    name: string;
}

interface AuthContextType {
    user: User | null;
    login: (name: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_DB = [
    { name: 'Alice', password: '123' },
    { name: 'Bob', password: '456' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const isWeb = Platform.OS === 'web';

    const setItemAsync = async (key: string, value: string) => {
        if (isWeb) {
            localStorage.setItem(key, value);
        } else {
            await SecureStore.setItemAsync(key, value);
        }
    };

    const getItemAsync = async (key: string) => {
        if (isWeb) {
            return localStorage.getItem(key);
        } else {
            return await SecureStore.getItemAsync(key);
        }
    };

    const deleteItemAsync = async (key: string) => {
        if (isWeb) {
            localStorage.removeItem(key);
        } else {
            await SecureStore.deleteItemAsync(key);
        }
    };

    const login = async (name: string, password: string) => {
        const found = USERS_DB.find(u => u.name === name && u.password === password);
        if (found) {
            setUser({ name: found.name });
            await setItemAsync('user', JSON.stringify({ name: found.name }));
            return true;
        }
        return false;
    };

    const logout = async () => {
        setUser(null);
        await deleteItemAsync('user');
    };

    useEffect(() => {
        const loadUser = async () => {
            const stored = await getItemAsync('user');
            if (stored) setUser(JSON.parse(stored));
        };
        loadUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
'use client';

import { Stack } from 'expo-router';
import { AuthProvider } from './context/AuthContext';

export default function RootLayout() {
    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="tabs" options={{ headerShown: false }} />
                <Stack.Screen name="product/[id]" options={{ title: 'Product Details' }} />
                <Stack.Screen name="login" options={{ title: 'Login' }} />
            </Stack>
        </AuthProvider>
    );
}
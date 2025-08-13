import { useEffect, useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, Alert, Text, Pressable, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';

export default function ProductsScreen() {
    const [products, setProducts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();

    const STORAGE_KEY = 'cached_products';

    const loadCachedProducts = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
            if (jsonValue != null) setProducts(JSON.parse(jsonValue));
        } catch (e) {
            console.error('Error loading cached products', e);
        }
    };

    const fetchProducts = async () => {
        try {
            const fetchedProducts = [
                { id: 1, name: 'Laptop', price: 999, category: 'Electronics', image: 'https://picsum.photos/200?random=1' },
                { id: 2, name: 'Smartphone', price: 799, category: 'Electronics', image: 'https://picsum.photos/200?random=2' },
                { id: 3, name: 'Headphones', price: 199, category: 'Audio', image: 'https://picsum.photos/200?random=3' },
                { id: 4, name: 'Coffee Mug', price: 15, category: 'Home', image: 'https://picsum.photos/200?random=4' },
                { id: 5, name: 'Backpack', price: 49, category: 'Accessories', image: 'https://picsum.photos/200?random=5' },
                { id: 6, name: 'Sneakers', price: 120, category: 'Footwear', image: 'https://picsum.photos/200?random=6' },
                { id: 7, name: 'Smartwatch', price: 250, category: 'Wearables', image: 'https://picsum.photos/200?random=7' },
                { id: 8, name: 'Desk Lamp', price: 35, category: 'Home', image: 'https://picsum.photos/200?random=8' },
                { id: 9, name: 'Gaming Chair', price: 350, category: 'Furniture', image: 'https://picsum.photos/200?random=9' },
                { id: 10, name: 'Bluetooth Speaker', price: 89, category: 'Audio', image: 'https://picsum.photos/200?random=10' },
            ];
            setProducts(fetchedProducts);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(fetchedProducts));
        } catch (e) {
            Alert.alert('Error', 'Failed to load products.');
            console.error(e);
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchProducts();
        setRefreshing(false);
    }, []);

    useEffect(() => {
        loadCachedProducts();
        fetchProducts();
    }, []);

    const renderItem = ({ item, index }) => (
        <Animatable.View
            animation="fadeInUp"
            duration={600}
            delay={index * 100}
            useNativeDriver
        >
            <Pressable
                onPress={() => router.push(`/product/${item.id}`)}
                style={({ pressed }) => [
                    styles.card,
                    { opacity: pressed ? 0.7 : 1 },
                ]}
            >
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.info}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.category}>{item.category}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                </View>
            </Pressable>
        </Animatable.View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 16 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f2f5',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 3,
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 2 },
    category: { fontSize: 14, color: '#555', marginBottom: 4 },
    price: { fontSize: 16, fontWeight: '600', color: '#03dac6' },
});
// app/(tabs)/product/[id].tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';

const PRODUCTS = [
    { id: '1', name: 'Laptop', category: 'Electronics', price: 999, image: 'https://source.unsplash.com/400x300/?laptop', description: 'A high-performance laptop perfect for work and gaming.' },
    { id: '2', name: 'Smartphone', category: 'Electronics', price: 799, image: 'https://source.unsplash.com/400x300/?smartphone', description: 'Latest generation smartphone with amazing camera.' },
    { id: '3', name: 'Headphones', category: 'Audio', price: 199, image: 'https://source.unsplash.com/400x300/?headphones', description: 'Comfortable and high-quality sound headphones.' },
    { id: '4', name: 'Coffee Maker', category: 'Appliances', price: 149, image: 'https://source.unsplash.com/400x300/?coffee', description: 'Brew the perfect cup every morning.' },
    { id: '5', name: 'Backpack', category: 'Accessories', price: 89, image: 'https://source.unsplash.com/400x300/?backpack', description: 'Durable backpack with lots of compartments.' },
];

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const product = PRODUCTS.find(p => p.id === id);

    if (!product) {
        return (
            <View style={styles.center}>
                <Text>Product not found.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Animatable.View animation="fadeInUp" duration={800} style={styles.card}>
                {/* Zoom-in animation for the image */}
                <Animatable.Image
                    animation="zoomIn"
                    duration={800}
                    delay={200}
                    source={{ uri: product.image }}
                    style={styles.image}
                />
                <View style={styles.info}>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.category}>{product.category}</Text>
                    <Text style={styles.price}>${product.price}</Text>
                    <Text style={styles.description}>{product.description}</Text>
                </View>
                <Pressable style={styles.backButton} onPress={() => router.push('/(tabs)/products')}>
                    <Text style={styles.backText}>← Back to Products</Text>
                </Pressable>
            </Animatable.View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        width: '100%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: 250,
    },
    info: {
        padding: 16,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    category: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 8,
    },
    price: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: '#333',
    },
    backButton: {
        padding: 16,
        backgroundColor: '#03dac6',
        alignItems: 'center',
    },
    backText: {
        fontWeight: 'bold',
        color: '#000',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

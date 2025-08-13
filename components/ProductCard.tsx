// app/components/ProductCard.tsx
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    onPress: () => void;
}

export function ProductCard({ id, name, price, onPress }: ProductCardProps) {
    return (
        <Animated.View entering={FadeInDown.delay(id * 100)}>
            <TouchableOpacity style={styles.card} onPress={onPress}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.price}>${price}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        marginBottom: 10,
    },
    title: { fontSize: 18, fontWeight: 'bold' },
    price: { fontSize: 16, color: 'gray' },
});
// components/AnimatedScreen.tsx
import React, { ReactNode, useEffect } from "react";
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";
import { ViewStyle } from "react-native";

interface AnimatedScreenProps {
    children: ReactNode;
}

export default function AnimatedScreen({ children }: AnimatedScreenProps) {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(20);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 500 });
        translateY.value = withTiming(0, { duration: 500 });
    }, []);

    const animatedStyle = useAnimatedStyle<ViewStyle>(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    return <Animated.View style={[{ flex: 1 }, animatedStyle]}>{children}</Animated.View>;
}
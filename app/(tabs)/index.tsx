// app/tabs/index.tsx
import { useState, useRef, useEffect } from 'react';
import { View, Button, StyleSheet, Share, Alert, Pressable, Platform, Text } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

// Import the FadeInMessage component
import FadeInMessage from '../../components/FadeInMessage';

export default function HomeScreen() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [cameraOpen, setCameraOpen] = useState(false);

    const cameraRef = useRef<Camera | null>(null);
    const [webStream, setWebStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    // Animation 2: scaling button
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    // Request camera permission
    const requestPermission = async () => {
        if (Platform.OS === 'web') {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                setWebStream(stream);
                setCameraOpen(true);
                setHasPermission(true);
            } catch (err) {
                console.error(err);
                Alert.alert('Permission denied', 'Camera access is required.');
                setHasPermission(false);
            }
            return;
        }

        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        if (status === 'granted') setCameraOpen(true);
        else Alert.alert('Permission denied', 'Camera access is required.');
    };

    // Attach web camera stream
    useEffect(() => {
        if (Platform.OS === 'web' && videoRef.current && webStream) {
            videoRef.current.srcObject = webStream;
            videoRef.current.play().catch(console.error);
        }
    }, [webStream]);

    // Take picture
    const takePicture = async () => {
        if (Platform.OS === 'web') {
            if (!videoRef.current) return;
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/png');
            Alert.alert('Photo taken!', dataUrl);
        } else {
            if (cameraRef.current) {
                const photo = await cameraRef.current.takePictureAsync();
                Alert.alert('Photo taken!', photo.uri);
            }
        }
    };

    // Share app
    const shareApp = async () => {
        try {
            await Share.share({
                message: 'Check out this awesome Expo Router app! 🚀',
            });
        } catch (error) {
            Alert.alert('Error', 'Could not share content.');
        }
    };

    // Mobile camera view
    if (cameraOpen && hasPermission && Platform.OS !== 'web') {
        return (
            <Camera style={styles.camera} type={CameraType.back} ref={cameraRef}>
                <View style={styles.buttonRow}>
                    <Button title="Take Picture" onPress={takePicture} />
                    <Button title="Close Camera" onPress={() => setCameraOpen(false)} />
                </View>
            </Camera>
        );
    }

    // Web camera view
    if (cameraOpen && Platform.OS === 'web') {
        return (
            <View style={styles.container}>
                {webStream ? (
                    <video ref={videoRef} style={styles.webCamera} />
                ) : (
                    <Text>Loading camera...</Text>
                )}
                <View style={{ marginTop: 16, flexDirection: 'row', gap: 10 }}>
                    <Button title="Take Picture" onPress={takePicture} />
                    <Button
                        title="Close Camera"
                        onPress={() => {
                            setCameraOpen(false);
                            webStream?.getTracks().forEach(track => track.stop());
                            setWebStream(null);
                        }}
                    />
                </View>
            </View>
        );
    }

    // Default home screen with animations
    return (
        <View style={styles.container}>
            <FadeInMessage />
            <Pressable
                onPressIn={() => (scale.value = withSpring(1.1))}
                onPressOut={() => (scale.value = withSpring(1))}
                onPress={requestPermission}
            >
                <Animated.View style={[styles.buttonWrapper, animatedStyle]}>
                    <Button title="Open Camera" onPress={requestPermission} />
                </Animated.View>
            </Pressable>
            <View style={{ height: 20 }} />
            <Button title="Share App" onPress={shareApp} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
    camera: { flex: 1, width: '100%' },
    webCamera: { width: 640, height: 480, backgroundColor: 'black' },
    buttonRow: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonWrapper: { borderRadius: 8, overflow: 'hidden' },
});
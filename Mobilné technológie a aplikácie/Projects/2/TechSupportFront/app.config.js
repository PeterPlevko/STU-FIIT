export default {
    plugins: [
        [
            "@config-plugins/react-native-webrtc",
            {
                cameraPermission: "Allow ME to access your camera",
                microphonePermission: "Allow ME to access your microphone",
            },
        ],
    ],
    "android": {
        "package": "com.mtaa.techsupport"
    }
};
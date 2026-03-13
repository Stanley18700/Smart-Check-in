import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ScrollView,
    SafeAreaView,
    Alert,
    Modal,
    Platform,
} from "react-native";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import * as Location from "expo-location";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function FinishClassScreen({ navigation }) {
    const [step, setStep] = useState(1); // 1=GPS, 2=QR, 3=Form
    const [location, setLocation] = useState(null);
    const [qrData, setQrData] = useState("");
    const [scanning, setScanning] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [studentId, setStudentId] = useState("");
    const [learnedToday, setLearnedToday] = useState("");
    const [feedback, setFeedback] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Auto-navigate home after showing success popup
    React.useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
                navigation.navigate("Home");
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [showSuccess]);

    const getLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission denied", "Location access is required.");
            return;
        }
        const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        setLocation(loc.coords);
        setStep(2);
    };

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setQrData(data);
        setScanning(false);
        setStep(3);
    };

    const startScanning = async () => {
        if (Platform.OS === "web") {
            setStep(3);
            setQrData("WEB-MANUAL-QR-" + Date.now());
            return;
        }
        if (!permission?.granted) {
            const result = await requestPermission();
            if (!result.granted) {
                Alert.alert("Camera permission needed for QR scanning.");
                return;
            }
        }
        setScanned(false);
        setScanning(true);
    };

    const handleSubmit = async () => {
        if (!studentId.trim()) {
            Alert.alert("Required", "Please enter your Student ID.");
            return;
        }
        if (!learnedToday.trim()) {
            Alert.alert("Required", "Please fill in what you learned today.");
            return;
        }
        setLoading(true);
        try {
            await addDoc(collection(db, "checkin_records"), {
                studentId: studentId.trim(),
                type: "checkout",
                timestamp: Timestamp.now(),
                gpsLat: location?.latitude ?? 0,
                gpsLng: location?.longitude ?? 0,
                qrData: qrData,
                learnedToday: learnedToday.trim(),
                feedback: feedback.trim(),
            });
            setShowSuccess(true); // Show success popup
        } catch (e) {
            Alert.alert("Error", "Failed to save: " + e.message);
        }
        setLoading(false);
    };

    // ── Step 1: GPS ───────────────────────────────────────────────
    if (step === 1) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.stepCard}>
                    <Text style={styles.stepLabel}>STEP 1 OF 3</Text>
                    <Text style={styles.stepTitle}>📍 Get End-of-Class Location</Text>
                    <Text style={styles.stepDesc}>
                        We record your GPS location to confirm you were present until the end of class.
                    </Text>
                    {location && (
                        <View style={styles.locationBox}>
                            <Text style={styles.locationText}>Lat: {location.latitude.toFixed(6)}</Text>
                            <Text style={styles.locationText}>Lng: {location.longitude.toFixed(6)}</Text>
                        </View>
                    )}
                    <TouchableOpacity style={styles.primaryBtn} onPress={getLocation}>
                        <Text style={styles.primaryBtnText}>
                            {location ? "📍 Location Captured! Continue" : "📍 Get My Location"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    // ── Step 2: QR Scan ───────────────────────────────────────────
    if (step === 2) {
        return (
            <SafeAreaView style={styles.container}>
                {scanning && Platform.OS !== "web" ? (
                    <View style={styles.cameraContainer}>
                        <CameraView
                            style={StyleSheet.absoluteFillObject}
                            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                        />
                        <View style={styles.scanOverlay}>
                            <View style={styles.scanFrame} />
                            <Text style={styles.scanHint}>Point at End-of-Class QR Code</Text>
                            <TouchableOpacity
                                style={styles.cancelBtn}
                                onPress={() => setScanning(false)}
                            >
                                <Text style={styles.cancelBtnText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={styles.stepCard}>
                        <Text style={styles.stepLabel}>STEP 2 OF 3</Text>
                        <Text style={styles.stepTitle}>📷 Scan End QR Code</Text>
                        <Text style={styles.stepDesc}>
                            Scan the end-of-class QR code from your instructor to confirm class completion.
                        </Text>
                        {qrData ? (
                            <View style={styles.locationBox}>
                                <Text style={styles.locationText}>✅ QR Scanned</Text>
                            </View>
                        ) : null}
                        <TouchableOpacity style={styles.primaryBtn} onPress={startScanning}>
                            <Text style={styles.primaryBtnText}>
                                {qrData ? "✅ Scanned" : "📷 Scan QR Code"}
                            </Text>
                        </TouchableOpacity>
                        {qrData ? (
                            <TouchableOpacity style={styles.secondaryBtn} onPress={() => setStep(3)}>
                                <Text style={styles.secondaryBtnText}>Next →</Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>
                )}
            </SafeAreaView>
        );
    }

    // ── Step 3: Learning Reflection Form ─────────────────────────
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.stepCard}>
                    <Text style={styles.stepLabel}>STEP 3 OF 3</Text>
                    <Text style={styles.stepTitle}>🎓 Learning Reflection</Text>

                    <Text style={styles.label}>Student ID *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. 6510000000"
                        placeholderTextColor="#94A3B8"
                        value={studentId}
                        onChangeText={setStudentId}
                    />

                    <Text style={styles.label}>What did you learn today? *</Text>
                    <TextInput
                        style={[styles.input, styles.multiline]}
                        placeholder="Summarize the key concepts you learned in this class..."
                        placeholderTextColor="#94A3B8"
                        value={learnedToday}
                        onChangeText={setLearnedToday}
                        multiline
                        numberOfLines={4}
                    />

                    <Text style={styles.label}>Feedback about the class / instructor:</Text>
                    <TextInput
                        style={[styles.input, styles.multiline]}
                        placeholder="Any suggestions or feedback? (optional)"
                        placeholderTextColor="#94A3B8"
                        value={feedback}
                        onChangeText={setFeedback}
                        multiline
                        numberOfLines={3}
                    />

                    <TouchableOpacity
                        style={[styles.primaryBtn, loading && styles.disabledBtn]}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        <Text style={styles.primaryBtnText}>
                            {loading ? "Saving..." : "🎓 Finish & Submit"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Modal visible={showSuccess} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalIcon}>🎓</Text>
                        <Text style={styles.modalTitle}>Class Finished!</Text>
                        <Text style={styles.modalText}>Your reflection has been saved successfully.</Text>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8FAFC" },
    scrollContent: { flexGrow: 1, padding: 20 },
    stepCard: {
        flex: 1,
        padding: 24,
        marginVertical: 12,
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    stepLabel: { color: "#F59E0B", fontWeight: "800", fontSize: 13, letterSpacing: 1.5, marginBottom: 8 },
    stepTitle: { color: "#1E3A8A", fontSize: 26, fontWeight: "900", marginBottom: 16, letterSpacing: -0.5 },
    stepDesc: { color: "#475569", fontSize: 16, lineHeight: 24, marginBottom: 24 },
    locationBox: {
        backgroundColor: "#F1F5F9",
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    locationText: { color: "#334155", fontSize: 14, fontFamily: "monospace", marginVertical: 2 },
    label: { color: "#1E293B", fontSize: 15, fontWeight: "700", marginBottom: 8, marginTop: 24 },
    input: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#CBD5E1",
        color: "#1E293B",
        padding: 14,
        fontSize: 16,
    },
    multiline: { height: 110, textAlignVertical: "top" },
    primaryBtn: {
        backgroundColor: "#FEF3C7", // Light Gold
        borderWidth: 1,
        borderColor: "#FDE68A",
        borderRadius: 16,
        padding: 18,
        alignItems: "center",
        marginTop: 32,
        shadowColor: "#F59E0B",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    primaryBtnText: { color: "#D97706", fontWeight: "800", fontSize: 16 },
    secondaryBtn: {
        borderWidth: 2,
        borderColor: "#F59E0B",
        borderRadius: 16,
        padding: 16,
        alignItems: "center",
        marginTop: 12,
    },
    secondaryBtnText: { color: "#D97706", fontWeight: "700", fontSize: 16 },
    disabledBtn: { opacity: 0.5 },
    cancelBtn: {
        marginTop: 24,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 32,
    },
    cancelBtnText: { color: "#D97706", fontWeight: "800", fontSize: 16 },
    cameraContainer: { flex: 1 },
    scanOverlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
    },
    scanFrame: {
        width: 240,
        height: 240,
        borderWidth: 4,
        borderColor: "#F59E0B",
        borderRadius: 24,
        backgroundColor: "transparent",
    },
    scanHint: {
        color: "#fff",
        fontSize: 16,
        marginTop: 16,
        backgroundColor: "#00000088",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        fontWeight: "600",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(15, 23, 42, 0.7)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#FFFFFF",
        padding: 32,
        borderRadius: 24,
        alignItems: "center",
        width: "80%",
        shadowColor: "#F59E0B",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10,
    },
    modalIcon: { fontSize: 64, marginBottom: 16 },
    modalTitle: { color: "#1E3A8A", fontSize: 24, fontWeight: "900", marginBottom: 8 },
    modalText: { color: "#475569", fontSize: 16, textAlign: "center", lineHeight: 22 },
});

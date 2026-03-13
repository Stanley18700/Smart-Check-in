import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    StatusBar,
} from "react-native";

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0f0f1a" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Hero */}
                <View style={styles.hero}>
                    <Text style={styles.heroIcon}>🎓</Text>
                    <Text style={styles.heroTitle}>Smart Check-in</Text>
                    <Text style={styles.heroSubtitle}>
                        Class Check-in & Learning Reflection App
                    </Text>
                    <View style={styles.heroBadge}>
                        <Text style={styles.heroBadgeText}>Mobile Application Development</Text>
                    </View>
                </View>

                {/* Info Cards */}
                <View style={styles.infoRow}>
                    <View style={styles.infoCard}>
                        <Text style={styles.infoEmoji}>📍</Text>
                        <Text style={styles.infoLabel}>GPS Location</Text>
                    </View>
                    <View style={styles.infoCard}>
                        <Text style={styles.infoEmoji}>📷</Text>
                        <Text style={styles.infoLabel}>QR Scanner</Text>
                    </View>
                    <View style={styles.infoCard}>
                        <Text style={styles.infoEmoji}>☁️</Text>
                        <Text style={styles.infoLabel}>Firebase</Text>
                    </View>
                </View>

                {/* Main Buttons */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>What would you like to do?</Text>

                    <TouchableOpacity
                        style={[styles.mainBtn, styles.checkinBtn]}
                        onPress={() => navigation.navigate("CheckIn")}
                        activeOpacity={0.85}
                    >
                        <View style={styles.btnContent}>
                            <Text style={styles.btnIcon}>✅</Text>
                            <View>
                                <Text style={styles.btnTitle}>Check In</Text>
                                <Text style={styles.btnDesc}>Start class · Record GPS · Scan QR</Text>
                            </View>
                        </View>
                        <Text style={styles.btnArrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.mainBtn, styles.finishBtn]}
                        onPress={() => navigation.navigate("FinishClass")}
                        activeOpacity={0.85}
                    >
                        <View style={styles.btnContent}>
                            <Text style={styles.btnIcon}>🎓</Text>
                            <View>
                                <Text style={[styles.btnTitle, { color: "#000" }]}>Finish Class</Text>
                                <Text style={[styles.btnDesc, { color: "#00000088" }]}>
                                    End class · Reflect · Submit learning
                                </Text>
                            </View>
                        </View>
                        <Text style={[styles.btnArrow, { color: "#000" }]}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.mainBtn, styles.historyBtn]}
                        onPress={() => navigation.navigate("History")}
                        activeOpacity={0.85}
                    >
                        <View style={styles.btnContent}>
                            <Text style={styles.btnIcon}>📋</Text>
                            <View>
                                <Text style={styles.btnTitle}>My Records</Text>
                                <Text style={styles.btnDesc}>View all check-in history</Text>
                            </View>
                        </View>
                        <Text style={styles.btnArrow}>›</Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <Text style={styles.footer}>
                    Powered by Firebase · Built with React Native (Expo)
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0f0f1a" },
    scrollContent: { padding: 16, paddingBottom: 40 },

    hero: { alignItems: "center", paddingVertical: 40 },
    heroIcon: { fontSize: 64, marginBottom: 12 },
    heroTitle: {
        color: "#ffffff",
        fontSize: 34,
        fontWeight: "900",
        letterSpacing: -1,
    },
    heroSubtitle: {
        color: "#aaaacc",
        fontSize: 15,
        textAlign: "center",
        marginTop: 6,
        marginHorizontal: 20,
    },
    heroBadge: {
        marginTop: 14,
        backgroundColor: "#e9456022",
        borderWidth: 1,
        borderColor: "#e9456066",
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 5,
    },
    heroBadgeText: { color: "#e94560", fontSize: 12, fontWeight: "600" },

    infoRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 32 },
    infoCard: {
        flex: 1,
        backgroundColor: "#1a1a2e",
        borderRadius: 14,
        padding: 14,
        alignItems: "center",
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: "#ffffff11",
    },
    infoEmoji: { fontSize: 26, marginBottom: 4 },
    infoLabel: { color: "#aaaacc", fontSize: 12, fontWeight: "600" },

    section: { marginBottom: 24 },
    sectionTitle: {
        color: "#888aaa",
        fontSize: 13,
        fontWeight: "700",
        letterSpacing: 1,
        marginBottom: 14,
        textTransform: "uppercase",
    },

    mainBtn: {
        borderRadius: 18,
        padding: 18,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    checkinBtn: {
        backgroundColor: "#1a1a2e",
        borderWidth: 1.5,
        borderColor: "#e94560",
    },
    finishBtn: { backgroundColor: "#16c79a" },
    historyBtn: {
        backgroundColor: "#1a1a2e",
        borderWidth: 1,
        borderColor: "#4444aa",
    },
    btnContent: { flexDirection: "row", alignItems: "center", gap: 14 },
    btnIcon: { fontSize: 30 },
    btnTitle: { color: "#ffffff", fontSize: 18, fontWeight: "800" },
    btnDesc: { color: "#aaaacc", fontSize: 13, marginTop: 2 },
    btnArrow: { color: "#e94560", fontSize: 28, fontWeight: "300" },

    footer: {
        color: "#444466",
        fontSize: 12,
        textAlign: "center",
        marginTop: 8,
    },
});

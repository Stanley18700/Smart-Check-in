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

export default function WelcomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
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

                <View style={styles.spacer} />

                {/* Get Started Button */}
                <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={() => navigation.navigate("Home")}
                    activeOpacity={0.8}
                >
                    <Text style={styles.primaryBtnText}>Get Started</Text>
                    <Text style={styles.primaryBtnArrow}>→</Text>
                </TouchableOpacity>

                {/* Footer */}
                <Text style={styles.footer}>
                    Powered by Firebase · Built with React Native
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8FAFC" },
    scrollContent: { padding: 24, paddingBottom: 40, flexGrow: 1, justifyContent: "center" },

    hero: { alignItems: "center", paddingVertical: 40 },
    heroIcon: { fontSize: 72, marginBottom: 16 },
    heroTitle: {
        color: "#1E3A8A", // Academic Navy
        fontSize: 36,
        fontWeight: "900",
        letterSpacing: -1,
        textAlign: "center",
    },
    heroSubtitle: {
        color: "#475569", // Slate
        fontSize: 16,
        textAlign: "center",
        marginTop: 8,
        marginHorizontal: 10,
        lineHeight: 24,
    },
    heroBadge: {
        marginTop: 20,
        backgroundColor: "#FEF3C7", // Light Amber/Gold
        borderWidth: 1,
        borderColor: "#F59E0B", // Gold
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 6,
    },
    heroBadgeText: { color: "#D97706", fontSize: 13, fontWeight: "700" },

    infoRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 40 },
    infoCard: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        alignItems: "center",
        marginHorizontal: 6,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    infoEmoji: { fontSize: 28, marginBottom: 8 },
    infoLabel: { color: "#334155", fontSize: 12, fontWeight: "700", textAlign: "center" },

    spacer: { flex: 1, minHeight: 40 },

    primaryBtn: {
        backgroundColor: "#1E3A8A",
        borderRadius: 16,
        paddingVertical: 18,
        paddingHorizontal: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#1E3A8A",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 6,
    },
    primaryBtnText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold", marginRight: 8 },
    primaryBtnArrow: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold" },

    footer: {
        color: "#94A3B8",
        fontSize: 12,
        textAlign: "center",
        marginTop: 30,
        fontWeight: "500",
    },
});

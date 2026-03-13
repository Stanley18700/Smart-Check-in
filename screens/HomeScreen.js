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
            <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.header}>
                    <Text style={styles.greeting}>Welcome back,</Text>
                    <Text style={styles.title}>What would you like to do?</Text>
                </View>

                {/* Main Buttons */}
                <View style={styles.section}>
                    <TouchableOpacity
                        style={[styles.mainBtn, styles.checkinBtn]}
                        onPress={() => navigation.navigate("CheckIn")}
                        activeOpacity={0.8}
                    >
                        <View style={styles.btnContent}>
                            <View style={styles.iconCircle}>
                                <Text style={styles.btnIcon}>✅</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.btnTitle}>Check In to Class</Text>
                                <Text style={styles.btnDesc}>Start class · Record GPS · Scan QR</Text>
                            </View>
                        </View>
                        <Text style={styles.btnArrow}>→</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.mainBtn, styles.finishBtn]}
                        onPress={() => navigation.navigate("FinishClass")}
                        activeOpacity={0.8}
                    >
                        <View style={styles.btnContent}>
                            <View style={[styles.iconCircle, styles.iconCircleDark]}>
                                <Text style={styles.btnIcon}>🎓</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={[styles.btnTitle, { color: "#1E3A8A" }]}>Finish Class</Text>
                                <Text style={styles.btnDescDark}>
                                    End class · Reflect · Submit learning
                                </Text>
                            </View>
                        </View>
                        <Text style={[styles.btnArrow, { color: "#1E3A8A" }]}>→</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.mainBtn, styles.historyBtn]}
                        onPress={() => navigation.navigate("History")}
                        activeOpacity={0.8}
                    >
                        <View style={styles.btnContent}>
                            <View style={[styles.iconCircle, styles.iconCircleLight]}>
                                <Text style={styles.btnIcon}>📋</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={[styles.btnTitle, { color: "#334155" }]}>My Records</Text>
                                <Text style={styles.btnDescDark}>View all check-in history</Text>
                            </View>
                        </View>
                        <Text style={[styles.btnArrow, { color: "#475569" }]}>→</Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <Text style={styles.footer}>
                    Smart Class Check-in System
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8FAFC" },
    scrollContent: { padding: 20, paddingBottom: 40, flexGrow: 1, justifyContent: "center" },

    header: { marginBottom: 32, paddingHorizontal: 4 },
    greeting: { color: "#64748B", fontSize: 16, fontWeight: "600", marginBottom: 4 },
    title: { color: "#1E3A8A", fontSize: 28, fontWeight: "800", letterSpacing: -0.5 },

    section: { marginBottom: 24 },

    mainBtn: {
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },
    checkinBtn: {
        backgroundColor: "#1E3A8A", // Navy Blue
    },
    finishBtn: {
        backgroundColor: "#FEF3C7", // Light Gold
        borderWidth: 1,
        borderColor: "#FDE68A"
    },
    historyBtn: {
        backgroundColor: "#FFFFFF", // White
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    btnContent: { flexDirection: "row", alignItems: "center", gap: 16, flex: 1 },
    textContainer: { flex: 1 },

    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "rgba(255,255,255,0.15)",
        alignItems: "center",
        justifyContent: "center",
    },
    iconCircleDark: {
        backgroundColor: "rgba(245, 158, 11, 0.2)",
    },
    iconCircleLight: {
        backgroundColor: "#F1F5F9",
    },

    btnIcon: {
        fontSize: 24,
        // On iOS emojis in text can sit weirdly, line height helps
        lineHeight: 28,
    },

    btnTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", marginBottom: 4 },
    btnDesc: { color: "#CBD5E1", fontSize: 13, fontWeight: "500" },
    btnDescDark: { color: "#64748B", fontSize: 13, fontWeight: "500" },

    btnArrow: { color: "#FFFFFF", fontSize: 24, fontWeight: "bold" },

    footer: {
        color: "#94A3B8",
        fontSize: 13,
        textAlign: "center",
        marginTop: "auto",
        fontWeight: "500",
    },
});

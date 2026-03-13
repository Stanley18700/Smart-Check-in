import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    RefreshControl,
} from "react-native";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const MOOD_EMOJI = { 1: "😡", 2: "🙁", 3: "😐", 4: "🙂", 5: "😄" };

export default function HistoryScreen() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchRecords = async () => {
        try {
            const q = query(collection(db, "checkin_records"), orderBy("timestamp", "desc"));
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setRecords(data);
        } catch (e) {
            console.error("Error fetching records:", e);
        }
        setLoading(false);
        setRefreshing(false);
    };

    useEffect(() => { fetchRecords(); }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchRecords();
    };

    const formatDate = (ts) => {
        if (!ts?.seconds) return "—";
        return new Date(ts.seconds * 1000).toLocaleString();
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#1E3A8A" style={{ marginTop: 60 }} />
                <Text style={styles.loadingText}>Loading records...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#1E3A8A" />}
            >
                <Text style={styles.header}>📋 Check-in Records</Text>
                <Text style={styles.subHeader}>{records.length} record(s) found</Text>

                {records.length === 0 ? (
                    <View style={styles.emptyCard}>
                        <Text style={styles.emptyEmoji}>📭</Text>
                        <Text style={styles.emptyText}>No records yet.</Text>
                        <Text style={styles.emptySubText}>Complete a check-in or finish class to see data here.</Text>
                    </View>
                ) : (
                    records.map((r) => (
                        <View
                            key={r.id}
                            style={[styles.card, r.type === "checkin" ? styles.checkinCard : styles.checkoutCard]}
                        >
                            <View style={styles.cardHeader}>
                                <View style={[styles.badgeContainer, r.type === "checkin" ? styles.badgeCheckin : styles.badgeCheckout]}>
                                    <Text style={[styles.badge, r.type === "checkin" ? styles.badgeTextCheckin : styles.badgeTextCheckout]}>
                                        {r.type === "checkin" ? "✅ CHECK-IN" : "🎓 FINISH CLASS"}
                                    </Text>
                                </View>
                                <Text style={styles.timestamp}>{formatDate(r.timestamp)}</Text>
                            </View>

                            <Text style={styles.studentId}>👤 {r.studentId}</Text>

                            <View style={styles.row}>
                                <Text style={styles.meta}>
                                    📍 {r.gpsLat?.toFixed(4)}, {r.gpsLng?.toFixed(4)}
                                </Text>
                            </View>

                            {r.type === "checkin" && (
                                <>
                                    <Text style={styles.fieldLabel}>Previous Topic:</Text>
                                    <Text style={styles.fieldValue}>{r.previousTopic}</Text>
                                    <Text style={styles.fieldLabel}>Expected Today:</Text>
                                    <Text style={styles.fieldValue}>{r.expectedTopic}</Text>
                                    <Text style={styles.fieldLabel}>Mood Before:</Text>
                                    <Text style={styles.moodText}>
                                        {MOOD_EMOJI[r.moodBefore]} {r.moodBefore}/5
                                    </Text>
                                </>
                            )}

                            {r.type === "checkout" && (
                                <>
                                    <Text style={styles.fieldLabel}>Learned Today:</Text>
                                    <Text style={styles.fieldValue}>{r.learnedToday}</Text>
                                    {r.feedback ? (
                                        <>
                                            <Text style={styles.fieldLabel}>Feedback:</Text>
                                            <Text style={styles.fieldValue}>{r.feedback}</Text>
                                        </>
                                    ) : null}
                                </>
                            )}
                        </View>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8FAFC" },
    scrollContent: { padding: 20, paddingBottom: 40 },
    header: { color: "#1E3A8A", fontSize: 26, fontWeight: "900", marginBottom: 4, letterSpacing: -0.5 },
    subHeader: { color: "#64748B", fontSize: 14, marginBottom: 24, fontWeight: "500" },
    loadingText: { color: "#64748B", textAlign: "center", marginTop: 16, fontWeight: "500" },

    emptyCard: {
        alignItems: "center",
        padding: 40,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        marginTop: 20,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    emptyEmoji: { fontSize: 48, marginBottom: 16 },
    emptyText: { color: "#1E3A8A", fontSize: 20, fontWeight: "800", marginBottom: 8 },
    emptySubText: { color: "#64748B", fontSize: 15, textAlign: "center", lineHeight: 22 },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        borderLeftWidth: 6,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderLeftColor: "transparent", // Overridden by specific card styles
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    checkinCard: { borderLeftColor: "#1E3A8A" }, // Navy
    checkoutCard: { borderLeftColor: "#F59E0B" }, // Gold

    cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },

    badgeContainer: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeCheckin: { backgroundColor: "#DBEAFE" }, // Light Blue
    badgeTextCheckin: { color: "#1E3A8A" }, // Dark Blue
    badgeCheckout: { backgroundColor: "#FEF3C7" }, // Light Gold
    badgeTextCheckout: { color: "#D97706" }, // Dark Gold

    badge: { fontWeight: "800", fontSize: 11, letterSpacing: 0.5 },
    timestamp: { color: "#94A3B8", fontSize: 12, fontWeight: "500" },

    studentId: { color: "#1E293B", fontSize: 18, fontWeight: "800", marginBottom: 10 },
    row: { flexDirection: "row", marginBottom: 16 },
    meta: { color: "#64748B", fontSize: 13, fontFamily: "monospace", backgroundColor: "#F1F5F9", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },

    fieldLabel: { color: "#94A3B8", fontSize: 12, marginTop: 12, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.5 },
    fieldValue: { color: "#334155", fontSize: 15, marginTop: 4, lineHeight: 22 },
    moodText: { color: "#334155", fontSize: 18, marginTop: 4, fontWeight: "600" },
});

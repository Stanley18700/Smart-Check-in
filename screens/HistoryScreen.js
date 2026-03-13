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
                <ActivityIndicator size="large" color="#e94560" style={{ marginTop: 60 }} />
                <Text style={styles.loadingText}>Loading records...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#e94560" />}
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
                                <Text style={styles.badge}>
                                    {r.type === "checkin" ? "✅ CHECK-IN" : "🎓 FINISH CLASS"}
                                </Text>
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
    container: { flex: 1, backgroundColor: "#0f0f1a" },
    scrollContent: { padding: 16 },
    header: { color: "#ffffff", fontSize: 24, fontWeight: "800", marginBottom: 4 },
    subHeader: { color: "#888aaa", fontSize: 13, marginBottom: 20 },
    loadingText: { color: "#888", textAlign: "center", marginTop: 12 },
    emptyCard: {
        alignItems: "center",
        padding: 40,
        backgroundColor: "#1a1a2e",
        borderRadius: 16,
        marginTop: 20,
    },
    emptyEmoji: { fontSize: 48, marginBottom: 12 },
    emptyText: { color: "#ffffff", fontSize: 18, fontWeight: "700" },
    emptySubText: { color: "#888aaa", fontSize: 14, textAlign: "center", marginTop: 6 },
    card: {
        backgroundColor: "#1a1a2e",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
    },
    checkinCard: { borderLeftColor: "#e94560" },
    checkoutCard: { borderLeftColor: "#16c79a" },
    cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
    badge: { color: "#ffffff", fontWeight: "700", fontSize: 12 },
    timestamp: { color: "#888aaa", fontSize: 11 },
    studentId: { color: "#e0e0ff", fontSize: 16, fontWeight: "700", marginBottom: 6 },
    row: { flexDirection: "row", marginBottom: 8 },
    meta: { color: "#6666aa", fontSize: 12, fontFamily: "monospace" },
    fieldLabel: { color: "#888aaa", fontSize: 12, marginTop: 8, fontWeight: "600" },
    fieldValue: { color: "#ccccee", fontSize: 14, marginTop: 2 },
    moodText: { color: "#ccccee", fontSize: 16, marginTop: 2 },
});

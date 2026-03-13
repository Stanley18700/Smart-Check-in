import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const MOODS = [
    { score: 1, emoji: "😡", label: "Very Negative" },
    { score: 2, emoji: "🙁", label: "Negative" },
    { score: 3, emoji: "😐", label: "Neutral" },
    { score: 4, emoji: "🙂", label: "Positive" },
    { score: 5, emoji: "😄", label: "Very Positive" },
];

export default function MoodSelector({ value, onChange }) {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {MOODS.map((m) => (
                    <TouchableOpacity
                        key={m.score}
                        style={[styles.moodBtn, value === m.score && styles.selected]}
                        onPress={() => onChange(m.score)}
                    >
                        <Text style={styles.emoji}>{m.emoji}</Text>
                        <Text style={[styles.score, value === m.score && styles.activeScore]}>
                            {m.score}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Text style={styles.label}>
                {MOODS.find((m) => m.score === value)?.label}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginVertical: 8 },
    row: { flexDirection: "row", justifyContent: "space-between" },
    moodBtn: {
        flex: 1,
        alignItems: "center",
        padding: 10,
        marginHorizontal: 3,
        borderRadius: 12,
        backgroundColor: "#16213e",
        borderWidth: 2,
        borderColor: "transparent",
    },
    selected: { borderColor: "#e94560", backgroundColor: "#e9456022" },
    emoji: { fontSize: 28 },
    score: { color: "#888", fontSize: 12, marginTop: 2 },
    activeScore: { color: "#e94560", fontWeight: "700" },
    label: {
        textAlign: "center",
        color: "#e94560",
        fontWeight: "600",
        marginTop: 8,
        fontSize: 14,
    },
});

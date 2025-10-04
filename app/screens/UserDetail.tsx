// app/task3/details.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function DetailsScreen() {
  const { name, email, phone, website, company, address } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👤 User Details</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{name}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{email}</Text>

        {phone && (
          <>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{phone}</Text>
          </>
        )}

        {website && (
          <>
            <Text style={styles.label}>Website:</Text>
            <Text style={styles.value}>{website}</Text>
          </>
        )}

        {company && (
          <>
            <Text style={styles.label}>Company:</Text>
            <Text style={styles.value}>{company}</Text>
          </>
        )}

        {address && (
          <>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{address}</Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9fafb" },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2563eb",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6b7280",
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    color: "#111827",
    marginTop: 4,
  },
});

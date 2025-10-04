import { useNetworkStatus } from "@/hooks/useNetwork";
import { useUsers } from "@/hooks/useUser";
import { logout } from "@/redux/authSlice";
import { useRouter } from "expo-router";
import React from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userEmail = useSelector((state: any) => state.auth?.email);
  const { loading, error, users } = useUsers();
  const isOnline = useNetworkStatus();

  
  const handleLogout = () => {
    dispatch(logout());
    router.replace("/(auth)/Login");
  };

  // ✅ Show only part of email before @
  const getShortEmail = (email: string) => {
    if (!email) return "";
    return email.split("@")[0];
  };

  // ✅ Loading UI
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading users...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.banner,
          { backgroundColor: isOnline ? "green" : "red" },
        ]}
      >
        <Text style={styles.bannerText}>
          {isOnline ? "✅ Online" : "❌ Offline"}
        </Text>
      </View>

      {/* Header Row */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>
          Welcome, {getShortEmail(userEmail) || "Guest"}
        </Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Users List */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/screens/UserDetail",
                params: {
                  name: item.name,
                  email: item.email,
                  phone: item.phone,
                  website: item.website,
                  company: item.company?.name,
                  address: item.address
                    ? `${item.address.street}, ${item.address.city}`
                    : "",
                },
              })
            }
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{getShortEmail(item.email)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  banner: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  bannerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  logoutBtn: {
    backgroundColor: "#ef4444",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#6b7280",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    color: "#374151",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

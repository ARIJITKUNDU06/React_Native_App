import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import axios from "axios";

export default function JobsScreen({ navigation }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchJobs = async () => {
    if (loading) return;
    setLoading(true);
    try {
    const response = await axios.get("https://testapi.getlokalapp.com/common/jobs?page=1");
      setJobs([...jobs, ...response.data.jobs]);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <View>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={fetchJobs}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("JobDetails", { job: item })}>
            <View style={{ padding: 10, borderBottomWidth: 1 }}>
              <Text style={{ fontSize: 16 }}>{item.title}</Text>
              <Text>{item.location}</Text>
              <Text>Salary: {item.salary}</Text>
              <Text>Phone: {item.phone}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

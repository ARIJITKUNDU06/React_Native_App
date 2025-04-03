import React from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function JobDetailsScreen({ route }) {
  const { job } = route.params;

  const bookmarkJob = async () => {
    const savedJobs = JSON.parse(await AsyncStorage.getItem("bookmarks")) || [];
    const updatedJobs = [...savedJobs, job];
    await AsyncStorage.setItem("bookmarks", JSON.stringify(updatedJobs));
    alert("Job Bookmarked!");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18 }}>{job.title}</Text>
      <Text>Location: {job.location}</Text>
      <Text>Salary: {job.salary}</Text>
      <Text>Phone: {job.phone}</Text>
      <Button title="Bookmark Job" onPress={bookmarkJob} />
    </View>
  );
}

import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookmarksScreen() {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const savedJobs = await AsyncStorage.getItem("bookmarks");
      if (savedJobs) setBookmarkedJobs(JSON.parse(savedJobs));
    };
    fetchBookmarks();
  }, []);

  return (
    <View>
      <FlatList
        data={bookmarkedJobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 16 }}>{item.title}</Text>
            <Text>{item.location}</Text>
          </View>
        )}
      />
    </View>
  );
}

import React from 'react';
import { View, FlatList, Image, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const BookmarkScreen = () => {
  const bookmarks = useSelector((state: RootState) => state.bookmark.images); // Ambil bookmark dari Redux

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookmarked Images</Text>
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.webformatURL }} style={styles.image} />
            <Text>{item.user}</Text>
            <Text>{item.tags}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  card: { marginBottom: 10 },
  image: { width: '100%', height: 200, borderRadius: 10 },
});

export default BookmarkScreen;

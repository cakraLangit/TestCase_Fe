import React, { useState } from 'react';
import { FlatList, Image, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addImageBookmark } from '../../store/bookmarkSlice';
import { logout } from '../../store/authSlice'; // Import action logout
import SearchBar from '../../components/searchBar';
import { useFetchImagesQuery } from '../../api/apiSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const { data, isFetching, refetch } = useFetchImagesQuery({ query, page });

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleBookmark = (image: any) => {
    dispatch(addImageBookmark(image)); // Simpan ke Redux store
    Alert.alert('Success', 'Added to bookmarks!');
  };

  const handleLogout = () => {
    dispatch(logout()); 
    navigation.replace('Login'); 
  };

  return (
    <View style={styles.container}>
      <SearchBar
        onSearch={(newQuery) => {
          setQuery(newQuery);
          refetch();
        }}
      />

      {/* List Gambar */}
      <FlatList
        data={data?.hits || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.webformatURL }} style={styles.image} />
            <Text style={styles.user}>{item.user}</Text>
            <Text style={styles.tags}>{item.tags}</Text>
            <TouchableOpacity onPress={() => handleBookmark(item)} style={styles.bookmarkButton}>
              <Icon name="bookmark" size={20} color="#fff" />
              <Text style={styles.bookmarkText}>Bookmark</Text>
            </TouchableOpacity>
          </View>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetching ? <Text>Loading...</Text> : null}
      />

      {/* Tombol Navigasi ke BookmarkScreen */}
      <TouchableOpacity
        style={styles.navigateBookmark}
        onPress={() => navigation.navigate('Bookmark')}
      >
        <Text style={styles.navigateText}>Go to Bookmarks</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  card: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
  },
  image: { width: '100%', height: 200, borderRadius: 10 },
  user: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },
  tags: { color: '#666', marginBottom: 10 },
  bookmarkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  bookmarkText: { color: '#fff', fontWeight: 'bold', marginLeft: 5 },
  navigateBookmark: {
    padding: 15,
    backgroundColor: '#28a745',
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  navigateText: { color: '#fff', fontWeight: 'bold' },
});

export default HomeScreen;

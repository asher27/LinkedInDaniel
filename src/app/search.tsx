import React, {useLayoutEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native';

import users from '../../assets/data/users.json';
import UserListItem from '@/components/UserListItem';
import {useNavigation} from 'expo-router';
import {gql, useQuery} from '@apollo/client';

const query = gql`
  query profileSearch($searchText: String) {
    profileSearch(searchText: $searchText) {
      id
      name
      image
      position
    }
  }
`;
const Search = () => {
  const navigation = useNavigation();

  const [search, setSearch] = useState('');

  const {data, loading, error, called} = useQuery(query, {
    variables: {
      searchText: `%${search}%`,
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: 'Search users',
        onChangeText: (event: any) => setSearch(event.nativeEvent.text),
      },
    });
  }, [navigation]);

  if (loading && !data?.profileSearch) return <ActivityIndicator />;
  if (error) return <Text>Something went wrong</Text>;



  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <FlatList
        data={data?.profileSearch}
        renderItem={({item}) => <UserListItem user={item}
        />}
        // contentContainerStyle={{marginTop: 150}}
      />
    </View>
  );
};
const styles = StyleSheet.create({});
export default Search;

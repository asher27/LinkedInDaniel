import {ActivityIndicator, FlatList, StyleSheet, Text} from 'react-native';
import PostListItem from '@/components/PostListItem';
import {gql, useQuery} from '@apollo/client';
import React, {useState} from 'react';

const postList = gql`
  query PostListQuery {
    postList {
      id
      content
      image
      profile {
        id
        name
        position
        image
      }
    }
  }
`;

const postPaginatedList = gql`
  query PostPaginatedListQuery($first: Int, $after: Int) {
    postPaginatedList(first: $first, after: $after) {
      id
      content
      image
      profile {
        id
        name
        position
        image
      }
    }
  }
`;
export default function HomeFeedScreen() {
  const [hasMore, setHasMore] = useState(true);
  const {data, loading, error, fetchMore, refetch} = useQuery(
    postPaginatedList,
    {
      variables: {
        first: 5,
      },
    },
  );

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Something went wrong!</Text>;

  // console.log(data);

  const loadMore = async () => {
    if (!hasMore) {
      return;
    }

    await fetchMore({variables: {after: data.postPaginatedList.length}});
    if (data.postPaginatedList.length === 0) {
      setHasMore(false);
    }
  };

  return (
    <FlatList
      data={data.postPaginatedList}
      renderItem={({item}) => <PostListItem key={item.id} post={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{gap: 10}}
      onEndReached={loadMore}
      refreshing={loading}
      onRefresh={refetch}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

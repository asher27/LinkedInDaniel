import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text} from 'react-native';
import PostListItem from "@/components/PostListItem";
import {useLocalSearchParams} from "expo-router";
import {gql, useQuery} from "@apollo/client";

const query = gql`
query MyQuery($id: ID!) {
  post(id: $id) {
    id
    content
    image
    profile {
      id
      image
      name
      position
    }
  }
}
`
const PostDetailsScreen = () => {

    const {id} = useLocalSearchParams();
    const {data, loading, error} = useQuery(query, {variables: {id}});

    if (loading) return <ActivityIndicator/>;
    if (error) return <Text>Something went wrong!</Text>;

    return (
        <ScrollView>
            <PostListItem post={data.post}/>
        </ScrollView>
    );
}
const styles = StyleSheet.create({})
export default PostDetailsScreen;

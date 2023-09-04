import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import PostListItem from "@/components/PostListItem";

import posts from '../../../assets/data/posts.json';
import {useLocalSearchParams} from "expo-router";

const PostDetailsScreen = () => {

    const {id} = useLocalSearchParams();
    const post = posts.find((post) => post.id === id);

    if (!post) {
        return <Text>Post not found</Text>;
    }

    return (
        <ScrollView>
            <PostListItem post={post}/>
        </ScrollView>
    );
}
const styles = StyleSheet.create({})
export default PostDetailsScreen;

import {Image, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';

import {useNavigation, useRouter} from "expo-router";
import React, {useLayoutEffect, useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import {FontAwesome} from '@expo/vector-icons';
import {gql, useMutation} from "@apollo/client";
import {useUserContext} from "@/context/userContext";

const insertPost = gql`
    mutation MyMutation($userId: ID, $image: String, $content: String!) {
      insertPost(content: $content, image: $image, userid: $userId) {
        id
        image
        content
        userid
      }
    }
`;

export default function NewPostScreen() {

    const navigation = useNavigation();
    const router = useRouter();
    const {dbUser} = useUserContext();

    const [content, setContent] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const [handleMutation, {data, loading, error}] = useMutation(insertPost);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            // aspect: [4, 3],
            quality: 0.5,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    const onPost = async () => {
        console.warn('Posting: ', content);

        try {
            await handleMutation({
                variables: {
                    userId: dbUser?.id,
                    content: content
                },
                refetchQueries: ['PostPaginatedListQuery']
            });


            setContent('');
            setImage(null);

            router.push('/(tabs)/');
        } catch (e) {
            console.log(e);
        }

    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Pressable disabled={loading} onPress={onPost} style={styles.postButton}><Text
                style={styles.postButtonText}>{loading ? 'submitting...' : 'Submit'}</Text></Pressable>
        })
    }, [onPost, loading]);

    return (
        <View style={styles.container}>
            <TextInput
                value={content}
                onChangeText={setContent}
                placeholder={'What do you want to talk about?'}
                style={styles.input}
                multiline={true}
            />

            {image && (
                <Image source={{uri: image}} style={styles.image}/>
            )}
            <View style={styles.footer}>
                <Pressable onPress={pickImage} style={styles.iconButton}>
                    <FontAwesome name="image" size={24} color="black"/>
                </Pressable>
                <Pressable style={styles.iconButton}>
                    <FontAwesome name="camera" size={24} color="black"/>
                </Pressable>
                <Pressable style={styles.iconButton}>
                    <FontAwesome name="glass" size={24} color="black"/>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,

    },
    input: {
        fontSize: 18,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    postButton: {
        backgroundColor: 'royalblue',
        padding: 5,
        paddingHorizontal: 15,
        borderRadius: 50,
        marginRight: 10,
    },
    postButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    footer: {
        marginTop: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    iconButton: {
        backgroundColor: 'gainsboro',
        padding: 20,
        borderRadius: 100,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        marginTop: 'auto'
    }
});

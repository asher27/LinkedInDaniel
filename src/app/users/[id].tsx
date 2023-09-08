import React, {useLayoutEffect} from 'react';
import {ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useLocalSearchParams, useNavigation} from "expo-router";
import {User} from "@/types";
import ExperienceListItem from "@/components/ExperienceListItem";
import {gql, useQuery} from "@apollo/client";

const query = gql`
query MyQuery($id: ID!) {
  profile(id: $id) {
    id
    name
    image
    position
    about
    backimage
    experience {
      id
      companyname
      companyimage
      title
      userid
    }
  }
}
`
const UserProfile = () => {

    const {id} = useLocalSearchParams();
    const navigation = useNavigation();

    const {data, loading, error} = useQuery(query, {variables: {id}});
    const user = data?.profile as User;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: user?.name || 'User'
        })
    }, [user?.name]);

    if (loading) return <ActivityIndicator/>;
    if (error) return <Text>Something went wrong!</Text>;


    const onConnect = () => {

    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/*    Header */}
            <View style={styles.header}>
                {/*    BG image*/}
                <Image source={{uri: user.backimage}} style={styles.backImage}/>
                <View style={styles.headerContent}>
                    {/*    Profile image*/}
                    <Image source={{uri: user.image}} style={styles.image}/>

                    {/*    Name and Position*/}
                    <Text style={styles.name}>{user.name}</Text>
                    <Text>{user.position}</Text>

                    {/*    Connect button*/}
                    <Pressable onPress={onConnect} style={styles.button}>
                        <Text style={styles.buttonText}>Connect</Text>
                    </Pressable>

                </View>
            </View>
            {/*    About */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>
                <Text style={styles.paragraph}>{user.about}</Text>
            </View>
            {/*    Experience */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {user.experience?.map((experience) => <ExperienceListItem key={experience.id}
                                                                          experience={experience}/>)}
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {},
    header: {
        backgroundColor: 'white',
        marginBottom: 5
    },
    backImage: {
        width: '100%',
        aspectRatio: 5 / 2,
        marginBottom: -60,
    },
    headerContent: {
        padding: 10,
        paddingTop: 0,
    },
    image: {
        width: 100,
        aspectRatio: 1,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: 'white',
    },
    name: {
        fontSize: 24,
        fontWeight: '500'
    },
    button: {
        backgroundColor: 'royalblue',
        padding: 10,
        alignItems: 'center',
        borderRadius: 50,
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
    },
    section: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 5,
    },
    paragraph: {
        lineHeight: 20,
    }
})
export default UserProfile;


// 2:44:15 부터

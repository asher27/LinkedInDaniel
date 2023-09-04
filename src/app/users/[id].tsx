import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useLocalSearchParams} from "expo-router";
import userJson from '../../../assets/data/user.json';
import {User} from "@/types";

const UserProfile = () => {

    const {id} = useLocalSearchParams();

    const [user, setUser] = useState<User>(userJson);

    const onConnect = () => {

    }

    return (
        <View style={styles.container}>
            {/*    Header */}
            <View style={styles.header}>
                {/*    BG image*/}
                <Image source={{uri: user.backImage}} style={styles.backImage}/>
                <View style={styles.headerContent}>
                    {/*    Profile image*/}
                    <Image source={{uri: user.image}} style={styles.image}/>

                    {/*    Name and Position*/}
                    <Text style={styles.name}>{user.name}</Text>
                    <Text >{user.position}</Text>

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
        </View>
    );
}
const styles = StyleSheet.create({
    container: {},
    header: {
        backgroundColor: 'white'
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
        marginVertical: 10,
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

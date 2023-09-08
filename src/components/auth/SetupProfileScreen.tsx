import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {gql, useMutation} from '@apollo/client';
import {useUserContext} from '@/context/userContext';

const createProfileMutation = gql`
  mutation CreateProfile($authid: String, $name: String, $about: String) {
    insertProfile(authid: $authid, name: $name, about: $about) {
      id
      name
      about
      authid
    }
  }
`;
const SetupProfileScreen = () => {
  const {authUser, reloadDbUser} = useUserContext();

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  const [handleMutation, {data, loading, error}] = useMutation(
    createProfileMutation,
  );

  const onSave = async () => {
    try {
      await handleMutation({
        variables: {
          authid: authUser?.id,
          name: name,
          about: about,
        },
      });

      if (reloadDbUser) await reloadDbUser();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Setup Profile</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder={'Name'}
      />
      <TextInput
        value={about}
        onChangeText={setAbout}
        style={styles.input}
        placeholder={'About'}
        multiline={true}
        numberOfLines={3}
      />
      <TouchableOpacity onPress={onSave} style={styles.button}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    width: '100%',
    borderRadius: 5,
    marginVertical: 5,
  },
  button: {
    backgroundColor: 'royalblue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
});
export default SetupProfileScreen;

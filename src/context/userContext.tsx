import React, {createContext, useContext} from 'react';
import {useUser} from '@clerk/clerk-expo';
import {
  ApolloQueryResult,
  gql,
  OperationVariables,
  useQuery,
} from '@apollo/client';
import {User} from '@/types';
import {UserResource} from '@clerk/types';

const getUserQuery = gql`
  query MyQuery($authid: String!) {
    profileUsingprofile_authid_key(authid: $authid) {
      about
      authid
      backimage
      id
      image
      name
      position
    }
  }
`;

type initialDataProps = {
  dbUser: undefined | null | User;
  authUser: undefined | null | UserResource;
  loading: undefined | boolean;
  reloadDbUser:
    | undefined
    | null
    | ((
        variables?: Partial<OperationVariables> | undefined,
      ) => Promise<ApolloQueryResult<any>>);
};
const initialData: initialDataProps = {
  dbUser: null,
  authUser: null,
  loading: undefined,
  reloadDbUser: undefined,
};

const UserContext = createContext(initialData);

const UserContextProvider = ({children}: {children: React.ReactNode}) => {
  const {user: authUser, isLoaded: isAuthLoaded} = useUser();

  const {
    data,
    loading: isDbLoading,
    refetch,
  } = useQuery(getUserQuery, {
    variables: {authid: authUser?.id},
  });

  console.log('isDbLoading', isDbLoading);

  const dbUser = data?.profileUsingprofile_authid_key;

  // const loading = isDbLoading || !isAuthLoaded;
  const loading = !isAuthLoaded;

  return (
    <UserContext.Provider
      value={{dbUser, authUser, loading, reloadDbUser: refetch}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export const useUserContext = () => useContext(UserContext);

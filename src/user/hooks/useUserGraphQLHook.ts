import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../api/graphQL/querys'
import { UPDATE_USER } from '../api/graphQL/mutation'
import { useUser } from './useUser'

export const useUserGraphQLHook = () => {
  const { user } = useUser()
    const [CreateUser, {data: createUserData}] = useMutation(CREATE_USER)
    const [UpdateUser] = useMutation(UPDATE_USER)
  
    const validateUser = async (userInfo: []) => {
      //@ts-ignore
      if(userInfo?.Users?.docs.length === 0){
        const userData = {
          email: user?.email?.address?? '',
          wallet_address: user?.wallet?.address ?? '',
          privy_id: user?.id,
          firstName: '',
          lastName: '',
          profilePicture: '',
          dateOfBirth: '',
          password: user?.id
        }
        console.log(userData);
        
        try {
          await CreateUser({variables: { data: userData}})  
        } catch (error) {
          console.log('EL ERROR', error);
          
        }
        
        console.log(createUserData);
        
      }
      

    }
    return {
        validateUser,
        UpdateUser
    }
}
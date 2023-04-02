import { useEffect} from 'react'
import UserComponent from '../components/UserComponent';
import { useUser } from '../hooks/useUser';
import { useUserGraphQLHook } from '../hooks/useUserGraphQLHook';
import Loading from '../../core/components/Loading';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_EMAIL } from '../api/graphQL/querys';

function UserContainers() {
  const {user} = useUser()
  const { validateUser } = useUserGraphQLHook()
  const {data} = useQuery(GET_USER_BY_EMAIL, { variables: { email: user?.email?.address }})

  useEffect(() => {
    console.log(data);
    
    if(data?.Users?.docs.length === 0){
      validateUser(data)
    }
  }, [data])
  
  if(!user) return <Loading />
  return (
      <UserComponent user={user} cedalioUser={data?.Users?.docs[0]} />  
  );
}
export default UserContainers;



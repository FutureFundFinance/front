import UserComponent from '../components/UserComponent';
import { useUser } from '../hooks/useUser';
import Loading from '../../core/components/Loading';

function UserContainers() {
  const {user} = useUser()
  

  if(!user) return <Loading />
  return (
      <UserComponent user={user} />  
  );
}
export default UserContainers;


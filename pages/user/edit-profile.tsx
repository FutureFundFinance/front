import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { usePinataHook } from '../../src/user/hooks/usePinataHook';
import { useUserGraphQLHook } from '../../src/user/hooks/useUserGraphQLHook';
import { GET_USER_BY_EMAIL } from '../../src/user/api/graphQL/querys';
import { useQuery } from '@apollo/client';
import { useUser } from '../../src/user/hooks/useUser';

type ProfileFormData = {
  firstName: string;
  lastName: string;
  profilePicture?: string;
  
};

const ProfileForm = () => {
    const [currentUser, setCurrentUser] = useState()
  const {user} = useUser()
  const { register, handleSubmit, error } = useForm<ProfileFormData>();
  const {data: backendUser} = useQuery(GET_USER_BY_EMAIL, { variables: { email: user?.email?.address }})

  const {sendFileToIPFS} = usePinataHook()
  const { UpdateUser} = useUserGraphQLHook()

  
  useEffect(() => {
    setCurrentUser(backendUser?.Users?.docs[0])

  }, [backendUser])
  const onSubmit = async (data: ProfileFormData) => {
    console.log(data);
    let imageData = null
    if(data.profilePicture){
        imageData = await sendFileToIPFS(data.profilePicture[0])
    }

    let userInfo : ProfileFormData = {
        firstName: data.firstName,
        lastName: data.lastName,
    }

    if(imageData){ 
        userInfo.profilePicture = `https://gateway.pinata.cloud/ipfs/${imageData}`
    }
    console.log('imageData', imageData, userInfo);
    //@ts-ignore
    const updatedUser = UpdateUser({variables : { id:  currentUser?.id , data: userInfo}})

    console.log(updatedUser);
    

  };

  return (
    <div
        className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4 antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light"
      >
    <div className="w-full max-w-sm px-4 py-6 space-y-6 bg-white rounded-md dark:bg-darker">
            <h1 className="text-xl font-semibold text-center">Edit profile</h1>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
        className="w-full px-4 py-2 border rounded-md dark:bg-darker dark:border-gray-700 focus:outline-none focus:ring focus:ring-primary-100 dark:focus:ring-primary-darker"
          type="text"
          id="firstName"
          {...register("firstName")} 
          //@ts-ignore
          defaultValue={currentUser?.firstName}
        />
        {//@ts-ignore 
        error?.firstName && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
            className="w-full px-4 py-2 border rounded-md dark:bg-darker dark:border-gray-700 focus:outline-none focus:ring focus:ring-primary-100 dark:focus:ring-primary-darker"
            type="text"
            id="lastName"
            {...register("lastName")} 
            //@ts-ignore
            defaultValue={currentUser?.lastName}
        />
        
        {   //@ts-ignore
            error?.lastName && <span>This field is required</span>
        }
      </div>
      <div>
        <label htmlFor="lastName">Avatar</label>
        <input

        className="w-full px-4 py-2 border rounded-md dark:bg-darker dark:border-gray-700 focus:outline-none focus:ring focus:ring-primary-100 dark:focus:ring-primary-darker"
          type="file"
          id="profilePicture"
          {...register("profilePicture")} 
        />
        { //@ts-ignore
        error?.profilePicture && <span>This field is required</span>}
      </div>
      <button className="w-full px-4 py-2 font-medium text-center text-white transition-colors duration-200 rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 dark:focus:ring-offset-darker"
      type="submit">Save Changes</button>
    </form>
    </div>
    </div>
  );
};

export default ProfileForm;

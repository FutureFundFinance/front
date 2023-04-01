import {useEffect, useState} from 'react'
import axios  from 'axios'

import { usePrivy, getAccessToken } from '@privy-io/react-auth'
export const useUser = () => {
  const [userToken, setUserToken] = useState<string | null>(null)
  const [deployed, setDeployed] = useState(false);
  const [uri, setUri] = useState('');
  const [contractAddress, setContractAddress] = useState<string | undefined>();
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");
  // const handleClose = () => setOpen(false);

  const { user, authenticated, ready } = usePrivy()

  const getUserToken = async () =>{
    const newToken = await getAccessToken()
    setUserToken(newToken)
  }
  const wallet = user?.wallet;
  useEffect(()=>{
    getUserToken()
  },[user])

  useEffect(() => {
    const deployed = Boolean(localStorage.getItem('deployed'))
    const contractAddress = localStorage.getItem('contractAddress')
    const deploymentId = localStorage.getItem('deploymentId')

    console.log('deploymentId', deploymentId);
    
    if (deployed && contractAddress && deploymentId) {
      setUri(`${String(process.env.NEXT_PUBLIC_GRAPHQL_GATEWAY_BASE_URL)}/${deploymentId}/graphql`)
      setDeployed(deployed)
      setContractAddress(contractAddress)
    }
    else if (ready && authenticated) {
      console.log(user?.wallet?.address);
      
      if (user?.wallet?.address) {
        return requestDeployToGateway(String(user?.wallet?.address))
      }
    }
    else {
      return
    }
  }, [ready, authenticated])

  async function getAuthToken(address: string) {

    const url = `${process.env.NEXT_PUBLIC_GRAPHQL_GATEWAY_BASE_URL}/auth/privy`

    console.log(url);
    

    //when using privy sdk the value is stored as string with ""
    const privyToken = localStorage.getItem("privy:token")?.replaceAll('"', "");

    const payload = {
      "jwt": privyToken,
      "account": address
    }
    const response = await axios.post(
      url, payload
    )
    const token = response.data.token
    return token
    
  }

  function requestDeployToGateway(address: string) {
    getAuthToken(address)
      .then((token) => {
        
        localStorage.setItem("auth_token", String(token));

        const url = `${process.env.REACT_APP_GRAPHQL_GATEWAY_BASE_URL}/deploy`;

        const payload = {
          email: "todo-multi.cedalio.com",
          schema: `type Todo {
            id: UUID!
            title: String!
            description: String
            priority: Int!
            tags: [String!]
            status: String
          }`,
          schema_owner: address,
          network: "polygon:mumbai",
        };

        setOpen(true);

        axios
          .post(url, payload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(function (response: any) {
            localStorage.setItem("deploymentId", response.data.deployment_id);
            localStorage.setItem(
              "contractAddress",
              response.data.contract_address
            );
            localStorage.setItem("deployed", "true");
            setContractAddress(response.data.contract_address);
            setDeployed(true);
            setOpen(false);
            setResponse("success");
            setUri(
              `${process.env.REACT_APP_GRAPHQL_GATEWAY_BASE_URL}/${response.data.deployment_id}/graphql`
            );
          })
          .catch(function (error: any) {
            console.log(error);
            setResponse("error");
          });
      })
      .catch(function (error: any) {
        console.log(error);
        setResponse("error");
      });
  }

  const data: any = []
  return {
    data,
    user,
    userToken,
    wallet,
    requestDeployToGateway,
    deployed,
    open,
    response,
    uri,
    contractAddress
  }
}

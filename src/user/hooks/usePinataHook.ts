import axios from "axios";

export const usePinataHook = () => {

    const sendFileToIPFS = async (fileImg: any) => {

        if (fileImg) {
            try {
                const formData = new FormData();
                formData.append("file", fileImg);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        'pinata_api_key': `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
                        'pinata_secret_api_key': `${process.env.NEXT_PUBLIC_PINATA_API_SECRET}`,
                        "Content-Type": "multipart/form-data"
                    },
                });
                return resFile?.data?.IpfsHash
                
            } catch (error) {
                console.log("Error sending File to IPFS: ")
                console.log(error)
            }
        }
    }
    return { 
        sendFileToIPFS
    }
}
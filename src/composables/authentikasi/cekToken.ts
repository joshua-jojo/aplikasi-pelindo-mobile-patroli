import axios from "axios";


async function expired(token : string) {
    const status : any = await axios({
        method : 'post',
        url : 'auth/cektoken',
        data : {
            token : token
        }
    })
    return !status.data
}
export default expired;
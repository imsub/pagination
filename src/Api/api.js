
const URL = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';

export default async function getData () {
    try{
        const response = await fetch(URL,{
             Method: 'GET'
        });
        const data = await response.json();
        return data;
    }catch(error){
        throw new Error(error.message);
    }
}

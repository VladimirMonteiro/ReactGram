import { api, requestConfig } from "../utils/config";

//Get user details

const profile = async(data, token) => {

    const config = requestConfig("GET", data, token)

    try {
        
        const res = await fetch(api + "/user/profile", config).then((res)=> res.json()).catch((error) => error)
        

        return res
    } catch (error) {
        console.log(error)
        
    }

}

// Update user datails

const updateProfile = async(data, token) => {
    const config = requestConfig("PUT", data, token, true)


    
    try {

        const res = await fetch(api + "/user/update", config).then((data)=> data.json()).catch(error => error)
       

        return res
        
    } catch (error) {
        console.log(error)
        
    }
}

//Get user details by id

const getUserDetails = async (id) => {
    
    const config = requestConfig("GET")

    try {

        const res = await fetch(api + "/user/"+ id, config).then((res)=> res.json()).catch(error => error)
       
        return res
        
    } catch (error) {
        console.log(error)
        
    }
}



const userService = {
    profile,
    updateProfile,
    getUserDetails
}


export default userService
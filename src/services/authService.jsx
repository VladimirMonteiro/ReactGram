import { api, requestConfig } from "../utils/config"

// Register a user
const register = async (data) => {
  const config = requestConfig("POST", data)

  try {
    const res = await fetch(api + "/user/register", config)
      .then((res) => res.json())
      .catch((err) => err)

    if (res) {
      localStorage.setItem("user", JSON.stringify(res))
    }
    console.log(res)
    return res;
  } catch (error) {
    console.log(error)
  }
}

// Logout an user

const logout = () => {
  localStorage.removeItem("user")
}


// Login an user

const login = async (data) => {
  const config = (requestConfig("POST", data))

  try {
    const res = await fetch(api + "/user/login", config).then((data) => data.json()).catch((error) => console.log(error))

    if (res) {
      localStorage.setItem("user", JSON.stringify(res))
    }

    return res

  } catch (error) {
    console.log(error)

  }




}




const authServices = {
  register,
  logout,
  login
}

export default authServices
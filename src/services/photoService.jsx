import { api, requestConfig } from '../utils/config';

const publishPhoto = async (data, token) => {
  try {
    const config = requestConfig('POST', data, token, true);
    const res = await fetch(api + '/photos/insert', config);
    return res.json();
  } catch (error) {
    console.error('Error publishing photo:', error);
    throw error;
  }
};

const getAllUserPhotos = async (id, token) => {
  try {
    const config = requestConfig('GET', null, token);
    const res = await fetch(api + '/photos/user/' + id, config);
    return res.json();
  } catch (error) {
    console.error('Error getting user photos:', error);
    throw error;
  }
};

const deletePhoto = async (id, token) => {
  try {
    const config = requestConfig('DELETE', null, token);
    const res = await fetch(api + '/photos/' + id, config);
    return res.json();
  } catch (error) {
    console.error('Error deleting photo:', error);
    throw error;
  }
};

const updatePhoto = async (data, id, token) => {
  try {
    const config = requestConfig('PUT', data, token);
    const res = await fetch(api + '/photos/' + id, config);
    return res.json();
  } catch (error) {
    console.error('Error updating photo:', error);
    throw error;
  }
};

// Get photo by id

export const getPhotoById = async(id, token) => {

    const config = requestConfig("GET",null, token)

    try {
        const res = await fetch(api + "/photos/" + id, config).then((res)=> res.json()).catch(error => error)

        return res
        
    } catch (error) {
        console.log(error)
    }
}


// Like system

export const like = async(id, token) => {

    const config = requestConfig("PUT", null, token)

    try {

        const res = await fetch(api + "/photos/like/" + id, config).then((res)=> res.json()).catch(error => error)
        return res

        
    } catch (error) {
        console.log(error)
        
    }

    
}


// Comment photo

export const comment = async(data, id, token) => {

    const config = requestConfig("PUT", data, token)

    try {
        const res = await fetch(api + '/photos/comment/' + id, config).then((res)=> res.json()).catch(error => error)
        return res
    } catch (error) {
        console.log(error)
    }

    
}

// Get all photos

export const getPhotos = async(token) => {
    
    const config = requestConfig("GET",null, token)

    try {
        const res  = await fetch(api + "/photos", config).then((res)=> res.json()).catch(error => error)

        return res
        
    } catch (error) {
       console.log(error) 
    }
} 


// search

export const searchPhotos = async(query, token) => {

  const config = requestConfig("GET", null, token)

  const res = await fetch(api + "/photos/search?q=" + query, config).then((res)=> res.json()).catch(error => error)

  return res
}


const photoService = {
  publishPhoto,
  getAllUserPhotos,
  deletePhoto,
  updatePhoto,
  getPhotoById,
  like,
  comment,
  getPhotos,
  searchPhotos
};

export default photoService;

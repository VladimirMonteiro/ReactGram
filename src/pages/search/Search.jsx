import './Search.css'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'
import { useQuery } from '../../hooks/useQuery'



import Like from '../../components/like/Like'
import PhotoItem from '../../components/photoItem/PhotoItem'
import { Link } from 'react-router-dom'


// redux

import { searchPhotos, like } from '../../slices/photoSlice'

const Search = ()=> {

    const query = useQuery()
    const search = query.get("q")
    
    const dispatch = useDispatch()

    const resetMessage = useResetComponentMessage(dispatch)

    const {user} = useSelector((state)=> state.auth)
    const {photos, loading} = useSelector((state)=> state.photo)


    // Load photos
    useEffect(()=> {
        dispatch(searchPhotos(search))

    },[dispatch, search])



    const handleLike = (photo)=> {
        dispatch(like(photo._id))

        resetMessage()

    }

    if(loading){
        return <p>Carregando...</p>
    }








    return (
        <div id="search">
          <h2>Você está buscando por: {search}</h2>
          {photos &&
            photos.map((photo) => (
              <div key={photo._id}>
                <PhotoItem photo={photo} />
                <Like photo={photo} user={user} handleLike={handleLike} />
                <Link className="btn" to={`/photos/${photo._id}`}>
                  Ver mais
                </Link>
              </div>
            ))}
        </div>
      );
    };
    



export default Search
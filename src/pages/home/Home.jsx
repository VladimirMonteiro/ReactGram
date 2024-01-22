import './Home.css'


// Components
import Like from '../../components/like/Like'
import PhotoItem from '../../components/photoItem/PhotoItem'
import { Link } from 'react-router-dom'


import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useResetComponentMessage} from '../../hooks/useResetComponentMessage'

import {getPhotos, like} from '../../slices/photoSlice'
const Home = () => {

    const dispatch = useDispatch()
    const resetMessage = useResetComponentMessage(dispatch)
    const {user} = useSelector((state)=> state.auth)
    const {photos, loading} = useSelector((state) => state.photo)


    // Load all photos

    useEffect(()=> {
        dispatch(getPhotos())
    },[dispatch])


    // like a photo

    const handleLink = (photo)=> {
        dispatch(like(photo._id))

        resetMessage()

    }

    if(loading){
        return <p>Carregando...</p>
    }














    return(
        <section id='home'>
            {photos && photos.map((photo) => (
                <div key={photo._id}>
                    <PhotoItem photo={photo}/>
                    <Like photo={photo} user={user} handleLike={handleLink}/>
                    <Link className='btn' to={`/photos/${photo._id}`}>Ver mais</Link>

                </div>
            ))}
            {photos.length === 0 && (
                <h2 className="no-photos">Ainda não fotos publicadas, <Link to={`/users/${user._id}`}>clique aqui</Link> !</h2>
            )}
            
        </section>

    )

}


export default Home
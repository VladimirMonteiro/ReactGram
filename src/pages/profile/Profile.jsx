import './Profile.css'


import { uploads } from '../../utils/config'


// Components

import Message from '../../components/message/Message'
import { Link } from 'react-router-dom'
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";


// Hooks
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

// Redux

import { getUserDetails } from '../../slices/userSlice'
import { publishPhoto, resetMessage, getAllUserPhotos, deletePhoto, updatePhoto } from '../../slices/photoSlice';


const Profile = () => {


    const { id } = useParams()


    const dispatch = useDispatch()

    const { user, loading } = useSelector((state) => state.user)
    const { user: userAuth } = useSelector((state) => state.auth)
    const { photos, loading: loadingPhoto, message: messagePhoto, error: errorPhoto } = useSelector((state) => state.photo)


    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [editId, setEditId] = useState("")
    const [editImage, setEditImage] = useState("")
    const [editTitle, setEditTitle] = useState("")
    // new form and
    const newPhotoForm = useRef()
    const editPhotoForm = useRef()



    const resetComponentMessage = () => {
        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)

    }

    // Load user data
    useEffect(() => {
        dispatch(getUserDetails(id))
        dispatch(getAllUserPhotos(id))

    }, [dispatch, id])

    const handleFile = (e) => {

        const image = e.target.files[0]

        setImage(image)
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        const photoData = {
            title,
            image
        }

        const formData = new FormData()

        const photoFormData = Object.keys(photoData).forEach((key) => formData.append(key, photoData[key]))

        formData.append("photo", photoFormData)

        dispatch(publishPhoto(formData))
        setTitle("")

        resetComponentMessage()

    }


    // Delete a photo

    const handleDelete = (id) => {
        dispatch(deletePhoto(id))

        resetComponentMessage()

    }


    // Show or hide forms
    const hideOrShowForms = ()=> {
        newPhotoForm.current.classList.toggle("hide")
        editPhotoForm.current.classList.toggle("hide")
    }



    // Update a photo

    const handleUpdate  = (e)=> {
        e.preventDefault()

        const photoData = {
            title : editTitle,
            id: editId
        }

        console.log(photoData)
       dispatch(updatePhoto(photoData))

        resetComponentMessage()

    
    }


    const handleEdit = (photo) => {
        if(editPhotoForm.current.classList.contains("hide")){
            hideOrShowForms()

        }

        setEditId(photo._id)
        setEditTitle(photo.title)
        setEditImage(photo.image)

    }

    const handleCancelEdit = () => {
        hideOrShowForms()

    }

    if (loading) {
        return <p>Carregando...</p>
    }



    return (
        <section id='profile'>
            <div className="profile-header">
                {user.profileImage && (
                    <img src={`${uploads}/images/users/${user.profileImage}`} alt={user.name} />
                )}
                <div className="profile-description">
                    <h2>{user.name}</h2>
                    <p>{user.bio}</p>
                </div>
            </div>
            {id === userAuth._id && (
                <>
                    <div className='new-photo' ref={newPhotoForm}>
                        <h3>Compartilhe algum momento seu:</h3>

                        <form onSubmit={handleSubmit}>
                        <label>
                                <span>Título para a foto:</span>
                                <input type="text" placeholder='Insira um titulo' onChange={(e) => setTitle(e.target.value)} value={title || ""} />
                            </label>
                            <label>
                                <span>Imagem:</span>
                                <input type="file" onChange={handleFile} />
                            </label>
                            {!loading && <input type="submit" value='Postar' />}
                            {loading && <input type="submit" value='Aguarde...' disabled />}
                           
                            
                            
                        </form>
                    </div>
                    <div className='edit-photo hide' ref={editPhotoForm}>
                        <p>Editando...</p>
                        {editImage && (
                            <img src={`${uploads}/images/photos/${editImage}`} alt={editTitle} />
                        )}
                        <form onSubmit={handleUpdate}>
                         
                            <input type="text" placeholder='Insira um titulo' onChange={(e) => setEditTitle(e.target.value)} value={editTitle || ""} />
                            <input type="submit" value='Atualizar' />
                            <button className='cancel-btn' onClick={handleCancelEdit}>Cancelar edição</button>

                        </form>
                    </div>
                    {errorPhoto && <Message msg={errorPhoto} type="error" />}
                    {messagePhoto && <Message msg={messagePhoto} type="success" />}

                </>

            )}
            <div className="user-photos">
                <h2>Fotos publicadas</h2>
                <div className="photos-container">
                    {photos && photos.map((photo) => (
                        <div className="photo" key={photo._id}>
                            {photo.image && (<img src={`${uploads}/images/photos/${photo.image}`} alt={photo.title} />)}

                            {id === userAuth._id ? (<div className="actions">

                                <Link to={`/photos/${photo._id}`}>
                                    <BsFillEyeFill /></Link>
                                <BsPencilFill onClick={()=> handleEdit(photo)} />
                                <BsXLg onClick={() => handleDelete(photo._id)} />
                            </div>
                            ) : (<Link className='btn' to={`/photos/${photo._id}`}>Ver mais</Link>)}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}


export default Profile
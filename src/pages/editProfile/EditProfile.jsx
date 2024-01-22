import './EditProfile.css'




import { uploads } from '../../utils/config'

// Hooks

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Redux

import { profile, resetMessage, updateProfile } from '../../slices/userSlice'

// Components

import Message from '../../components/message/Message'




const EditProfile = ()=> {


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [bio, setBio] = useState("")
    const [password, setPassword] = useState()
    const [profileImage, setProfileImage] = useState("")
    const [previewImage, setPreviewImage] = useState("")



    const dispatch = useDispatch()
    const {user, message, error, loading} = useSelector((state) => state.user)

   

    // load user data

    useEffect(()=> {
        dispatch(profile())
        
    }, [dispatch])

    // Fill form with user data
    useEffect(()=> {
        
        if(user){
            setName(user.name || "")
            setBio(user.bio || "")
            setEmail(user.email || "")
        }
    }, [user])

   



   


    const handleSubmit =  async(e) => {
        e.preventDefault()

        // Gather user data from states
        const userData = {
            name,
        }

        if(profileImage){
            userData.profileImage = profileImage
        }

        if(bio){
            userData.bio = bio
        }

        if(password){
            userData.password = password
        }

        // Build form data

        const formData = new FormData();

        for (const key in userData) {
          formData.append(key, userData[key]);
        }
      
        console.log(formData);
      

        await dispatch(updateProfile(formData))

        console.log(user.profileImage)


        setTimeout(()=> {
            dispatch(resetMessage())
        }, 2000)

    }


    const handleFile = (e)=> {

        //image preview

        const image = e.target.files[0]

        setPreviewImage(image)
        setProfileImage(image)
    }
    
    return(
        <section id='edit-profile'>
            <h2>Edite seus dados</h2>
            <p className='subtitle'>Adicione uma imagem de perfil e conte mais sobre você.</p>
            {(user.profileImage || previewImage) && (
                <img className='profile-image' src={previewImage ? URL.createObjectURL(previewImage) : `${uploads}/images/users/${user.profileImage}` } alt={user.name} />
            )}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Nome' onChange={(e) => setName(e.target.value)} value={name || ""} />
                <input type="email" placeholder='E-mail' disabled onChange={(e) => setEmail(e.target.value)} value={email || ""}/>
                <label>
                    <span>Imagem do perfil</span>
                    <input type="file" onChange={handleFile} />
                </label>
                <label>
                    <span>Bio:</span>
                    <input type="text" placeholder='Descrição do perfil' onChange={(e)=> setBio(e.target.value)} value={bio || ""} />
                </label>
                <label>
                    <span>Quer alterar sua senha?</span>
                    <input type="password" placeholder='Digite sua nova senha' onChange={(e)=> setPassword(e.target.value)} />
                </label>

                {!loading && <input type="submit" value='Atualizar'/>}
                {loading && <input type="submit" disabled value='Aguarde...'/>}
                {error && <Message msg={error} type='error'/>}
                {message && <Message msg={message} type='success'/>}
            </form>
        </section>
        
    )

}



export default EditProfile
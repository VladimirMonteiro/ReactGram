import './Photo.css'
import { uploads } from '../../utils/config'

// Components
import Message from '../../components/message/Message'
import { Link } from 'react-router-dom'


//Hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'


// Redux

import { getPhotoById, like, comment } from '../../slices/photoSlice'
import PhotoItem from '../../components/photoItem/PhotoItem'
import Like from '../../components/like/Like'


const Photo = () => {

    const { id } = useParams()

    const dispatch = useDispatch()
    const resetMessage = useResetComponentMessage(dispatch)
    const { user } = useSelector((state) => state.auth)
    const { photo, loading, error, message } = useSelector((state) => state.photo)

    //comentarios

    const [commentText, setCommentText] = useState("")

    //load data
    useEffect(() => {
        dispatch(getPhotoById(id))
    }, [dispatch, id])

    //comments links

    const handleLike = () => {
        dispatch(like(photo._id))
        resetMessage()

    }
    // insert a commment
    const handleComment = (e) => {
        e.preventDefault()

        console.log(commentText)

        const commentData = {
            comment: commentText,
            id: photo._id
        }

        dispatch(comment(commentData))

        setCommentText("")
        resetMessage()
        
        

       
    }

    if (loading) {
        return <p>Carregando...</p>
    }

    return (
        <section id='photo'>
            <PhotoItem photo={photo} />
            <Like photo={photo} user={user} handleLike={handleLike} />
            <div className="message-container">
                {error && <Message msg={error} type='error' />}
                {message && <Message msg={message} type='success' />}
            </div>
            <div className="comment">
                {photo.comments && (
                    <>
                        <h3>Comentários ({photo.comments.length}):</h3>
                        <form onSubmit={handleComment}>
                            <input
                                type="text"
                                placeholder="Insira seu comentário..."
                                onChange={(e) => setCommentText(e.target.value)}
                                value={commentText}
                            />
                            <input type="submit" value="Enviar" />
                        </form>
                        {photo.comments.length === 0 && <p>Não há comentários...</p>}
                        {photo.comments.map((comment) => (
                            <div className="comments" key={comment.comment}>
                                <div className="author">
                                    {comment.userImage && (
                                        <img
                                            src={`${uploads}/images/users/${comment.userImage}`}
                                            alt={comment.userName}
                                        />
                                    )}
                                    <Link to={`/users/${comment.userId}`}>
                                        <p>{comment.userName}</p>
                                    </Link>
                                </div>
                                <p>{comment.comment}</p>
                            </div>
                        ))}
                    </>
                )}


            </div>

        </section>
    )
}


export default Photo
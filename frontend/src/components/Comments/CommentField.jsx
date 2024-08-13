import { useState } from 'react'
import { useSelector } from 'react-redux'

import { useAddMovieCommentMutation } from '../../store/apiSlices/movieApiSlice'
import { selectActualUser } from '../../store/slices/authSlice'
import Button from '../Button/Button'
import s from './CommentField.module.css'

const CommentField = ({ movieId }) => {
  const user = useSelector(selectActualUser)
  const [comment, setComment] = useState('')
  const [sendComment] = useAddMovieCommentMutation()

  const handleComment = (e) => {
    setComment(e.target.value)
  }

  const handleSendComment = () => {
    sendComment({ user_id: user.id, user_comment: comment, movie_id: movieId })
    setComment('')
  }
  return (
    <div>
      <textarea value={comment} className={s.CommentField} placeholder='Type a comment...' onChange={handleComment}></textarea>
      <div className={s.buttonContainer}>
        <Button onClick={handleSendComment}>Post</Button>
      </div>
    </div>
  )
}

export default CommentField

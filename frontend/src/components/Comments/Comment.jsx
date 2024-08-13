import { useFetchMovieQuery } from '../../store/apiSlices/movieApiSlice'
import Spinner from '../Spinner/Spinner'
import s from './Comment.module.css'

import { FaUserCircle } from 'react-icons/fa'

const Comment = ({ movieId, getRandomColor, getRandomName }) => {
  const { data, isError, isLoading } = useFetchMovieQuery(movieId)
  let renderedComments

  if (isLoading) {
    renderedComments = <Spinner />
  } else if (isError) {
    renderedComments = <div style={{ color: 'red' }}>'Error while fetching film'</div>
  } else {
    renderedComments = data.comments.map((comment) => {
      return (
        <div className={s.Comment} key={comment.user_id}>
          <div className={s.profileContainer}>
            <FaUserCircle alt='Profile icon' size={50} style={{ display: 'block', color: getRandomColor() }} />
            <div className={s.nickname}>{getRandomName()}</div>
          </div>
          <div className={s.comment}>{comment.user_comment}</div>
        </div>
      )
    })
  }
  return renderedComments
}

export default Comment

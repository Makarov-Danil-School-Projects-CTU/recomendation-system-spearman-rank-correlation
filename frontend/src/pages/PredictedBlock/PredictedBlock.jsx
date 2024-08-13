import s from './PredictedBlock.module.css'

const PredictedBlock = ({ predictedData }) => {
  console.log(predictedData)

  return (
    <div className={s.PredictedBlock}>
      <div className={s.predictedInfo}>Title: <b>{predictedData.title}</b></div>
      <div className={s.predictedInfo}>Category: {predictedData.category}</div>
      <div className={s.predictedInfo}>Similar user rating: {predictedData.similar_user_rating}</div>
      <div className={s.predictedInfo}>Similar user id: {predictedData.similar_user_id}</div>
      <div className={s.predictedInfo}>Similar user correlation: {predictedData.similar_user_correlation}</div>
    </div>
  )
}

export default PredictedBlock

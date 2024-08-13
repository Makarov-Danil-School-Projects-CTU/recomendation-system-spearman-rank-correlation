import { ColorRing } from 'react-loader-spinner'

const Spinner = () => {
  return (
    <ColorRing
      visible={true}
      height='80'
      width='80'
      ariaLabel='blocks-loading'
      wrapperStyle={{}}
      wrapperClass='blocks-wrapper'
      colors={['#C05FD1', '#6A60E0', '#0875AC', '#415CA2']}
    />
  )
}

export default Spinner

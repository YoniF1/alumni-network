import Image from 'mui-image'
import './FrontPage.css'

const FrontPage = () => {

  return (
    <>
        <div>
        <Image className='logo' src="https://res.cloudinary.com/dfo5dyaua/image/upload/e_improve,e_sharpen/v1717777206/profile_pictures/Screenshot_2024-06-07_at_19.16.25_wgxezh.png"/>
        <Image className='picture' alt="The house from the offer." src="https://res.cloudinary.com/dfo5dyaua/image/upload/v1717776063/profile_pictures/dev_inst_alum_lnrc1p.jpg"/>
        </div>
    </>
   
  )
}

export default FrontPage
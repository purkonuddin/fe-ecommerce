import React, {useState} from 'react'
import {
    VectorLeft,
    VectorRight,
    EllipsePrimare,
    EllipseSecunder
} from '../../assets/properties'; 
import '../../styles/slide.css'

const ImageSlider = ({slides}) => { // takes in images as props 

    const [index, setIndex] = useState(0); // create state to keep track of images index, set the default index to 0
  
    const slideRight = () => {
      setIndex((index + 1) % slides.length); // increases index by 1
      console.log();
    };
  
    const slideLeft = () => {
      const nextIndex = index - 1;
      if (nextIndex < 0) {
        setIndex(slides.length - 1); // returns last index of images array if index is less than 0
      } else {
        setIndex(nextIndex);
      }
    };
  
    const RightSlide = ({currentIndex}) => {
      let rsindex = (currentIndex + 1) % slides.length
      return (
        <SlideWrap swindex={rsindex}/>
      )
    } 
  
    const SlideWrap = ({swindex}) => {
      let index = swindex
      const ColorCode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

      return (
        <div 
          className="wrap-slide-box"
          style={{
            backgroundColor: `${ColorCode}`,
            backgroundImage: `url(${slides[index].slide_image})`
          }}>
          {/* <img src={slides[index].slide_image} alt={slides[index].slide_name} width={'100%'} height={'303px'}/> */}
          <p className="p-slide-name">{slides[index].slide_name}</p>
        </div>
      )
    }
  
    const LeftSlide = ({currentIndex}) => {
      
      let lsindex = currentIndex - 1
      if (lsindex < 0) {
        lsindex = slides.length - 1
      } else {
        lsindex = currentIndex - 1
      } 
  
      return (
        <SlideWrap swindex={lsindex}/>
      )
    } 
  
    return (
        slides.length > 0 && (
        <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', overflow:'hidden', marginTop: '6.0em',  marginBottom: '1em', marginInline: '4em'}}>
          <button 
            style={{
              width: '52px',
              height: '52px',
              background: '#FFFFFF',
              boxShadow: '0px 4px 10px rgb(181 181 181 / 25%)',
              borderRadius: '52px',
              borderWidth: 'thin',
              borderColor: 'white',
              position:'absolute',
              left:'0px',
              marginInline:'5em',
              cursor:'pointer'
            }}
            onClick={slideLeft}><VectorLeft/></button>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'center', overflowInline:'hidden', width:'100%'}}>
             <LeftSlide currentIndex={index-1}/>
             <LeftSlide currentIndex={index}/>
             <SlideWrap swindex={index}/>
             <RightSlide currentIndex={index}/>
             <RightSlide currentIndex={index+1}/>
          </div> 
          <button 
           style={{
            width: '52px',
            height: '52px',
            background: '#FFFFFF',
            boxShadow: '0px 4px 10px rgb(181 181 181 / 25%)',
            borderRadius: '52px',
            borderWidth: 'thin',
            borderColor: 'white',
            position:'absolute',
            right:'0px',
            marginInline:'5em',
            cursor:'pointer'
          }}
          onClick={slideRight}><VectorRight/></button>
          <div style={{
            display: 'flex',
            position: 'absolute',
            top: '310px',
            left: '0px',
            marginInlineStart: '4em',
            marginBlock: '-2em',
            flexDirection:'row',
            backgroundColor:'unset'
          }}>{slides.map((data)=>(
                  <>
                   {data.id === slides[index].id 
                   ? <span style={{marginInlineEnd:'1px'}}><EllipsePrimare/></span>
                   : <span style={{marginInlineEnd:'1px'}}><EllipseSecunder/></span>} 
                  </>
              ))}
          </div>
        </div>
      )
    );
  };

//   const mapStateToProps = (state) => {
//     return {
//       auth: state.auth,
//       slide: state.auth
//     };
//   };
//   const Navigate = withRouter(ImageSlider);
  
  export default ImageSlider
import React, {useState} from 'react'
import {
    VectorLeft,
    EllipseCategory,
    EllipseSecunder
} from '../../assets/properties'; 
import '../../styles/category.css';

const CategoryComp = ({categories}) => { // takes in images as props 

    const [index, setIndex] = useState(0); // create state to keep track of images index, set the default index to 0
  
    const slideRight = () => {
      setIndex((index + 1) % categories.length); // increases index by 1
      console.log();
    };
  
    const slideLeft = () => {
      const nextIndex = index - 1;
      if (nextIndex < 0) {
        setIndex(categories.length - 1); // returns last index of images array if index is less than 0
      } else {
        setIndex(nextIndex);
      }
    };
  
    const RightSlide = ({currentIndex}) => {
      let rsindex = (currentIndex + 1) % categories.length
      return (
        <SlideWrap swindex={rsindex}/>
      )
    } 
  
    const SlideWrap = ({swindex}) => {
      let index = swindex
      const ColorCode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
 
      return (
        <div id="category-slide-comp" style={{
          backgroundColor: `${ColorCode}`,
          backgroundImage: `url(${categories[index].category_image})`
        }}>
          {/* <img src={slides[index].slide_image} alt={slides[index].slide_name} width={'100%'} height={'100%'}/> */}
          <p className="p-category-name">{categories[index].category_name}</p>
        </div>
      )
    }
  
    const LeftSlide = ({currentIndex}) => {
      
      let lsindex = currentIndex - 1
      if (lsindex < 0) {
        lsindex = categories.length - 1
      } else {
        lsindex = currentIndex - 1
      } 
  
      return (
        <SlideWrap swindex={lsindex}/>
      )
    } 
  
    return (
      categories.length > 0 && (
        <div id="home-category" className="categry-wrap">
            <div className="c-left-side">
                <div>
                  <h2>Category</h2>
                  <p>What are you currently looking for</p>
                </div>
                {categories.length > 1 &&
                  <div className="wrap-nav-category">
                    <button className="nav-left-btn" onClick={slideLeft}><VectorLeft/></button>
                    <button className="nav-right-btn" onClick={slideRight}><VectorLeft/></button>
                  </div>
                }
            </div>
         
            <div className="c-right-side">
             
                {categories.length <= 1 
                  ? (<SlideWrap swindex={index}/>)
                  :  categories.length <= 2 
                    ? (
                      <div>
                      <SlideWrap swindex={index}/>
                      <RightSlide currentIndex={index}/>
                      </div>
                    )
                    : categories.length <= 3 
                      ? (
                        <div>
                        <LeftSlide currentIndex={index}/>
                        <SlideWrap swindex={index}/>
                        <RightSlide currentIndex={index}/>
                        </div>
                      ) : (
                        <div>
                        {/* <LeftSlide currentIndex={index-1}/> */}
                        <LeftSlide currentIndex={index}/>
                        <SlideWrap swindex={index}/>
                        <RightSlide currentIndex={index}/>
                        <RightSlide currentIndex={index+1}/>
                        <RightSlide currentIndex={index+2}/>
                        </div>
                      )

                } 
              
                
              <div className="dot-category-nav">{categories.map((data)=>(
                        <>
                        {data.id === categories[index].id 
                        ? <span style={{marginInlineEnd:'1px'}}><EllipseCategory/></span>
                        : <span style={{marginInlineEnd:'1px'}}><EllipseSecunder/></span>} 
                        </>
                    ))}
              </div>
            </div>  
        </div>
      )
    );
  }; 
  
  export default CategoryComp
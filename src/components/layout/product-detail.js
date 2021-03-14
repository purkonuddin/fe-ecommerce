import React from 'react'; 
// import { Breadcrumb,  } from "react-bootstrap"; 
import {Star, Star22} from '../../assets/properties' 

const NumberFormat = ({value, prefix} ) => { 
    const data = prefix + value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    return ( <p className="product-price">{data}</p>)
}

const ImageWrap = function ({ dataImages, handleTab, myRef }) {
    const images = dataImages;
    // console.log('@images: ',images);
    return (
      <div className="thumb" ref={myRef}>
      {
        images.map((img, i)=>(
        <img src={img} alt="" key={i} onClick={()=>handleTab(i)}/>
        ))
      }
      </div>
    );
}

const ColorsComp = ({dataColors, colorsRef, handleCheckChieldElement})=> {
  let colors = dataColors;
  // console.log('@colors: ', colors);
  return (
    <div className="colors" ref={colorsRef}>
      {colors.map((color, i)=>(
      // <button style={{background:`#${color}`}} key={i}> </button>
      <div key={i} className="color-container">
        <input type="radio" checked={false} value={color} onChange={(e)=>handleCheckChieldElement(i,e)} id="color-toggle"/> 
        <button type="button"  style={{backgroundColor:`#${color}`}}></button>
      </div>
      ))}
  </div>
  )
} 

const ProductDetail = (props) => {
      const {
        data, 
        handleJumlah, 
        handleSize, 
        sizeRef, 
        colorsRef, 
        myRef, 
        index, 
        sizeIdx, 
        handleTab, 
        handleColor, 
        jumlah,
        BreadCrumb,
        handleAddBag,
        disabledAddBtn,
      } = props

      return (    
        <div className="details" key={data.id}>
        <div id="breadcrumb">
        {BreadCrumb}
        </div>
        <div>
          {data.product_image !== '' ? (
            <>
              <div className="big-img">
                <img src={data.product_image[index]} alt=""/>
              </div>
              <ImageWrap dataImages={data.product_image} handleTab={handleTab} myRef={myRef}/> 
            </>
            ) : (
              <div className="prod-image-box big-img">
                <p>No Picture</p>
              </div>
            )
          }
        </div>
        <div className="box">
          <div className="row">
            <h2> {data.product_name} </h2>
          </div>
          <p className="redup"> {data.seller} </p>
          <p className="star"><Star/><Star/><Star/><Star/><Star/><span className="redup">({data.product_rating})</span></p>
          <div>
            <p className="subtitle redup">Price</p>
            <NumberFormat value={data.product_price} prefix={'Rp. '} />
          </div>
          <div>
            <p className="subtitle">Colors</p>
            <ColorsComp dataColors={data.product_color} colorsRef={colorsRef} handleCheckChieldElement={handleColor}/>
          </div>
          <div style={{display: 'flex'}}>
            <div>
              <p className="subtitle">size</p>
              <div>
                <button type="button" className="ellipse-9" onClick={()=>handleSize('min', data.product_size)}>{'<'}</button> 
                {
                  data.product_size.map( (size, i) =>
                  i === sizeIdx ? (
                    <span key={i.toString()} ref={sizeRef}>{size}</span>

                  ) : null
                )}   
                {/* {product_size === '' ? data.product_size[0] : product_size} */}
                <button type="button" className="ellipse-10" onClick={()=>handleSize('max', data.product_size)}>{'>'}</button> 
              </div>
            </div>
            <div>
              <p className="subtitle">jumlah</p>
              <div>
                <button type="button" className="ellipse-9" onClick={()=>handleJumlah('min', data.product_stock)}>-</button>{jumlah}
                <button type="button" className="ellipse-10" onClick={()=>handleJumlah('plus', data.product_stock)}>+</button>   
              </div>
            </div>
          </div>
          <div className="detail-btn-box">
            <button type="button" className="mr-3 mb-3" > chat </button> {' '}
            <button disabled={disabledAddBtn} type="button" className="mr-3 mb-3" onClick={handleAddBag} > add bag </button> {' '}
            <button disabled={disabledAddBtn} type="button" className="buy-now mr-3 mb-3"> buy now </button>
          </div>
        </div>
        <div className="box-detail">
          <h2>Informasi Produk</h2>
          <p className="subtitle">Condition</p>
          <p className="subtitle condition"> {data.product_condition} </p>
          <p className="subtitle">Description</p>
          <p className="redup"> {data.product_description} </p>
        </div>
        <div className="product-review">
          <h2>Product review</h2>
          <div>
            <div className="left-start">
              <p id="num-start">5.0<span>/10</span></p>
              <p><Star22/><Star22/><Star22/><Star22/><Star22/></p>
            </div>
            <div className="grafik">
              {
                [{bintang:1, rating:4},{bintang:2, rating:4},{bintang:3, rating:2},{bintang:4, rating:3},{bintang:5, rating:0}].sort((a,b)=>(a.bintang < b.bintang) ? 1 : -1).map((data, index) => 
                <p key={index.toString()}><Star/> {'   '} {data.bintang} {'   '} <span id="grafik-line" style={{paddingInline:`${data.rating}em`}}></span>{'   '}<span>{data.rating}</span></p>
                )
              }
            </div>

          </div>

        </div>
      </div>
    )
}  

export default  ProductDetail;

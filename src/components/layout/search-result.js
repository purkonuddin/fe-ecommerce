import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getProducts } from '../../redux/actions/product';
import '../../styles/product.css'
import {Star} from '../../assets/properties'
import { Link } from 'react-router-dom';
import Loader from '../Loader';

const ImageWrap = function ({ images }) {
    const image = images;
    return (
      // eslint-disable-next-line jsx-a11y/img-redundant-alt
      <img 
        src={`${image[0]}`} 
        alt={"image"}
        width="208" 
        height="136"/>
    );
}
  
const NumberFormat = ({value, prefix} ) => { 
    const data = prefix + value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    return ( <p className="product-price">{data}</p>)
}

const SearchComponent = (props) => {
    const { data, title, subtitle, _isProcess} = props;
    // console.log(props.product.searchProducts.isFulfilled);
  
    return (
      <>
        <div className="top-product">
          <h2>{title}</h2>
          {subtitle &&
          <p>{subtitle}</p>
          }
        </div>
        <div className="wrap-product"> 
        {props.product.searchProducts.isFulfilled && 
            data.length > 0 ? ( 
                <>
                {data.map((p, i) =>  
                    <Link to={`/product/${p.product_category}/${p.product_id}`} key={p.id.toString()} >
                        <div id="wrap-product-list">
                        <div className="prod-image-box">
                            {p.product_image !== '' 
                            ? <ImageWrap images={p.product_image}/>
                            : <p>No Picture</p>
                            }
                        </div>
                        <div className="prod-description-box">
                            <h3 className="product-name">{p.product_name}</h3> 
                            <NumberFormat value={p.product_price} prefix={'Rp. '} />
                            <p className="seller">{p.seller}</p>
                            <p className="star"><Star/><Star/><Star/><Star/><Star/>({p.product_rating})</p>
                        </div>
                        </div>
                    </Link>
                )}  
                {props.product.searchProducts.data.pages > 1 && 
                    <p>tampilkan pagination</p>
                }
                </>
            ) : (
                <p>result 0, ...atau atur filter pencarian pada navbar mungkin mempengaruhi hasil pencarian!</p>
            )
        }
        </div>
      </>
    )
  }
  
  export {SearchComponent}
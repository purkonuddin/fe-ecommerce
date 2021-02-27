import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getProducts } from '../../redux/actions/product';
import '../../styles/product.css'
import {Star} from '../../assets/properties'

const ImageWrap = function ({ images }) {
  const image = images.split(',');
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

class Product extends Component { 

  render() {
    const { product, title, subtitle, sortBy, limit = 10} = this.props;
    if (product.isFulfilled && sortBy === 'product_rating') {
      product.getProducts.data.sort((a, b) => (a.product_rating < b.product_rating) ? 1 : -1)
    }
    
    if (product.isFulfilled && sortBy === 'id') {
      product.getProducts.data.sort((a, b) => (a.id < b.id) ? 1 : -1)
    } 

    if (product.isFulfilled){
      product.getProducts.data.filter(data => 
        (data.product_color.includes('Red') || data.product_color.includes('Biru')) && 
        data.product_size.includes('S') && 
        data.product_category === 't-shirt'
        ).map((data, i) =>
        console.log('@Red-filter', data.id, data.product_color, data.product_size)
      )

    }

    return (
      <>
      <div className="top-product">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="wrap-product"> 
        {product.isFulfilled && 
         product.getProducts.data.map((data, i) => 
          i < limit && (
            <div key={data.id} id="wrap-product-list">
            <div className="prod-image-box">
              {data.product_image !== '' 
                ? <ImageWrap images={data.product_image}/>
                : <p>No Picture</p>
              }
            </div>
            <div className="prod-description-box">
              <h3 className="product-name">{data.product_name}</h3> 
              <NumberFormat value={data.product_price} prefix={'Rp. '} />
              <p className="seller">{data.seller}</p>
              <p className="star"><Star/><Star/><Star/><Star/><Star/>({data.product_rating})</p>
            </div>
          </div>
          ) 
         )
        }
      </div>
      </>
       
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};

export default connect(mapStateToProps)(Product);

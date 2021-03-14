import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getProducts } from '../../redux/actions/product';
import '../../styles/product.css'
import {Star} from '../../assets/properties'
import { Link } from 'react-router-dom';

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

class ProductSeller extends Component { 
  componentDidMount() {
    
  }

  render() {
    const { searchTerm, product, sortBy, filter} = this.props;
    if (product.isFulfilled && sortBy === 'product_rating') {
      product.getProducts.data.sort((a, b) => (a.product_rating < b.product_rating) ? 1 : -1)
    }
    
    if (product.isFulfilled && sortBy === 'id') {
      product.getProducts.data.sort((a, b) => (a.id < b.id) ? 1 : -1)
    } 

    if (product.isFulfilled && searchTerm !== undefined){ 
      let warna = []
      let kategori = []
      let ukuran = []
      let merek = []

      if (filter.filterIsApply){  
        filter.colors.map((color) => 
          color.isChecked &&
            warna.push(color.value)
        );

        filter.categories.map((category) => 
          category.isChecked &&
            kategori.push(category.value)
        );

        filter.sizes.map((size) => 
          size.isChecked &&
            ukuran.push(size.value)
        );

        filter.brands.map((brand) => 
            merek.push(brand)
        );
      }


      console.log('hasil filters: ', warna, kategori, ukuran, merek); 
    }

    if(product.isFulfilled && searchTerm !== undefined){
      const filterField = (search, value) => value.toLowerCase().indexOf(search.toLowerCase()) >= 0;
      const orFilter = (search, values) => values.some(filterField.bind(null, search));
      const newlyDisplayed = product.getProducts.data.filter(data =>
        orFilter(searchTerm.toLowerCase(), [data.product_name, data.product_description, data.seller])
      ); 

      // const newlyDisplayed = product.getProducts.data.filter(data => 
      //   data.product_name.includes(searchTerm.toLowerCase()) &&
      //   (data.product_color.includes('Red') || data.product_color.includes('Biru')) && 
      //   data.product_size.includes('S')
      // );
      return (
        <WrapProduct fields={newlyDisplayed} {...this.props}/>
      )
    } 

    return (
      <WrapProduct fields={product.getProducts.data} {...this.props}/> 
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
    filter: state.filter,
  };
};

export default connect(mapStateToProps)(ProductSeller);


const WrapProduct = (props) => {
  const { fields, product, title, subtitle, refdata, navTo} = props;

  return (
    <>
      <div className="top-product">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="wrap-product"> 
        {product.isFulfilled && 
         fields.map((data, i) => 
          (data.seller === refdata.seller && refdata.id !== data.id) && (
            <Link to={`/product/${data.product_category}/${data.product_id}`} onClick={()=>navTo(data.product_id)} key={data.id.toString()} >
              <div id="wrap-product-list">
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
            </Link>
          ) 
         )
        }
      </div>
    </>
  )
}

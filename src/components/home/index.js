import React, { Component } from "react";
import { connect } from "react-redux";
import NavbarComp from "../layout/navbar"; 
import ImageSlider from "../layout/slide"; 
import CategoryComp from "../layout/category";
import Product from "../layout/product"
import '../../styles/home.css'
import { getSlide } from "../../redux/actions/slide";
import { getCategories } from "../../redux/actions/category"; 
import { getProducts } from '../../redux/actions/product';

class Home extends Component {
  constructor(props) {
    super(props);

    this.mediaQuery = {
        desktop: 1200,
        tablet: 768,
        phone: 576,
      };

    this.state = { 
      windowWidth: document.body.clientWidth,
    };
  }

  getProducts = async () => {
    const data = {sort: 'DESC'};
    await this.props.dispatch(getProducts(data));
  }; 

  componentDidMount = async () => {
    await this.props.dispatch(getSlide());
    await this.props.dispatch(getCategories());
    await this.getProducts();
  }

  render() {
    return (
      <div> 
        <NavbarComp />
        <div>
          {this.props.slide.isFulfilled &&
            <ImageSlider slides={this.props.slide.getSlides.data}/>
          } 
          {this.props.category.isFulfilled &&
           <CategoryComp categories={this.props.category.getCategories.data}/>
          } 
          <Product title="New" subtitle="You’ve never seen it before!" product={this.props.product} sortBy="id" limit={5}/> 
          <Product title="Popular" subtitle="Find clothes that are trending recently" product={this.props.product} sortBy="product_rating" limit={10}/> 
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    slide: state.slide,
    category: state.category,
    product: state.product,
  };
};

export default connect(mapStateToProps)(Home);

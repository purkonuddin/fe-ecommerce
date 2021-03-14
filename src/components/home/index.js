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
      searchTerm: '',
		  currentlyDisplayed: {},
      windowWidth: document.body.clientWidth,
    };
  } 

  onInputChange = (event) => {
    const newlyDisplayed = this.props.product.getProducts.data.filter(data => data.product_name.includes(event.target.value.toLowerCase()));
    this.setState({
      searchTerm: event.target.value,
      currentlyDisplayed: newlyDisplayed
    }); 

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
    // console.log('@currentlyDisplayed: ',this.state.currentlyDisplayed);
    // console.log('@searchTerm: ',this.state.searchTerm);
    const {currentlyDisplayed, searchTerm} = this.state;

    return (
      <div> 
        <NavbarComp searchTerm={this.onInputChange.bind(this)}/>
        <div>
          {this.props.slide.isFulfilled &&
            <ImageSlider slides={this.props.slide.getSlides.data}/>
          } 
          {this.props.category.isFulfilled &&
           <CategoryComp categories={this.props.category.getCategories.data}/>
          } 
          {this.state.searchTerm !== '' &&
            <Product title="Search" subtitle="hasil pencarian berdasarkan nama product" data={currentlyDisplayed} sortBy="product_name" limit={10} searchTerm={searchTerm}/> 
          }
          { this.props.product.isRejected ? (
            <div><p>{`Status: ${this.props.product.rejected.status}, Message: ${this.props.product.rejected.message}`}</p></div>
          ) : this.props.product.isPending ? (
            <div><p>Loading...</p></div>
          ) : (
            <>
              <Product title="New" subtitle="You’ve never seen it before!" product={this.props.product} sortBy="id" limit={5}/> 
              <Product title="Popular" subtitle="Find clothes that are trending recently" product={this.props.product} sortBy="product_rating" limit={10}/> 
            </>
          )
        }
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

import React, { Component } from "react";
import { connect } from "react-redux";
import NavbarComp from "../layout/navbar"; 
import ImageSlider from "../layout/slide"; 
import CategoryComp from "../layout/category";
import Product from "../layout/product"
import {SearchComponent} from "../layout/search-result"
import '../../styles/home.css'
import { getSlide } from "../../redux/actions/slide";
import { getCategories } from "../../redux/actions/category"; 
import { getProducts, searchProducts } from '../../redux/actions/product'; 

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
		  currentlyDisplayed: [],
      windowWidth: document.body.clientWidth,
      isProsess: false
    };
  } 

  handleSearchTerm = async() => {
    this.setState({isProsess: true})
    let {warna, filterColors, kategori, filterSize, ukuran, filterKategori, merek, filterMerek} = []; 
    if(this.props.filter.filterIsApply){
      warna = await this.props.filter.colors;
      ukuran = await this.props.filter.sizes;
      merek = await this.props.filter.brands;
      kategori = await this.props.filter.categories;
      if(warna.length > 0){
          filterColors = warna.filter(w=> {return w.isChecked === true}).map(w=>{return w.value})
      }
      if(ukuran.length>0){
          filterSize = ukuran.filter(u=>{return u.isChecked === true}).map(u=>{return u.value})
      }
      if(merek.length>0){
        filterMerek = merek
      }
      if(kategori.length>0){
        filterKategori = kategori.filter(k=>{return k.isChecked === true}).map(k=>{return k.value})
      }
      // console.log(filterMerek); 
      // console.log(filterKategori); 
    }
    const searchData = { sort: 'DESC', limit:1000, order_by: 'product_name', product_name: this.state.searchTerm };
    await this.props.dispatch(searchProducts(searchData));
    let filteredSearchResult = []
    if(this.props.product.searchProducts.isFulfilled){
      if(this.props.filter.filterIsApply){
        // let dtprd=await this.props.product.searchProducts.data.data
        // if(dtprd.length>0){
          filteredSearchResult = this.props.product.searchProducts.data.data.filter(data => data.product_color.includes(filterColors[0]) || data.product_size.includes(filterSize[0]));
        // } 
      }else{
        filteredSearchResult = this.props.product.searchProducts.data.data
      }
      
      // console.log(filterColors);
      // console.log(filterSize); 
      // console.log(filteredSearchResult);
      this.setState({ 
        currentlyDisplayed: filteredSearchResult,
        isProsess: false
      });
    } 
  }

  onInputChange = (event) => {
    // console.log(event.target.value);
    // const newlyDisplayed = this.props.product.getProducts.data.filter(data => data.product_name.includes(event.target.value.toLowerCase()));
    this.setState({
      searchTerm: event.target.value,
      // currentlyDisplayed: newlyDisplayed
    }); 

  }

  getProducts = async () => {
    const data = {sort: 'DESC', limit:100};
    await this.props.dispatch(getProducts(data));
  }; 

  componentDidMount = async () => {
    await this.props.dispatch(getSlide());
    await this.props.dispatch(getCategories());
    await this.getProducts();
  }

  render() { 
    // console.log('@currentlyDisplayed: ',this.state.currentlyDisplayed.length);
    // console.log('@searchTerm: ',this.state.searchTerm);
    const {currentlyDisplayed, searchTerm, isProsess} = this.state;

    return (
      <div> 
        <NavbarComp searchTerm={(e)=> this.setState({searchTerm: e.target.value})} handleSearchTerm={this.handleSearchTerm.bind(this)}/>
        <div>
          {this.props.slide.isFulfilled &&
            <ImageSlider slides={this.props.slide.getSlides.data}/>
          } 
          {this.props.category.isFulfilled &&
           <CategoryComp categories={this.props.category.getCategories.data}/>
          } 
          {this.state.searchTerm !== '' ? ( 
              <SearchComponent _isProcess={isProsess} title="Search" subtitle="hasil pencarian berdasarkan nama product" data={currentlyDisplayed} {...this.props}/>
            // <Product title="Search" subtitle="hasil pencarian berdasarkan nama product" data={currentlyDisplayed} sortBy="product_name" limit={100} searchTerm={searchTerm}/> 
          ): null
          }
          { this.props.product.isRejected ? (
            <div><p>{`Status: ${this.props.product.rejected.status}, Message: ${this.props.product.rejected.message}`}</p></div>
          ) : this.props.product.isPending ? (
            <div><p>Loading...</p></div>
          ) : (
            <>
              <Product title="New" subtitle="You’ve never seen it before!" product={this.props.product} sortBy="id" limit={20}/> 
              <Product title="Popular" subtitle="Find clothes that are trending recently" product={this.props.product} sortBy="product_rating" limit={100}/> 
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
    filter: state.filter
  };
};

export default connect(mapStateToProps)(Home);

/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { connect } from "react-redux"; 
import { Link, withRouter } from 'react-router-dom'; 
import { logout } from "../../redux/actions/auth";
import { filterDiscard, filterApply} from "../../redux/actions/filter";
import { FormControl, Form, Navbar, Nav } from "react-bootstrap";
import {SearchSvg, FilterSvg, ShopingCartSvg, BellSvg, MailSvg, LogoSvg} from '../../assets/properties';
import {ModalPop} from './modal';
import '../../styles/navbar.css' 

const CheckBox = props => {
  return (
    <div className={props.styles}>
      <input id={props.inputId} onChange={props.handleCheckChieldElement} type="checkbox" checked={props.isChecked} value={props.value} /> 
      <button type="button"  style={props.isChecked ? {backgroundColor:'#DB3022', color:'#FFFFFF'} : {backgroundColor:'#FFFFFF',  color:'#000000'}}>{props.value}</button>
    </div> 
  )
}

const CheckBoxColor = props => {
  return (
    <div className={props.styles}>
      <input id={props.inputId} onChange={props.handleCheckChieldElement} type="checkbox" checked={props.isChecked} value={props.value} /> 
      <button type="button"  style={{backgroundColor:`#${props.value}`}}>{' '}</button>
    </div> 
  )
}

const defaultFilters = {
  colors: [
    {id: 1, value: "020202", isChecked: false},
    {id: 2, value: "FFFFFF", isChecked: false},
    {id: 3, value: "B82222", isChecked: false},
    {id: 4, value: "BEA9A9", isChecked: false},
    {id: 5, value: "E2BB8D", isChecked: false},
    {id: 6, value: "151867", isChecked: false},
  ],
  sizes: [
    {id: 1, value: "XS", isChecked: false},
    {id: 2, value: "S", isChecked: false},
    {id: 3, value: "M", isChecked: false},
    {id: 4, value: "L", isChecked: false},
    {id: 5, value: "XL", isChecked: false},
  ],
  categories: [
    {id: 1, value: "Woman", isChecked: false},
    {id: 2, value: "Man", isChecked: false},
    {id: 3, value: "Boys", isChecked: false},
    {id: 4, value: "Girl", isChecked: false},
  ], 
  brands: [ 
    {id: 1, value: "adidas Originals", name: "adidas Originals"},
    {id: 2, value: "Jack & Jones", name: "Jack & Jones"},
    {id: 3, value: "s.Oliver", name: "s.Oliver"}, 
  ],
}

class NavbarComp extends Component { 
  constructor(props) {
    super(props);
 
    this.state = {   
      colors: defaultFilters.colors,
      sizes: defaultFilters.sizes,
      categories: defaultFilters.categories, 
      brands: defaultFilters.brands,
      brand: '',
      selections: [],
    };
  }

  componentDidMount = async () => {
  }

  handleAllCategories = (event) => {
    let categories = this.state.categories
    categories.forEach(category => category.isChecked = event.target.checked) 
    this.setState({categories: categories})
  }

  handleCheckCategoriesChieldElement = (event) => {
    let categories = this.state.categories
    categories.forEach(category => {
       if (category.value === event.target.value)
       category.isChecked =  event.target.checked
    })
    this.setState({categories: categories})
  }

  handleCheckSizesChieldElement = (event) => {
    let sizes = this.state.sizes
    sizes.forEach(size => {
       if (size.value === event.target.value)
       size.isChecked =  event.target.checked
    })
    this.setState({sizes: sizes})
  }

  handleCheckColorsChieldElement = (event) => {
    let colors = this.state.colors
    colors.forEach(color => {
       if (color.value === event.target.value)
       color.isChecked =  event.target.checked
    })
    this.setState({colors: colors})
  }

  onSeletionChange = val => {
    let sels = [...this.state.selections];
    if (sels.includes(val)) {
      sels = sels.filter(x => x !== val);
    } else {
      sels.push(val);
    }
    this.setState({selections: sels})
  }

  onLogout() {
    this.props.dispatch(logout());
  } 

  applyFilter = async () => {
    await this.props.dispatch(filterApply(this.state))
    this.props.filter.filterIsApply &&
      this.setState({
        colors: this.props.filter.colors,
        sizes: this.props.filter.sizes,
        categories: this.props.filter.categories,
        selections: this.props.filter.brands,

      })
  }

  applyDiscard = async() => {
    await this.props.dispatch(filterDiscard())
    let myFilters = defaultFilters
    this.setState({
      colors: myFilters.colors,
      sizes: myFilters.sizes,
      categories: myFilters.categories,
      selections: [],
      brands: myFilters.brands,
    })
  }

  render() {
    // console.log(this.state.selections);
    const {searchTerm} = this.props;
    return (
      <>
      <Navbar collapseOnSelect expand="lg" variant="light" bg="light" fixed="top" className="pr-lg-5 pl-lg-5">
        <Navbar.Brand href="#home">
          <LogoSvg/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Form inline  className="mr-auto ml-auto">
            <FormControl type="text" placeholder="product's name, descriptions, seller"  onChange={searchTerm}/>
            <button type="button" className="btn btn-search-svg" >
              <SearchSvg/>
            </button>   
            <div>
            <ModalPop 
              ModalContent={
                <>
                <div id="filter">
                  <div className="filter-header">
                  <p>Color</p>
                  </div>
                  <div className="filter-content">
                  {
                    this.state.colors.map((color) => {
                      return (<CheckBoxColor key={color.id.toString()} inputId={"color-toggle"} styles={color.isChecked ? "color-container ellipse" : "color-container"} handleCheckChieldElement={this.handleCheckColorsChieldElement}  {...color} />)
                    })
                  }
                  </div> 
                </div>
                
                <div className="modal-line"/>
                <div id="filter">
                  <div className="filter-header">
                  <p>Size</p>
                  </div>
                  <div className="filter-content">
                  { 
                    this.state.sizes.map((size) => {
                      return (<CheckBox key={size.id.toString()} inputId={"size-toggle"} styles={"size-container"} handleCheckChieldElement={this.handleCheckSizesChieldElement}  {...size} />)
                    })
                  }
                  </div>
                </div>
                <div className="modal-line"/>
                <div id="filter">
                  <div className="filter-header">
                  <p>Category</p>
                  </div>
                  <div className="filter-content">
                    <div className="category-container"> 
                      <input id="category-toggle" type="checkbox" value="All" checked={this.state.checked}  onChange={this.handleAllCategories}/>
                      <button style={this.state.checked ? {backgroundColor:'red'}: {backgroundColor:'#FFFFFF'}}>All</button>
                    </div> 
                    { 
                      this.state.categories.map((category) => {
                        return (<CheckBox key={category.id.toString()}  inputId={"category-toggle"} styles={"category-container"} handleCheckChieldElement={this.handleCheckCategoriesChieldElement}  {...category} />)
                      })
                    }
                  </div>
                </div> 
                <div className="modal-line"/>
                <div id="filter">
                  <div className="filter-header">
                    <p>Brand</p> 
                  </div>
                  <div className="filter-content">
                    <div className="category-container">
                      <p>
                      {this.props.filter.filterIsApply &&
                        this.state.selections !== undefined && this.state.selections.length !== 0
                        ? (this.state.selections.map((brand) => `${brand}, ` ))
                        : null
                      }
                      </p>
                    </div>
                    <div className="category-container">
                      { 
                        <select 
                          id="brand" 
                          className="form-control select2" 
                          value={this.state.selections} 
                          onChange={(e) => {
                            // console.log(e.target.value);
                            this.onSeletionChange(e.target.value); 
                          } }
                          title="brand"
                          multiple={true}>
                          {/* <option value="" key="">Select</option> */}
                          {(this.state.brands !== undefined) &&
                            this.state.brands.map((brand, key) =>
                              <option key={key} value={brand.value}>{brand.name}</option>
                            )
                          }
                        </select>
                      }
                      
                    </div> 
                  </div>
                </div>
               </>
              }
              ButtonComp={
                <button type="button" >
                  <FilterSvg/>
                </button>  
              }
              ModalBottom={
                <>
                <button type="button" onClick={this.applyDiscard.bind(this)} className={this.props.filter.filterIsApply ? "" : "filter-apply"}>Discard</button>
                <button type="button" onClick={this.applyFilter.bind(this)} className={this.props.filter.filterIsApply ? "filter-apply" : ""}>Apply</button>
                </>
              }
            />
            </div>
          </Form> 
          
          <Nav>
            <Nav.Link href="#deets"><ShopingCartSvg/></Nav.Link>
            {/* <button className="btn"><ShopingCartSvg/></button> */}

            {this.props.auth.isAuthenticated 
              ? <>
                <Nav.Link eventKey={2} href="#memes">
                  <BellSvg/>
                </Nav.Link>
                <Nav.Link href="#"><MailSvg/></Nav.Link>
                <Link
                  className="nav-link"
                  id=""
                  onClick={this.onLogout.bind(this)}
                >
                  Logout
                </Link>
                </>
              : <> 
                <Link
                  className="btn btn-secondary btn-block btn-block-nav"
                  id=""
                  // onClick={this.onLogin.bind(this)}
                  to="/login"
                >
                    Login
                </Link>
                <Link
                  className="btn btn-outline-secondary btn-block-nav"
                  id=""
                  // onClick={this.onSignup.bind(this)}
                  to="/sign-up"
                >
                    Signup
                </Link> 
              </>
            }   
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    filter: state.filter,
  };
};
const Navigate = withRouter(NavbarComp);

export default connect(mapStateToProps)(Navigate);

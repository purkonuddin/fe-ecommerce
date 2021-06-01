/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { connect } from "react-redux"; 
import { Link, withRouter } from 'react-router-dom'; 
import { logout } from "../../redux/actions/auth";
import { filterDiscard, filterApply} from "../../redux/actions/filter";
import { getCart} from "../../redux/actions/checkout";
import { FormControl, Form, Navbar, Nav, Badge } from "react-bootstrap";
import {SearchSvg, FilterSvg, ShopingCartSvg, BellSvg, MailSvg, LogoSvg, customer, notification} from '../../assets/properties';
import {ModalPop} from './modal';
import '../../styles/navbar.css' 

const CheckBox = (props) => {
  const {
    keyValue,
    inputId,
    value,
    handleCheckChieldElement,
    styles,
    isChecked,
  }= props

  return (
    <div className={styles} key={keyValue}>
      <input
      //  id={`${inputId}-${value}`} 
       onChange={handleCheckChieldElement} 
       type="checkbox" 
       checked={isChecked} 
       value={value} /> 
      <button type="button"  style={isChecked ? {backgroundColor:'#DB3022', color:'#FFFFFF'} : {backgroundColor:'#FFFFFF',  color:'#000000'}}>{value}</button>
    </div> 
  )
}

const CheckBoxColor = ({
  _key,
  styles,
  handleCheckChieldElement,
  isChecked,
  value,
}) => {  
    <div className={styles} key={_key}>
      <input
        // id={`${props.inputId}-${props.value}`} 
        onChange={handleCheckChieldElement} 
        type="checkbox" 
        checked={isChecked} 
        value={value} /> 
        <button 
          type="button"  
          style={{backgroundColor:`#${value}`}}>{' '}
        </button>
    </div>  
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

    this.mediaQuery = {
      desktop: 1200,
      tablet: 768,
      phone: 476,
    };
 
    this.state = {   
      colors: defaultFilters.colors,
      sizes: defaultFilters.sizes,
      categories: defaultFilters.categories, 
      brands: defaultFilters.brands,
      brand: '',
      selections: [],
      user: {},
      windowWidth: document.body.clientWidth,
      cartnumber: 0,
      token:'',
      crt: 0,
    };
  }

  notifyRef = React.createRef();
  profileRef = React.createRef();

  componentDidMount = async () => { 
    if(this.props.auth.isAuthenticated){
      this.setState({
        user: await this.props.auth.profile,
        token: await this.props.auth.profile.token,
      })
    } 

    let config = `Bearer ${this.state.token}`;
    await this.props.dispatch(getCart(config))
    
    if(this.props.checkout.getCart.isFulfilled){
      const carts = await this.props.checkout.getCart.data.result;
      this.setState({cartnumber: carts.length})
    }
  }

  componentDidUpdate = async (props) => {
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

  onLogout = async()=> {
    await this.props.dispatch(logout());
    this.props.history.push('/');
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

  handleToSearchPage = () =>{
    this.props.history.push('/');
  }

  handleNotify(){
    let togglevisible = this.notifyRef.current
    if(togglevisible.className === 'notification-box toggle-notify-hidden'){
      togglevisible.className = togglevisible.className.replace("toggle-notify-hidden", "")
    }else{
      togglevisible.className = 'notification-box toggle-notify-hidden'
    } 
  }

  handleProfileRef(){
    let togglevisible = this.profileRef.current
    if(togglevisible.className === 'profile-box toggle-notify-hidden'){
      togglevisible.className = togglevisible.className.replace("toggle-notify-hidden", "")
    }else{
      togglevisible.className = 'profile-box toggle-notify-hidden'
    }
  }

  render() {
    const {user, windowWidth} = this.state;
    const {searchTerm, cartsnumber, handleSearchTerm} = this.props;
    const lebar = windowWidth > this.mediaQuery.phone 
                  ? '500' 
                  : windowWidth > this.mediaQuery.tablet 
                  ? '700'
                  : windowWidth-50;
    let cartnumber = this.state.cartnumber;
    if(cartsnumber === true) {
      cartnumber = cartnumber + 1;
    }

    return (
      <>
      <Navbar collapseOnSelect expand="lg" variant="light" bg="light" fixed="top" className="pr-lg-5 pl-lg-5">
        <Navbar.Brand href="/">
          <LogoSvg/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Form inline  className="mr-auto ml-auto">
            {
              this.props.location.pathname !== '/' 
              ? <div onClick={this.handleToSearchPage.bind(this)}> 
                <svg width={lebar} height="42" viewBox="0 0 509 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M1 21C1 9.95431 9.95431 1 21 1H488C499.046 1 508 9.95431 508 21C508 32.0457 499.046 41 488 41H21C9.9543 41 1 32.0457 1 21Z" fill="white" stroke="#8E8E93"/>
                  <path d="M26.072 26.176C28.632 26.176 29.944 24.752 29.944 23.008C29.944 21.072 28.44 20.32 26.344 19.824C24.472 19.376 23.384 18.976 23.384 17.84C23.384 16.832 24.376 15.936 25.736 15.936C26.888 15.936 27.976 16.464 28.888 17.344L29.656 16.368C28.648 15.44 27.432 14.8 25.8 14.8C23.688 14.8 22.12 16.176 22.12 17.936C22.12 19.84 23.512 20.528 25.72 21.04C27.64 21.488 28.68 21.952 28.68 23.12C28.68 24.112 27.816 25.04 26.12 25.04C24.584 25.04 23.448 24.384 22.52 23.456L21.736 24.432C22.84 25.52 24.264 26.176 26.072 26.176ZM35.7565 25.12C34.1245 25.12 32.9885 23.936 32.8125 22.32H39.5805C39.5805 19.424 38.1565 17.536 35.6605 17.536C33.4365 17.536 31.5805 19.376 31.5805 21.84C31.5805 24.384 33.5645 26.192 35.7725 26.192C36.9245 26.192 38.3805 25.696 39.1005 24.912L38.3645 24.128C37.8525 24.688 36.7325 25.12 35.7565 25.12ZM35.7085 18.608C37.3565 18.608 38.2365 19.76 38.3965 21.248H32.8285C33.0525 19.648 34.2365 18.608 35.7085 18.608ZM44.9041 17.536C44.1041 17.536 43.1121 17.744 41.9281 18.336L42.4081 19.312C43.1601 18.928 43.9921 18.56 44.8241 18.56C46.6161 18.56 47.0641 19.84 47.0641 20.96V21.264C46.2161 20.992 45.2721 20.8 44.3761 20.8C42.6001 20.8 41.1281 21.904 41.1281 23.552C41.1281 25.184 42.4081 26.192 44.1521 26.192C45.2401 26.192 46.4721 25.68 47.0641 24.704V26H48.2641V20.96C48.2641 18.96 47.1601 17.536 44.9041 17.536ZM44.3601 25.136C43.1921 25.136 42.2961 24.528 42.2961 23.504C42.2961 22.512 43.3361 21.808 44.5681 21.808C45.4641 21.808 46.3121 21.936 47.0641 22.144V23.408C46.7441 24.576 45.4481 25.136 44.3601 25.136ZM52.028 19.344V17.728H50.828V26H52.028V21.376C52.028 19.76 53.356 18.608 55.228 18.608V17.536C53.708 17.536 52.524 18.24 52.028 19.344ZM60.7279 26.192C61.8799 26.192 62.9359 25.712 63.7199 24.928L62.8879 24.112C62.3279 24.736 61.5599 25.12 60.7279 25.12C59.0799 25.12 57.7039 23.632 57.7039 21.856C57.7039 20.096 59.0799 18.608 60.7279 18.608C61.5439 18.608 62.2959 18.976 62.8399 19.568L63.6719 18.752C62.8879 18 61.8479 17.536 60.7279 17.536C58.4079 17.536 56.4399 19.504 56.4399 21.856C56.4399 24.208 58.4079 26.192 60.7279 26.192ZM69.4958 17.536C68.3278 17.536 67.2558 18.176 66.7758 19.056V14.816H65.5758V26H66.7758V20.736C66.7758 19.584 67.9438 18.608 69.3358 18.608C70.5518 18.608 71.3998 19.552 71.3998 20.896V26H72.5998V20.736C72.5998 18.864 71.3198 17.536 69.4958 17.536Z" fill="#9B9B9B"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M487.67 28.1666L482.742 23.2366C483.625 22.0317 484.098 20.5751 484.092 19.0811C484.075 15.1814 480.92 12.0226 477.021 12.0001C475.155 11.9916 473.362 12.7299 472.044 14.0505C470.725 15.371 469.989 17.1641 470 19.0304C470.017 22.9305 473.171 26.0895 477.072 26.1121C478.572 26.1186 480.034 25.6398 481.239 24.7473L481.244 24.7434L486.168 29.6696C486.434 29.9489 486.831 30.062 487.204 29.965C487.578 29.868 487.869 29.5762 487.966 29.2027C488.063 28.8292 487.949 28.4326 487.67 28.1666ZM477.066 24.7004C473.946 24.6824 471.423 22.1554 471.409 19.0355C471.401 17.5427 471.99 16.1085 473.044 15.0522C474.099 13.9958 475.532 13.4049 477.025 13.4111C480.145 13.4291 482.669 15.9561 482.682 19.076C482.691 20.5688 482.102 22.003 481.047 23.0594C479.993 24.1157 478.559 24.7066 477.066 24.7004Z" fill="#8E8E93"/>
                </svg>
                </div>
              : (
                <>
                  <FormControl type="text" placeholder="product's name, descriptions, seller" onChange={searchTerm}/>
                  <button type="button" className="btn btn-search-svg" onClick={handleSearchTerm}>
                    <SearchSvg/>
                  </button>
                </>
                )
              } 
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
                    this.state.colors.map((color, i) => {
                      return (<div className={color.isChecked ? "color-container ellipse" : "color-container"} key={i}>
                        <input
                          onChange={this.handleCheckColorsChieldElement} 
                          type="checkbox" 
                          checked={color.isChecked} 
                          value={color.value} /> 
                          <button 
                            type="button"  
                            style={{backgroundColor:`#${color.value}`}}>{' '}
                          </button>
                      </div>)   
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
                    this.state.sizes.map((size, i) => { 
                      return (
                        <div className={"size-container"} key={i}>
                          <input 
                           onChange={this.handleCheckSizesChieldElement} 
                           type="checkbox" 
                           checked={size.isChecked} 
                           value={size.value} /> 
                          <button type="button"  style={size.isChecked ? {backgroundColor:'#DB3022', color:'#FFFFFF'} : {backgroundColor:'#FFFFFF',  color:'#000000'}}>{size.value}</button>
                        </div> 
                      )
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
                      <input name="category-toggle" type="checkbox" value="All" checked={this.state.checked}  onChange={this.handleAllCategories}/>
                      <button style={this.state.checked ? {backgroundColor:'red'}: {backgroundColor:'#FFFFFF'}}>All</button>
                    </div> 
                    { 
                      this.state.categories.map((category, i) => { 
                        return (<div className={"category-container"} key={i}>
                          <input 
                          onChange={this.handleCheckCategoriesChieldElement} 
                          type="checkbox" 
                          checked={category.isChecked} 
                          value={category.value} /> 
                          <button type="button"  style={category.isChecked ? {backgroundColor:'#DB3022', color:'#FFFFFF'} : {backgroundColor:'#FFFFFF',  color:'#000000'}}>{category.value}</button>
                        </div> )
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
                          name="brand" 
                          className="form-control select2 w-100" 
                          value={this.state.selections} 
                          onChange={(e) => {
                            this.onSeletionChange(e.target.value); 
                          } }
                          title="brand"
                          multiple={true}>
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
            <Nav.Link href="/checkout" style={{fontSize:'12px'}}><ShopingCartSvg/><Badge variant="light">{cartnumber}</Badge></Nav.Link>

            {this.props.auth.isAuthenticated 
              ? <>
                <Nav.Link eventKey={2} href="#notification" onClick={this.handleNotify.bind(this)}>
                  <BellSvg/>
                  <div className="notification-box toggle-notify-hidden" ref={this.notifyRef}>
                    <img src={notification} alt="asdf" />
                  </div>
                </Nav.Link>
                <Nav.Link href="#"><MailSvg/></Nav.Link>
                <div className="nav-link" onClick={this.handleProfileRef.bind(this)}>
                  <img id="auth-img" src={user.user_image === null || user.user_image === '' ? customer : user.user_image} alt={user.user_name} width="32.29px" height="32.29px"/>
                  <div className="profile-box toggle-notify-hidden" ref={this.profileRef}>
                    <div style={{display:'flex'}}>
                      <Link className="nav-link btn-link" to="/profile"> Profile </Link>
                    </div>
                    <div style={{display:'flex'}}>
                      <Link className="nav-link btn-light" to="#logout" onClick={this.onLogout.bind(this)}> Logout </Link>
                    </div>
                  </div>
                </div> 
                </>
              : <> 
                <Link
                  className="btn btn-secondary btn-block btn-block-nav"
                  to="/login"
                >
                    Login
                </Link>
                <Link
                  className="btn btn-outline-secondary btn-block-nav"
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
    checkout: state.checkout
  };
};
const Navigate = withRouter(NavbarComp);

export default connect(mapStateToProps)(Navigate);

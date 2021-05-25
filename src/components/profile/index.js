import React from 'react'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../styles/profile.css'; 
import {customer, Vector,Clipboard1,Mapin1, User1, Store, Product, Order} from '../../assets/properties';
import NavbarComp from "../layout/navbar"; 
import "react-datepicker/dist/react-datepicker.css";
import MyProfile from './MyProfile';
import MyOrder from './MyOrder';
import Address from './Address';
import MyStore from './MyStore';
import MyProduct from './MyProduct';
import OrderSeller from './OrderSeller';
import {
  Tabs,
  TabList,
  Tab,
  TabButton,
  TabPanel,
} from '../layout/Tabs';

import { MyTabs, MyTabList, MyTab, MySubTabList, MySubTab, MyTabButton,MyButton } from '../layout/My-tabs';
import {
  updateMyAccount, 
  postUserAddress, 
  getUserAddress,
  createMyStore,
  getMyStore,
} from '../../redux/actions/user';
import {resetProfile} from '../../redux/actions/auth';
import {getPropince, getDestination} from '../../redux/actions/ongkir';
import {postProduct} from '../../redux/actions/product';
// import Loader from "../Loader";

import SellingProduct from './SellingProduct';

import Loader from "../Loader";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    padding               : '0px',
    borderRadius          : '8px',
    boxShadow             : '0px 1px 20px 0px rgb(53 50 50 / 25%)',
    transform             : 'translate(-50%, -50%)'
  }
}; 

const TabHeader = ({
  image, 
  title,
  subtitle
}) => {  
  return(
    <>
      <div className="pl-top">
        <img src={image} alt="asdf" width="60.55" height="60.55"/>
        <div>
          <p className="user-name">{title}</p>
          <p><Vector/><span>{subtitle}</span></p>
        </div>
      </div> 
    </>
  )
}

TabHeader.defaultProps = {
  image: customer, 
  title: 'User Name',
  subtitle: 'Edit data'
};


class Profile extends React.Component{
  constructor(props) {
      super(props);
      this.state = { 
        token: '',
        myAccount: this.props.dataUser,
        loadUserAddress: true,
        userAddress: [],
        loadPropinsi: true,
        propinsi: [],
        loadUserStore: true,
        userStore:[],
        isProcess: false,
        cityOrSubdistrict:[],
        selectedState:'',
        selectedCity:'',
        resetFormProduct: false
      }
  }

  /**
   * section selling product
   */

   handleFormInserProduct = async (data)=> {
     console.log('handleFormInserProduct ',data);
    this.setState({isProcess: true})
    let config = `Bearer ${this.state.token}`;
    let fd = new FormData();
    fd.append('product_name', data.namaProduct);
    fd.append('product_description', data.description);
    fd.append('images', data.images);  
    fd.append('product_category', "T-shirt");
    fd.append('product_price', data.unitePrice);
    fd.append('disc', 0);
    fd.append('product_stock', data.stock);
    fd.append('seller', this.props.auth.profile.user_store);
    fd.append('product_rating', 0);
    fd.append('product_condition', "baru");
    fd.append('product_size', "S, XL, L, M, XXL");
    fd.append('product_color', "020202, B82222, 151867");
    await this.props.dispatch(postProduct(fd, config))
    await this.sleep(2000)
    this.setState({
      isProcess: false
    })
   }

  /**
   * end section selling product
   */

  handleCloseModal =()=> {
    this.setState({ showModal: false });
  }

  /**
   * if form add address is validates then submit here 
   * @param {tb_useraddress} data 
   */

  handleSubmitFormAddress = async (data)=> {
    this.setState({isProcess: true})
    let config = `Bearer ${this.state.token}`;
    let formData = new FormData();
    formData.append('customer_id', data.customer_id);
    formData.append('save_address_as', data.save_address_as);
    formData.append('address', data.address);
    formData.append('primary_address', data.primary_address);
    formData.append('city_id', data.city_id);
    formData.append('province_id', data.province_id);
    formData.append('city_name', data.city_name);
    formData.append('province_name', data.province_name);
    formData.append('recipient_name', data.recipient_name);
    formData.append('recipient_phone_number', data.recipient_phone_number);
    formData.append('postal_code', data.postal_code);
    await this.props.dispatch(postUserAddress(data, config))
    await this.sleep(2000)
    await this.getUserAddress()
    this.setState({isProcess: false})
    await this.sleep(2000) 
    this.handleCloseModal() 
  }

  /**
   * at form add address: on propinsi selected, then load cities 
   * @param {propinsi_id} event 
   */

  handleChangeState = async (event)=> {
    const propinsiId = event.target.value
		await this.setState({
      selectedState: propinsiId,
      loadCitiesByState: true
    });
    await this.loadCities(propinsiId) 
    if(this.props.ongkir.destination.isFulfilled){
      const destinations = this.props.ongkir.destination.data.rajaongkir.results;
      this.setState({
        loadCitiesByState: false,
        cities:destinations
      })
    }
	} 

  /**
   * handle save or update store form
   * @param {tb_store} data 
   */

  handleSaveMyStore = async (data) => {
    console.log(data);
    this.setState({isProcess: true})
    let config = `Bearer ${this.state.token}`;
    let formData = new FormData();
    formData.append('store_name', data.store_name );
    formData.append('email', data.email);
    formData.append('phone_number', data.phone_number);
    formData.append('store_description', data.store_description); 
    formData.append('image', data.store_image); 
    await this.props.dispatch(createMyStore(formData, config)); 
    await this.props.dispatch(getMyStore(config))
    await this.sleep(2000)
    this.setState({isProcess: false})
  }

  /**
   * handle submit form user: add or update 
   * @param {user_name, user_email, user_phone, dll...} data 
   */

  handleSaveMyAccount = async (data) => {
    console.log(data.image);
    this.setState({isProcess: true})
    let config = `Bearer ${this.state.token}`;
    let formData = new FormData();
    formData.append('user_name', data.user_name);
    formData.append('user_email', data.user_email);
    formData.append('user_phone', data.user_phone);
    formData.append('gender', data.gender);
    formData.append('date_of_birth', data.date_of_birth);
    formData.append('image', data.image); 
    await this.props.dispatch(updateMyAccount(formData, config));
    let newData = this.state.myAccount 
    newData.user_phone = data.user_phone
    newData.gender = data.gender
    newData.date_of_birth = data.date_of_birth
    newData.user_image = data.user_image 
    await this.props.dispatch(resetProfile(newData))
    await this.sleep(2000)
    this.setState({isProcess: false})
  }

  /**
   * 
   * @param {citi_id} event 
   * @param {sleep a moment, in milisecon} milliseconds 
   */

  handleChangeCity = async(event, milliseconds = 2000)=>{
    const cityId = event.target.value
    this.setState({
      selectedCity: cityId
    })
    const kota = this.state.cities
    let selectedKota = []
    kota.filter(element => element.city_id === cityId).map(selected =>
       (
          selectedKota = [...selectedKota, selected]
        ) 
    )
    await this.sleep(milliseconds)
    this.setState({cityOrSubdistrict: selectedKota})
  }

  /**
   * fetcing destination or cities by state
   * @param {propinsi_id} propinsiId 
   */
  loadCities = async(propinsiId)=> {
    await this.props.dispatch(getDestination(propinsiId))
  }

  /**
   * sleep while dispatch prosess
   */
  
  sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  /**
   * fetching data
   */

  getMyStore = async () => {
    if(this.state.myAccount.account_type === "seller"){
      let mystore = []
      this.setState({loadUserStore: true})
      let config = `Bearer ${this.state.token}`;
      await this.props.dispatch(getMyStore(config))
      await this.sleep(2000)
      if(this.props.user.getMyStore.isFulfilled){
        mystore = this.props.user.getMyStore.data
        this.setState({
          userStore: mystore,
          loadUserStore: false
        })
      }
    }
  }
  
  getPropinsi = async() => {
      this.setState({loadPropinsi: true})
      await this.props.dispatch(getPropince())
    if(this.props.ongkir.propince.isFulfilled){ 
      const dataProp = this.props.ongkir.propince.data.result.rajaongkir.results
      this.setState({
        propinsi: dataProp,
        loadPropinsi: false
      })
    }
  }
  
  getUserAddress = async() => {
    this.setState({loadUserAddress: true})
    let config = `Bearer ${this.state.token}`;
    await this.props.dispatch(getUserAddress(config))
    await this.sleep(5000)
    if(this.props.user.getUserAddress.isFulfilled){
      const dataUserAddrs = this.props.user.getUserAddress.data.result
      this.setState({
        userAddress: dataUserAddrs,
        loadUserAddress: false
      })
    }
  }

  myAccount = async () => {  
    this.setState({ 
      myAccount: this.props.auth.profile,
      accountType: this.props.auth.profile.account_type
    }) 
  }

  token = async () => {
    this.setState({
      token: this.props.auth.profile.token,
    });
  };

  componentDidMount = async () => {
    if (this.props.auth.isAuthenticated) {
      await this.token() 
      await this.myAccount()
      await this.getUserAddress()
      await this.getPropinsi()
      await this.getMyStore()
    }
  }

  render() {
    return (
      <>
        <NavbarComp/>
          <Me account_type={this.props.auth.isAuthenticated && this.props.auth.profile.account_type === "seller" ? "seller" : "customer"}>
            <MyAccount> 
            <Tabs selected={ 0 }>
              <TabList>
                <TabHeader title={this.state.myAccount.user_name} subtitle={"Edit Profile"} image={this.state.myAccount.user_image} />
                <Tab> <TabButton><img src={User1} alt="asdf" width="32" height="32"/><span>My Account </span></TabButton></Tab>
                <Tab> <TabButton>
                  {this.state.loadUserAddress || this.state.loadPropinsi ? ( <i className="fa fa-spinner" aria-hidden="true"></i> ):( <img src={Mapin1} alt="asdf" width="32" height="32"/> )} <span> Shipping Adrress</span> </TabButton> </Tab>
                <Tab> <TabButton><img src={Clipboard1} alt="asdf" width="32" height="32"/><span> My order</span></TabButton>  </Tab>  
              </TabList>
              <TabPanel>
                <MyProfile handleSaveMyAccount={this.handleSaveMyAccount} userData={this.state.myAccount} progressStatus={this.state.isProcess} /> </TabPanel>
              <TabPanel>
                {!this.state.loadUserAddress || !this.state.loadPropinsi ? ( 
                  <Address userData={this.state.myAccount} loadUserAddress={this.state.loadUserAddress} userAddress={this.state.userAddress} handleOpenModal={this.handleOpenModal} modalIsOpenAddress={this.state.showModal} afterOpenModal={this.afterOpenModal} closeModalAddAddress={this.handleCloseModal} customStyles={customStyles} dataPropinsi={this.state.propinsi} modalIsOpenPropinsi={this.state.showPropinsiModal} handleOpenModalPropinsi={this.handleOpenModalPropinsi} handleCloseModalPropinsi={this.handleCloseModalPropinsi} selectedState={this.state.selectedState} handleChangeState={this.handleChangeState} loadCitiesByState={this.state.loadCitiesByState} cities={this.state.cities} selectedCity={this.state.selectedCity} handleChangeCity={this.handleChangeCity} selectedCityOrSubdistrict={this.state.cityOrSubdistrict} handleSubmitFormAddress={this.handleSubmitFormAddress} progressStatus={this.state.isProcess} />
                ):(
                  <div className="wrap-right-content"> <Loader/>  </div> 
                )}
              </TabPanel>
              <TabPanel>
                <MyOrder/>
              </TabPanel> 
            </Tabs>  
          </MyAccount>
          <Seller>
            <hr/>
            <MyTabs selected={"11"} selectedTab={"Store"} _style={{ height: "fit-content", paddingBlockEnd: "5em" }} >
              <MyTabList> 
                <TabHeader title={this.state.userStore.store_name} subtitle={"Edit Store"} image={this.state.userStore.store_image} />
                <MyTab> 
                  <MyButton icon={Store} name={"Store"}>Store</MyButton>
                  <MySubTabList parentname={"Store"}>
                    <MySubTab><MyTabButton><span>Store profile</span></MyTabButton></MySubTab>
                  </MySubTabList> 
                </MyTab> 
                <MyTab>
                  <MyButton icon={Product} name={"Product"}>Product</MyButton>
                  <MySubTabList parentname={"Product"}>
                    <MySubTab><MyTabButton><span>My products</span></MyTabButton></MySubTab>
                    <MySubTab><MyTabButton><span>Selling products</span></MyTabButton></MySubTab> 
                  </MySubTabList> 
                </MyTab>
                <MyTab>
                  <MyButton icon={Order} name={"Order"}>Order</MyButton>
                    <MySubTabList parentname={"Order"}>
                      <MySubTab><MyTabButton><span>My order</span></MyTabButton></MySubTab>
                      <MySubTab><MyTabButton><span>Order cancel</span></MyTabButton></MySubTab>
                    </MySubTabList>  
                </MyTab>
              </MyTabList>
              <TabPanel _id={"11"}>
                <MyStore 
                  userData={this.props.auth.profile}
                  userStore= {this.state.userStore}
                  fetcing={this.state.isProcess}
                  progressStatus={this.state.loadUserStore}   
                  handleSaveMyStore={this.handleSaveMyStore}/> 
                  {/* <p>asasas</p>
                  <form onSubmit={evt => this.handleFormInserProduct(evt)} enctype="multipart/form-data">
                    <input type="file" name="multi-files" accept='image/*' multiple/>
                    <input type="submit" value="Upload"/>
                  </form>   */}
              </TabPanel>
              <TabPanel _id={"21"}>
                <MyProduct/>
              </TabPanel>
              <TabPanel _id={"22"}>
                <SellingProduct 
                  handleFormInserProduct={this.handleFormInserProduct}  
                  isProcess={this.state.isProcess}
                  // {...this.props}
                  />
              </TabPanel>
              <TabPanel _id={"31"}>
                <OrderSeller selected={0}/>
              </TabPanel>
              <TabPanel _id={"32"}>
                <OrderSeller selected={5}/>
              </TabPanel> 
            </MyTabs>
          </Seller>
        </Me>
      </>
    )
  } 
}

Profile.defaultProps = {
  dataUser: {
    account_type: 'customer',   
    user_email: "",
    user_id: "",
    user_image: customer,
    user_name: "user name",
    user_store: "store name"
  },
  dataStore: {
    email: "",
    id: 0, 
    phone_number: "",
    store_description: "",
    store_image: customer,
    store_name: "Zalora Cloth"
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    product: state.product,
    checkout: state.checkout,
    ongkir: state.ongkir,
    user: state.user,
  };
};

const Nav = withRouter(Profile);

export default connect(mapStateToProps)(Nav);

// revisi

class Me extends React.Component{
  constructor(props) {
      super(props);
      this.state = { 
        account_type: this.props.account_type
      }
  }

  renderMyAccount(children){
    return React.cloneElement(children, {
      children: React.Children.map(children.props.children, (childTab) => {
        return childTab
      })
    })
  }

  renderMyStore(children){
    return React.cloneElement(children, {
      children: React.Children.map(children.props.children, (childTab) => {
        if (this.props.account_type === "seller") {
          return React.cloneElement(childTab)
        }
        console.log('bukan seller', childTab);
        return 
      })
    })
  }

  renderChildren(children) {
    return React.Children.map(children, (child) => {
      if (child.type.name === "Seller") { 
        return this.renderMyStore(child)
      }
      if (child.type.name === "MyAccount") {  
        return React.cloneElement(child)
      }
      return child
    })
  }

  render() {
      return (
        <div>
          { this.renderChildren(this.props.children) }
        </div>
      )
  }
}

const MyAccount = ({
  children,
}) => (
  <div>
    { children }
  </div>
)

const Seller= ({
  children,
}) => (
  <div id="seller">{ children }</div>
)
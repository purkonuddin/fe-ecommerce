import React from 'react'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../styles/profile.css'; 
import {customer, Vector,Clipboard1,Mapin1, User1} from '../../assets/properties';
import NavbarComp from "../layout/navbar"; 
import "react-datepicker/dist/react-datepicker.css";
import MyProfile from './MyProfile';
import MyOrder from './MyOrder';
import Address from './Address';
import {
  Tabs,
  TabList,
  Tab,
  TabButton,
  TabPanel,
} from '../layout/Tabs';
import {updateMyAccount, postUserAddress, getUserAddress} from '../../redux/actions/user';
import {resetProfile} from '../../redux/actions/auth';
import {getPropince, getDestination} from '../../redux/actions/ongkir';
// import Loader from "../Loader";

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

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.dataUser = {
      account_type: "user",   
      user_email: "blanja@email.com",
      user_id: "asdf-123-a1s2d3",
      user_image: customer,
      user_name: "Michael Jhon",
      user_store: "Blanja"
    }
    this.state = {
      startDate: new Date(),
      showModal: false,
      token: "",
      myAccount: this.dataUser,
      isProcess: false,
      propinsi: [],
      showPropinsiModal: false,
      selectedState: '',
      loadCitiesByState: false,
      cities: [],
      selectedCity: '',
      cityOrSubdistrict: [],
      userAddress:[],
      loadUserAddress: false,
    }
  }

  handleChange = (date, event) => {
      // console.log('onChange', date, event);
      this.setState({
          startDate: date
      });
  };

  afterOpenModal =()=> {

  }

  handleOpenModal =()=> {
    this.setState({ showModal: true });
  }

  handleOpenModalPropinsi =()=>{
    // console.log('show');
    this.setState({showPropinsiModal: true})
  }
    
  handleCloseModal =()=> {
    this.setState({ showModal: false });
  }

  handleCloseModalPropinsi =()=> {
    // console.log('hide');
    this.setState({showPropinsiModal: false})
  }

  token = async () => {
    this.setState({
      token: await this.props.auth.profile.token,
    });
  };

  myAccount = async () => {
    this.setState({
      myAccount: await this.props.auth.profile,
    })
  }

  getPropinsi = async() => {
    await this.props.dispatch(getPropince())
    if(this.props.ongkir.propince.isFulfilled){ 
      const dataProp = this.props.ongkir.propince.data.result.rajaongkir.results
      this.setState({propinsi: dataProp})
    }
  }

  getUserAddress = async() => {
    this.setState({loadUserAddress: true})
    let config = `Bearer ${this.state.token}`;
    await this.props.dispatch(getUserAddress(config))
    await this.sleep(2000)
    // console.log(this.props);
    if(this.props.user.getUserAddress.isFulfilled){
      const dataUserAddrs = this.props.user.getUserAddress.data.result
      this.setState({
        userAddress: dataUserAddrs,
        loadUserAddress: false
      })
      // console.log(dataUserAddrs);
    }
  }

  componentDidMount = async () => {
    if (this.props.auth.isAuthenticated) {
      await this.token()
      await this.myAccount()
      await this.getUserAddress()
      await this.getPropinsi()
    }
  }

  handleSaveMyAccount = async (data) => {
    this.setState({isProcess: true})
    let config = `Bearer ${this.state.token}`;
    let formData = new FormData();
    formData.append('user_name', data.user_name);
    formData.append('user_email', data.user_email);
    formData.append('user_phone', data.user_phone);
    formData.append('gender', data.gender);
    formData.append('date_of_birth', data.date_of_birth);
    formData.append('image', data.image); 
    // console.log('token', config);
    await this.props.dispatch(updateMyAccount(formData, config));
    let newData = this.state.myAccount 
    newData.user_phone = data.user_phone
    newData.gender = data.gender
    newData.date_of_birth = data.date_of_birth
    newData.user_image = data.user_image 
    await this.props.dispatch(resetProfile(newData))
    this.setState({isProcess: false})
  }

  loadCities = async(propinsiId)=> {
    // console.log('loadCitiesByState==>',this.state.loadCitiesByState);
    await this.props.dispatch(getDestination(propinsiId))
  }

  handleChangeState = async (event)=> {
    const propinsiId = event.target.value
    // console.log(propinsiId);

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

  sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

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
    await this.sleep(2000)
    this.setState({isProcess: false})
    this.handleCloseModal()
  }

  render(){
    // console.log('userAddress ', this.state.userAddress);

  return (
    <>
      <NavbarComp/>

      <div className="profile-container" id="profile">  
          <Tabs  selected={ 0 }>
            <TabList>
                <TabHeader userData={this.state.myAccount}/>
              <Tab>
                <TabButton><img src={User1} alt="asdf" width="32" height="32"/><span>My Account</span></TabButton>
              </Tab>
              <Tab>
                <TabButton><img src={Mapin1} alt="asdf" width="32" height="32"/> <span> Shipping Adrress</span></TabButton>
              </Tab>
              <Tab>
                <TabButton><img src={Clipboard1} alt="asdf" width="32" height="32"/><span> My order</span></TabButton>
              </Tab> 
            </TabList>

            <TabPanel>
              <MyProfile 
                handleSaveMyAccount={this.handleSaveMyAccount}
                userData={this.state.myAccount}
                progressStatus={this.state.isProcess} /> 
            </TabPanel>

            <TabPanel>
              <Address 
                userData={this.state.myAccount}
                loadUserAddress={this.state.loadUserAddress}
                userAddress={this.state.userAddress}
                
                handleOpenModal={this.handleOpenModal}
                modalIsOpenAddress={this.state.showModal}
                afterOpenModal={this.afterOpenModal}
                closeModalAddAddress={this.handleCloseModal}
                customStyles={customStyles}

                dataPropinsi={this.state.propinsi}                
                modalIsOpenPropinsi={this.state.showPropinsiModal}
                handleOpenModalPropinsi={this.handleOpenModalPropinsi}
                handleCloseModalPropinsi={this.handleCloseModalPropinsi}
                
                selectedState={this.state.selectedState}
                handleChangeState={this.handleChangeState}
                loadCitiesByState={this.state.loadCitiesByState}
                cities={this.state.cities}
                selectedCity={this.state.selectedCity}
                handleChangeCity={this.handleChangeCity}

                selectedCityOrSubdistrict={this.state.cityOrSubdistrict}

                handleSubmitFormAddress={this.handleSubmitFormAddress} 
                progressStatus={this.state.isProcess}
                />
            </TabPanel>

            <TabPanel>
              <MyOrder/>
            </TabPanel>
          </Tabs> 
      </div>
    </>
  )}
}

// export default Profile;

const TabHeader = (userData) => {
  const dataUser = userData
  return(
    <>
      <div className="pl-top">
        <img src={dataUser.userData.user_image === null ? customer : dataUser.userData.user_image} alt="asdf" width="60.55" height="60.55"/>
        <div>
          <p className="user-name">{dataUser.userData.user_name}</p>
          <p><Vector/><span> Ubah profile</span></p>
        </div>
      </div> 
    </>
  )
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
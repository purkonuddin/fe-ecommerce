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
import {updateMyAccount} from '../../redux/actions/user';
import {resetProfile} from '../../redux/actions/auth';


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
      isProcess: false
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
    
  handleCloseModal =()=> {
    this.setState({ showModal: false });
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

  componentDidMount = async () => {
    if (this.props.auth.isAuthenticated) {
      await this.token()
      await this.myAccount()
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

  render(){

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
                handleOpenModal={this.handleOpenModal}
                modalIsOpenAddress={this.state.showModal}
                afterOpenModal={this.afterOpenModal}
                closeModalAddAddress={this.handleCloseModal}
                customStyles={customStyles}/>
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
  };
};

const Nav = withRouter(Profile);

export default connect(mapStateToProps)(Nav);
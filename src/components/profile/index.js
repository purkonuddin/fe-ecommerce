import React from 'react'; 
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
  state = {
      startDate: new Date(),
      showModal: false
  };

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

  render(){

  return (
    <>
      <NavbarComp/>

      <div className="profile-container" id="profile">  
          <Tabs  selected={ 0 }>
            <TabList>
                <TabHeader/>
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
              <MyProfile startDate={this.state.startDate} handleChange={this.handleChange.bind(this)}/>
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

export default Profile;

const TabHeader = () => {
  return(
    <>
      <div className="pl-top">
        <img src={customer} alt="asdf" width="60.55" height="60.55"/>
        <div>
          <p className="user-name">Johanes Mikael</p>
          <p><Vector/><span> Ubah profile</span></p>
        </div>
      </div> 
    </>
  )
}
import React from 'react'; 
import '../../styles/profile.css'; 
import {customer, Vector,Clipboard1,Mapin1, User1} from '../../assets/properties';
// import {Button} from 'react-bootstrap'
import NavbarComp from "../layout/navbar"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Profile extends React.Component {
  state = {
      startDate: new Date()
  };

  handleChange = (date, event) => {
      console.log('onChange', date, event);
      this.setState({
          startDate: date
      });
  };

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
              <Address/>
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

const TabButton = ({ children }) => (
  <button className="Button">
    { children }
  </button>
)

const TabPanel = ({
  _isActive,
  children,
}) => (
  <div className={ `TabPanel  ${ _isActive ? "is-active" : "" }` }>
    { children }
  </div>
)

const Tab = ({
  _onClick,
  _isActive,
  children,
}) => (
  <li
    className={ `Tab  ${ _isActive ? "is-active" : "" }` }
    onClick={ _onClick }>
    { children }
  </li>
)

const TabList = ({ children }) => (
  <ul className="TabList pl-lg-5">
    { children }
  </ul>
)

class Tabs extends React.Component {
  state = { selected: this.props.selected };

  setSelected(selected) {
    if (selected !== this.state.selected) {
      this.setState({ selected })
    }
  }

  handleClick(tab) {
    return () => this.setSelected(tab)
  }

  renderTabList(child) {
    let tab = 0

    return React.cloneElement(child, {
      children: React.Children.map(child.props.children, (childTab) => {
        if (childTab.type.name === "Tab") {
          const _isActive = (tab === this.state.selected)
          const _onClick = this.handleClick(tab)

          tab++

          return React.cloneElement(childTab, { _isActive, _onClick })
        }

        return childTab
      }),
    })
  }

  renderChildren(children) {
    let panel = 0

    return React.Children.map(children, (child) => {
      if (child.type.name === "TabList") {
        return this.renderTabList(child)
      }

      if (child.type.name === "TabPanel") {
        const _isActive = (panel === this.state.selected)

        panel++

        return React.cloneElement(child, { _isActive })
      }

      return child
    })
  }

  render() {
    return (
      <div className="Tabs">
        { this.renderChildren(this.props.children) }
      </div>
    )
  }
}

const MyOrder = () => {
  return (
    <div className="wrap-right-content">
      <div>
        <h3>My order</h3>
      </div>
      <div className="rc-center" id="my-order">
        <Tabs selected={ 0 }>
          <TabList>
            <Tab>
              <TabButton>My Order</TabButton>
            </Tab>
            <Tab>
              <TabButton>Process</TabButton>
            </Tab>
            <Tab>
              <TabButton>Received</TabButton>
            </Tab>
            <Tab>
              <TabButton>Received</TabButton>
            </Tab>
            <Tab>
              <TabButton>Received</TabButton>
            </Tab>
          </TabList>

          <TabPanel>
            <p>My Order</p>
          </TabPanel>
          <TabPanel>
            <p>Process</p>
          </TabPanel>
          <TabPanel>
            <p>Received</p>
          </TabPanel>
          <TabPanel>
            <p>Received</p>
          </TabPanel>
          <TabPanel>
            <p>Received</p>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  )
}

const Address = () => {
  return (
    <div className="wrap-right-content">
      <div>
        <h3>Choose another address</h3>
        <p>Manage your shipping address</p>
        <hr/>
      </div>
      <div className="rc-center">
        <div id="add-address">
          <div className="add-new-address mb-4 mt-4">
            <button>Add new address</button>
          </div>
          <div className="address-list selected">
            <h2>Andreas Jane</h2>
            <p>Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja, Kabupaten Banyumas, Jawa Tengah, 53181 [Tokopedia Note: blok c 16] Sokaraja, Kab. Banyumas, 53181</p>
            <button type="button">Change address</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const MyProfile = ({handleChange, startDate}) => { 
  return(
    <div className="wrap-right-content">
      <div >
        <h3>My Profile</h3>
        <p>Manage your profile information</p>
        <hr/>
      </div>
      <div className="rc-center">
        <div className="section-1">
          {/* form */}
          <div className="sc1-title">
            <p>Name</p>
            <p>Email</p>
            <p>Phone number</p>
            <p>Gender</p>
            <p>Date of birth</p>
          </div>
          <div className="sc1-input">
            <p><input type="text"/></p>
            <p><input type="text"/></p>
            <p><input type="text"/></p>
            <p className="sci-radio"><input type="radio" name="gender" value="man"/> <span> Laki-laki </span> {'   '} <input type="radio" name="gender" value="woman"/> <span> Perempuan </span></p>
            <div className="date">
            {/* <select>
              <option value="1">{'1'}</option>
              {[1,2,3,4,5,6,7,8].map(d => <option key={d}>{d}</option>)}
            </select>  */}
            <DatePicker
              onChange={handleChange}
              selected={startDate}
              dateFormat="dd/MM/yyyy"
            /> 
            {/* <select>
              <option value="Januari">{'Januari'}</option>
              {['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus', 'Sepetember', 'Oktober', 'Nopember', 'Desember'].map(m => <option key={m}>{m}</option>)}
            </select>
            <select>
              <option value="1990">{'1990'}</option>
              {[1990,1991,1992,1993,1994,1995,1996,1997].map(y => <option key={y}>{y}</option>)}
            </select>  */}
            </div>
          </div>
        </div>
        <div className="section-foto left-border">
          {/* foto */}
          <img src={customer} alt="asdf" width="111" height="111"/>
          <button type="button" className="mt-3">Select image</button>
          <input type="file"/>
        </div> 
      </div>
      <div>
        <div>
          {/* buton */}
          <button className="btn btn-secondary">Save</button>
        </div>
      </div>
    </div>
  )
}
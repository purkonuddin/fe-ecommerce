import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {logo} from '../../assets/properties';
import { login } from '../../redux/actions/auth';
import '../../assets/login.css'
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import { BrowserRouter as Link } from "react-router-dom";

// import Loadable from 'react-loadable';

// const LoadableLogin = Loadable({
//     loader: ()=>{<LoginComponent/>},
//     loading: ()=> {<div>Loading...</div>},
// }); 
const radios = [
    { name: 'Customer', value: '1' },
    { name: 'Seller', value: '2' }, 
  ];

class Login extends Component {
  constructor(props) {
    super(props);

    this.mediaQuery = {
        desktop: 1200,
        tablet: 768,
        phone: 576,
      };

    this.state = {
      email: '',
      password: '',
      userType:1,
      windowWidth: document.body.clientWidth,
    };


  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }

    window.addEventListener('resize', () => {
        this.setState({windowWidth: document.body.clientWidth})
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state);
    await this.props.dispatch(login(this.state));
    await this.props.history.push('/');
  };

  render() {
    return (
      <div 
        className='container-fluid'
        style={{
            width: this.state.windowWidth > this.mediaQuery.phone
              ? '50%'
              : '100%', 
          }}>

        <div
          style={{
            height: '100vh', /* Magic here */
            display: 'flex',
            flexDirection:'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '400px', 
            fontSize: '14px'
          }}
        > 

            <div className='form-group'>
                <img
                    style={{
                    height: '50px' 
                    }}
                    src={logo}
                    alt='Logo'
                /> 
            </div> 

            <div className='form-group'>
                <p style={{fontSize: '18px', fontWeight: 700}}>Please login with your account</p>
            </div>

          <div>
            <form> 
                <div className='form-group' 
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                    <ButtonGroup toggle>
                    {radios.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            type="radio"
                            variant="secondary"
                            name="userType"
                            value={radio.value}
                            checked={this.state.userType === radio.value}
                            onChange={this.onChange}
                        >
                        {radio.name + `- ${this.state.userType}`}
                        </ToggleButton>
                    ))}
                    </ButtonGroup>
                </div>
              <div className='form-group'> 
                <input
                  type='email'
                  className='form-control'
                  placeholder='Email'
                  name='email'
                  onChange={this.onChange}
                  required
                /><br/>

                <div className='form-group'>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='Password'
                    name='password'
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group' style={{textAlign:'right'}}>
                    <Link to="/forgot-password">
                        <Button variant="link">Forgot password?</Button>
                    </Link>
                </div>

                <Button variant="primary" size="lg" block
                  onClick={this.onSubmit}
                  type='submit'
                  className='btn login btn-primary form-group'
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
            <div>
                <p>Don't have a Blanja account?<span> <Link to="/register"> <Button variant="link">Register</Button> </Link></span> </p> 
            </div>
        </div>
      </div>
    );
  }
}

// class Login extends React.Component {
//     render() {
//       return <LoadableLogin/>;
//     }
//   }

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const Nav = withRouter(Login);

export default connect(mapStateToProps)(Nav);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {logo} from '../../assets/properties';
import { sendResetPassword } from '../../redux/actions/auth';
import '../../styles/login.css'
import { Link, withRouter } from 'react-router-dom';
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap";

const radios = [
  { name: 'Customer', value: 'customer' },
  { name: 'Seller', value: 'seller' }, 
];

class SendResetPassword extends Component {
  constructor(props) {
    super(props);

    this.mediaQuery = {
        desktop: 1200,
        tablet: 768,
        phone: 576,
      };

    this.state = {
      account_type: 'customer',
      email: '', 
      windowWidth: document.body.clientWidth,
    };


  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    } 

    // if (this.props.auth.isSentResetPassword) {
    //   this.props.history.push('/login');
    // } 

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
    await this.props.dispatch(sendResetPassword(this.state));
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

            <div className='form-group' style={{textAlign: 'center'}}>
                <p style={{fontSize: '18px', fontWeight: 700, marginBottom: 'unset'}}>Forget password</p>
                <p style={{fontSize: '12px'}}>you will receive an email containing reset instruction</p>
                {this.props.auth.isRejected && 
                  <p style={{fontSize: '12px', color: '#db3022'}}>{this.props.auth.rejected.message}</p>
                }
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
                          name="account_type"
                          value={radio.value}
                          checked={this.state.account_type === radio.value}
                          onChange={this.onChange}
                          // disabled={userType === radio.value}
                      >
                      {radio.name}
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
                />
              </div> 

              <div className='form-group' style={{textAlign:'right'}}>
                    <Link to="/doc">
                        <Button variant="link">Help ?</Button>
                    </Link>
                </div>

              <div className='form-group'> 
                <Button variant="primary" size="lg" block
                  onClick={this.onSubmit}
                  type='submit'
                  className='btn login btn-primary form-group'
                  disabled={this.state.email.length<6}
                >
                  {this.props.auth.isPending? 'Pending...' : 'Send'}
                </Button>
              </div>
            </form>
          </div>
            <div>
                <p>Don't have a Blanja account?
                    <span> <Link to="/sign-up"> <Button variant="link">register</Button></Link></span> 
                    or
                    <span> <Link to="/login"> <Button variant="link">login</Button></Link></span> 
                </p> 
            </div>
        </div>
      </div>
    );
  }
} 

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const Nav = withRouter(SendResetPassword);

export default connect(mapStateToProps)(Nav);

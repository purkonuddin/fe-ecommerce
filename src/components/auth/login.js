import React, { Component } from 'react';
import { connect } from 'react-redux';
import {logo} from '../../assets/properties';
import { login } from '../../redux/actions/auth';
import '../../assets/login.css'
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import { Link, withRouter } from 'react-router-dom'; 

const radios = [
    { name: 'Customer', value: 'customer' },
    { name: 'Seller', value: 'seller' }, 
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
      login_email: '',
      login_password: '',
      login_account_type:'customer',
      windowWidth: document.body.clientWidth,
      isSentResetPassword: false
    };


  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }

    if (this.props.auth.isSentResetPassword) {
      this.setState({isSentResetPassword: true})
    }

    if (this.props.auth.isFulfilled && this.props.auth.isResetPassword) {
      this.setState({login_email: this.props.auth.resetPassword.user_email})
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
    //   const {userType} = this.state;
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
                <p style={{fontSize: '18px', fontWeight: 700}}>Please login with your account</p>
                {this.state.isSentResetPassword &&
                  <p style={{fontSize: '12px'}}>we have send an email containing a reset password instruction to your email, please check your email</p>
                }
                {this.props.auth.isRegistered && this.props.auth.signup 
                  ? <p style={{fontSize: '12px'}}>Sign up success, we have send an email containing a verification instruction to your email, please check your email</p>
                  : null
                }
                {this.props.auth.isRejected && 
                  <p style={{fontSize: '12px', color: '#db3022'}}>{this.props.auth.rejected.message}</p>
                }
                {this.props.auth.isFulfilled && this.props.auth.isResetPassword 
                  ? <p style={{fontSize: '12px', color: 'green'}}>{this.props.auth.resetPassword.message}</p>
                  : null
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
                            name="login_account_type"
                            value={radio.value}
                            checked={this.state.login_account_type === radio.value}
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
                  name='login_email'
                  onChange={this.onChange}
                  required
                  value={this.state.login_email || ''}
                /><br/>

                <div className='form-group'>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='Password'
                    name='login_password'
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group' style={{textAlign:'right'}}>
                    <Link to="/send_reset_password">
                        <Button variant="link">Forgot password?</Button>
                    </Link>
                </div>

                <Button variant="primary" size="lg" block
                  onClick={this.onSubmit}
                  type='submit'
                  className='btn login btn-primary form-group'
                >
                  {this.props.auth.isPending ? 'Load...' : 'Login'}
                </Button>
              </div>
            </form>
          </div>
            <div>
                <p>Don't have a Blanja account?<span> <Link to="/sign-up"> <Button variant="link">register</Button></Link></span> </p> 
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

const Nav = withRouter(Login);

export default connect(mapStateToProps)(Nav);

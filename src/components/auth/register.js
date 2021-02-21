import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postUser } from '../../redux/actions/auth';
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import {logo} from '../../assets/properties';
import '../../assets/login.css'

const radios = [
    { name: 'Customer', value: 'customer' },
    { name: 'Seller', value: 'seller' }, 
];

class Register extends Component {
  constructor(props) {
    super(props);

    this.mediaQuery = {
        desktop: 1200,
        tablet: 768,
        phone: 576,
    };

    this.state = {
        account_type: 'customer',
        useremail: '',
        username: '',
        password: '',
        password_repeat: '',
        user_phone: '',
        userstore: '',
    };
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
        this.props.history.push('/');
    }

    window.addEventListener('resize', () => {
        this.setState({windowWidth: document.body.clientWidth})
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();
    console.log(this.state)
    await this.props.dispatch(postUser(this.state))
    this.props.history.push('/login');
  };

  render() {
    return (
      <div
        className='container-fluid'
        style={{
            width: this.state.windowWidth > this.mediaQuery.phone
                ? '50%'
                : '100%', 
            }}
        >
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
                <p style={{fontSize: '18px', fontWeight: 700}}>Please sign-up with your account</p>
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
                    type='text'
                    className='form-control'
                    placeholder='Name'
                    name='username'
                    onChange={this.onChange}
                    required
                    /> 
                </div> 

                <div className='form-group'>
                  <input
                    type='email'
                    className='form-control'
                    placeholder='Email'
                    name='useremail'
                    onChange={this.onChange}
                    required
                  />
                </div> 

                <div className='form-group'>
                  <input
                    type='phone'
                    className='form-control'
                    placeholder='Phone Number'
                    name='user_phone'
                    onChange={this.onChange}
                    required={this.state.account_type === 'seller'}
                    disabled={this.state.account_type === 'customer'}
                    hidden={this.state.account_type === 'customer'}
                  />
                </div>

                <div className='form-group'>
                    <input
                    type='text'
                    className='form-control'
                    placeholder='Store Number'
                    name='userstore'
                    onChange={this.onChange}
                    required={this.state.account_type === 'seller'}
                    disabled={this.state.account_type === 'customer'}
                    hidden={this.state.account_type === 'customer'}
                    />
                </div> 

                <div className='form-group'>
                    <input
                    type='password'
                    className='form-control'
                    placeholder='Password'
                    name='password'
                    onChange={this.onChange}
                    required
                    />
                </div> 

                <div className='form-group'>
                    <Button variant="primary" size="lg" block
                    onClick={this.onSubmit}
                    type='submit'
                    className='btn login btn-primary form-group'
                    >
                    Sign up
                    </Button>
                </div>
            </form>
          </div>
            <div>
                <p>Already have a Blanja account?<span> <Link to="/login"> <Button variant="link">Login</Button> </Link></span> </p> 
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
  
const Nav = withRouter(Register);

export default connect(mapStateToProps)(Nav);

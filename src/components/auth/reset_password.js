import React, { Component } from 'react';
import { connect } from 'react-redux';
import {logo} from '../../assets/properties';
import { resetPassword } from '../../redux/actions/auth';
import '../../styles/login.css'
import { Button } from "react-bootstrap";
import { Link, withRouter } from 'react-router-dom';

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.mediaQuery = {
        desktop: 1200,
        tablet: 768,
        phone: 576,
      };

    this.state = {
        newpassword: '', 
        newpassword_repeat: '',
        user_id: '',
        user_email: '',
        token: '',
        windowWidth: document.body.clientWidth,
    };


  }

  handleParams = () => {
    var qs = require('qs');

    var prefixed = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    console.log(prefixed.id);
    this.setState({
      token: this.props.match.params.token,
      user_id:prefixed.id, 
      user_email:prefixed.email
    })
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }

    window.addEventListener('resize', () => {
        this.setState({windowWidth: document.body.clientWidth})
    });

    if(this.props.match.params.token){
      this.handleParams()
    }

    console.log(this.props.action);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state);
    await this.props.dispatch(resetPassword(this.props.match.params.token, this.state));
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
                <p style={{fontSize: '18px', fontWeight: 700, marginBottom: 'unset'}}>Reset password</p>
                <p style={{fontSize: '12px', color: '#db3022'}}>you need to change your password to activate your account</p>
                {this.props.auth.isRejected && 
                  <p style={{fontSize: '12px', color: '#db3022'}}>{this.props.auth.rejected.message}</p>
                }
            </div> 

          <div>
            <form>  
                 
                <div className='form-group'>
                    <input
                    type='password'
                    className='form-control'
                    placeholder='Password'
                    name='newpassword'
                    onChange={this.onChange}
                    required
                    />
                </div> 

                <div className='form-group'>
                    <input
                    type='password'
                    className='form-control'
                    placeholder='Confirmation New Password'
                    name='newpassword_repeat'
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
                >
                  Reset
                </Button>
              </div>
            </form>
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

const Nav = withRouter(ResetPassword);

export default connect(mapStateToProps)(Nav);

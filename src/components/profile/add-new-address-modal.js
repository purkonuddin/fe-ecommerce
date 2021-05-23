import React from 'react'
import Modal from 'react-modal';
import {Close} from '../../assets/properties';
import Loader from "../Loader";
import { validateFields } from './Validation';
import classnames from 'classnames';

const initialState={  
    saveAddressAs: {
        value: '',
        validateOnChange: false,
        error: ''
    },
    recipientName: {
        value: '',
        validateOnChange: false,
        error: ''
    },
    recipientPhoneNumber:{
        value: '',
        validateOnChange: false,
        error: ''
    },
    address:{
        value: '',
        validateOnChange: false,
        error: ''
    },
    postalCode:{
        value: '',
        validateOnChange: false,
        error: ''
    },
    primaryAddress: false,
    submitCalled: false,  
    allFieldsValidated: false,
    selectedState: '',  
}


class MdlAddAddress extends React.Component{
    static propTypes = {
        // loadCitiesByState: PropTypes.string.isRequired,
        // cities: PropTypes.string.isRequired,
        // dataPropinsi: PropTypes.number.isRequired,
        // progressStatus: PropTypes.number.isRequired,
        // modalIsOpenAddress: PropTypes.string.isRequired,
        // afterOpenModal: PropTypes.string.isRequired,
        // closeModalAddAddress:PropTypes.string.isRequired,
        // customStyles:PropTypes.string.isRequired,
        // contentLabel:PropTypes.string.isRequired,
        // handleChangeState:PropTypes.string.isRequired,
        // handleChangeCity:PropTypes.string.isRequired,
        // selectedCityOrSubdistrict:,
    };
    constructor(props) {
        super(props); 
        this.state = {
            saveAddressAs: {
                value: '',
                validateOnChange: false,
                error: ''
            },
            recipientName: {
                value: '',
                validateOnChange: false,
                error: ''
            },
            recipientPhoneNumber:{
                value: '',
                validateOnChange: false,
                error: ''
            },
            address:{
                value: '',
                validateOnChange: false,
                error: ''
            },
            postalCode:{
                value: '',
                validateOnChange: false,
                error: ''
            },
            primaryAddress: false,
            submitCalled: false,  
            allFieldsValidated: false,
            selectedState: '', 
            loadCitiesByState: this.props.loadCitiesByState,
            cities:this.props.cities,
            dataPropinsi: this.props.dataPropinsi,
            progressStatus: this.props.progressStatus,
            selectedCityOrSubdistrict: this.props.selectedCityOrSubdistrict,
            selectedCity:this.props.selectedCity, 
        }
    }


    componentDidUpdate=()=> {
        // console.log('update ==>',this.props);
    }

    handleSubmit=(evt)=> { 
        // console.log('asas', this.props.selectedCityOrSubdistrict);

        evt.preventDefault();
        // validate all fields
        const {saveAddressAs, recipientName, recipientPhoneNumber, address, postalCode, primaryAddress} = this.state
        const saveAddressAsError = validateFields.validateTitle(saveAddressAs.value);
        const recipientNameError = validateFields.validateName(recipientName.value);
        const recipientPhoneNumberError = validateFields.validatePhone(recipientPhoneNumber.value);
        const addressError = validateFields.validateAddress(address.value);
        const postalCodeError = validateFields.validatePos(postalCode.value);
        const selectedCityOrSubdistrictError = this.props.selectedCityOrSubdistrict.length === 0 ? true : false 
        if ([saveAddressAsError, recipientNameError,recipientPhoneNumberError,addressError, postalCodeError,selectedCityOrSubdistrictError].every(e => e === false)) {
          // no errors submit the form
          console.log('success');
          let AinitialState = this.state
    
          // clear state and show all fields are validated
          this.setState({ ...AinitialState, allFieldsValidated: true });
          this.showAllFieldsValidated();
          this.props.handleFormAddress({
            saveAddressAs,
            recipientName,
            recipientPhoneNumber,
            address,
            postalCode,
            primaryAddress,
          })
        } else {
          // update the state with errors
          this.setState(state => ({
            saveAddressAs: {
                ...state.saveAddressAs,
                validateOnChange: true,
                error: saveAddressAsError
            },
            recipientName: {
                ...state.recipientName,
              validateOnChange: true,
              error: recipientNameError
            },
            recipientPhoneNumber:{
                ...state.recipientPhoneNumber,
                validateOnChange: true,
                error: recipientPhoneNumberError
            },
            address:{
                ...state.address,
              validateOnChange: true,
              error: addressError
            },
            postalCode:{
                ...state.postalCode,
                validateOnChange: true,
                error: postalCodeError
            }
          })); 
        }
    }
    
    showAllFieldsValidated=()=> {
        setTimeout(() => {
            this.setState({ allFieldsValidated: false });
        }, 1500);
    }

    handleBlur(validationFunc, evt) {
        const field = evt.target.name;
        // validate onBlur only when validateOnChange for that field is false
        // because if validateOnChange is already true there is no need to validate onBlur
        if (
          this.state[field]['validateOnChange'] === false &&
          this.state.submitCalled === false
        ) {
          this.setState(state => ({
            [field]: {
              ...state[field],
              validateOnChange: true,
              error: validationFunc(state[field].value)
            }
          }));
        }
        return;
    }

    handleChange=(validationFunc, evt) => {
        const field = evt.target.name;
        const fieldVal = evt.target.value;
        this.setState(state => ({
          [field]: {
            ...state[field],
            value: fieldVal,
            error: state[field]['validateOnChange'] ? validationFunc(fieldVal) : ''
          }
        }));
    }

    handleChangeDatePicker = (date, event) => {
        this.setState({date: date})
    };

    componentDidMount = async () => {
        // console.log('==>',this.props);
    
    }

    render(){
        // console.log('kota--->>', this.props.selectedCityOrSubdistrict, this.props.selectedCity);
        const {allFieldsValidated, progressStatus, dataPropinsi, loadCitiesByState, cities, saveAddressAs, recipientName, recipientPhoneNumber, address, postalCode, selectedState, selectedCity, primaryAddress} = this.state
        return(
            <Modal
            isOpen={this.props.modalIsOpenAddress}
            onAfterOpen={this.props.afterOpenModal}
            onRequestClose={this.props.closeModalAddAddress}
            style={this.props.customStyles}
            contentLabel={this.props.contentLabel}
            >
            <div className="modal-top address-top add-address-top">
                <h2>Add new address</h2>
                <button onClick={this.props.closeModalAddAddress}><Close/></button>
            </div>
            <form onSubmit={evt => this.handleSubmit(evt)}>
            <div className="payment-modal-content add-address-content"> 
                {allFieldsValidated && (
                <p className="text-success text-center">
                    Success, All fields are validated
                </p>
                )}
                <div id="save-as">
                    <label>Save address as (ex : home address, office address)</label>
                    <input 
                        type="text"
                        name="saveAddressAs"
                        placeholder="exp. Home Address"
                        value={saveAddressAs.value}
                        className={classnames(
                            'form-control p-2 text-capitalize',
                            { 'is-valid': saveAddressAs.error === false },
                            { 'is-invalid': saveAddressAs.error }
                          )}
                        required
                        onChange={evt =>this.handleChange(validateFields.validateTitle, evt)}
                        onBlur={evt => this.handleBlur(validateFields.validateTitle, evt)}/>
                        <div className="bg-transparent invalid-feedback mb-4">{saveAddressAs.error}</div>
                        
                </div> 
                <div id="receipent">
                    <div>
                        <label>Recipient’s name</label>
                        <input 
                            type="text"
                            name="recipientName"
                            placeholder="Receipent Name"
                            className={classnames(
                                'form-control p-2 text-capitalize',
                                { 'is-valid': recipientName.error === false },
                                { 'is-invalid': recipientName.error }
                              )}
                            value={recipientName.value}
                            required
                            onChange={evt =>this.handleChange(validateFields.validateName, evt)}
                            onBlur={evt => this.handleBlur(validateFields.validateName, evt)}/>
                            <div className="bg-transparent invalid-feedback mb-4">{recipientName.error}</div>
                    </div>
                    <div>
                        <label>Recipient's telephone number</label>
                        <input 
                            type="text"
                            name="recipientPhoneNumber"
                            placeholder="exp. 085xxxxx"
                            className={classnames(
                                'form-control p-2 text-capitalize',
                                { 'is-valid': recipientPhoneNumber.error === false },
                                { 'is-invalid': recipientPhoneNumber.error }
                              )}
                            value={recipientPhoneNumber.value}
                            required
                            onChange={evt =>this.handleChange(validateFields.validatePhone, evt)}
                            onBlur={evt => this.handleBlur(validateFields.validatePhone, evt)}/>
                            <div className="bg-transparent invalid-feedback mb-4">{recipientPhoneNumber.error}</div>
                    </div>
                </div>
                <div id="address-pos-code">
                    <div>
                        <label>Address</label>
                        <input 
                            type="text"
                            name="address"
                            placeholder="Nama Jalan dan Nomor Rumah"
                            className={classnames(
                                'form-control p-2 text-capitalize',
                                { 'is-valid': address.error === false },
                                { 'is-invalid': address.error }
                              )}
                            value={address.value}
                            required
                            onChange={evt =>this.handleChange(validateFields.validateAddress, evt)}
                            onBlur={evt => this.handleBlur(validateFields.validateAddress, evt)}/>
                            <div className="bg-transparent invalid-feedback mb-4">{address.error}</div>
                    </div>
                    <div>
                        <label>Postal code</label>
                        <input 
                            type="text"
                            name="postalCode"
                            placeholder="exp. 1440"
                            className={classnames(
                                'form-control p-2 text-capitalize',
                                { 'is-valid': postalCode.error === false },
                                { 'is-invalid': postalCode.error }
                              )}
                            value={postalCode.value} 
                            required
                            onChange={evt =>this.handleChange(validateFields.validatePos, evt)}
                            onBlur={evt => this.handleBlur(validateFields.validatePos, evt)}/>
                            <div className="bg-transparent invalid-feedback mb-4">{postalCode.error}</div>
                    </div>
                </div>
                <div id="city">
                    <label>City or Subdistrict</label>
                    <select placeholder="State" value={this.props.selectedState} onChange={this.props.handleChangeState}  required>
                        <option>Select Propinsi</option>
                    {
                        this.props.dataPropinsi.length >= 1 ? (
                            
                            this.props.dataPropinsi.map(data=>{
                            return (
                            <option key={data.province_id} value={data.province_id}>{data.province}</option>
                            )
                            })
                        ) : <option>connecting to rajaongkir...</option>
                    }
                    </select>
                    {this.props.loadCitiesByState === true ? (
                        <div><Loader/></div>
                        ) : ( 
                            this.props.selectedState !== '' && (
                                <select placeholder="City" value={selectedCity} onChange={this.props.handleChangeCity}  required className="mt-3">
                                <option>Select Cities</option>
                                {this.props.cities.map((data, key) => {
                                    return(
                                        <option key={key} value={data.city_id}>{`${data.type} ${data.city_name}`}</option>
                                    )
                                })}
                                </select> 
                            )
                            
                        )
                    }
                </div> 
                <div id="true-false">
                    <label>
                        <input
                            type="checkbox"
                            value={primaryAddress}
                            checked={primaryAddress}
                            onChange={(e)=>this.setState({ primaryAddress: !primaryAddress })} />
                            {'  Make it the primary address'}
                    </label>
                    {/* <input type="radio" value={primaryAddress} name="primary_address" onClick={setPrimaryAddress}/> <span>Make it the primary address</span> */}
                </div> 
            </div>
            <div className="payment-modal-bottom add-address-bottom">
                <button id="cancel" type="button" className="btn " onClick={this.props.closeModalAddAddress}>Cancel</button>
                <button 
                    id="save" 
                    type="submit" 
                    className="btn btn-secondary" 
                    // onClick={handleFormAddress} 
                    disabled={this.props.saveBtnEnabled}
                    onMouseDown={() => this.setState({ submitCalled: true })}
                    >{this.props.progressStatus === true ? 'Posting...' : 'Save'}</button>
            </div>
            </form>
            </Modal>
        )
    }
  
}

export default MdlAddAddress; 
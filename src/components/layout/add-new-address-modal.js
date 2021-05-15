import React from 'react'
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import {Close} from '../../assets/properties';
import Loader from "../Loader";
// import {getPropince, getDestination} from '../../redux/actions/ongkir';

const MdlAddAddress = (props) => {
    const {  
        handleOpenModalPropinsi,
        modalIsOpenAddress,
        afterOpenModal,
        closeModalAddAddress,
        customStyles,
        contentLabel, 
        dataPropinsi,
        selectedState,
        handleChangeState,
        loadCitiesByState,
        cities,
        selectedCity,
        handleChangeCity,  

        setSaveAddressAs,
        setRecipientName,
        setRecipientPhoneNumber,
        setAddress,
        setPostalCode,
        setPrimaryAddress,

        saveAddressAs,
        recipientName,
        recipientPhoneNumber,
        address,
        postalCode,
        primaryAddress,

        handleFormAddress,
        progressStatus,

        saveBtnEnabled,
    } = props; 

    // const [openModalPropinsi, setOpenModalPropinsi] = React.useState(null)
    return (
        <Modal
            isOpen={modalIsOpenAddress}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModalAddAddress}
            style={customStyles}
            contentLabel={contentLabel}
            >
            <div className="modal-top address-top add-address-top">
                <h2>Add new address</h2>
                <button onClick={closeModalAddAddress}><Close/></button>
            </div>
            <div className="payment-modal-content add-address-content"> 
                <div id="save-as">
                    <label>Save address as (ex : home address, office address)</label>
                    <input 
                        type="text"
                        name="save_address_as"
                        placeholder="exp. Home Address"
                        className="p-2"
                        value={saveAddressAs}
                        onChange={setSaveAddressAs}
                        required/>
                        
                </div> 
                <div id="receipent">
                    <div>
                        <label>Recipient’s name</label>
                        <input 
                            type="text"
                            name="recipient_name"
                            placeholder="Receipent Name"
                            className="p-2"
                            value={recipientName}
                            onChange={setRecipientName}
                            required/>
                    </div>
                    <div>
                        <label>Recipient's telephone number</label>
                        <input 
                            type="text"
                            name="recipient_phone_number"
                            placeholder="exp. 085xxxxx"
                            className="p-2"
                            value={recipientPhoneNumber}
                            onChange={setRecipientPhoneNumber}
                            required/>
                    </div>
                </div>
                <div id="address-pos-code">
                    <div>
                        <label>Address</label>
                        <input 
                            type="text"
                            name="addresS"
                            placeholder="Nama Jalan dan Nomor Rumah"
                            className="p-2"
                            value={address}
                            onChange={setAddress}
                            required/>
                    </div>
                    <div>
                        <label>Postal code</label>
                        <input 
                            type="text"
                            name="postal_code"
                            placeholder="exp. 1440"
                            className="p-2"
                            value={postalCode}
                            onChange={setPostalCode}
                            required/>
                    </div>
                </div>
                <div id="city">
                    <label>City or Subdistrict</label>
                    <select placeholder="State" value={selectedState} onChange={handleChangeState}  required>
                        <option>Select Propinsi</option>
                    {
                        dataPropinsi.length >= 1 ? (
                            
                            dataPropinsi.map(data=>{
                            return (
                            <option key={data.province_id} value={data.province_id}>{data.province}</option>
                            )
                            })
                        ) : <option>connecting to rajaongkir...</option>
                    }
                    </select>
                    {loadCitiesByState === true ? (
                        <div><Loader/></div>
                        ) : ( 
                            selectedState !== '' && (
                                <select placeholder="City" value={selectedCity} onChange={handleChangeCity}  required className="mt-3">
                                <option>Select Cities</option>
                                {cities.map((data, key) => {
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
                            onChange={setPrimaryAddress}
                            required/>
                            {'  Make it the primary address'}
                    </label>
                    {/* <input type="radio" value={primaryAddress} name="primary_address" onClick={setPrimaryAddress}/> <span>Make it the primary address</span> */}
                </div> 
            </div>
            <div className="payment-modal-bottom add-address-bottom">
                <button id="cancel" type="button" className="btn " onClick={closeModalAddAddress}>Cancel</button>
                <button id="save" type="button" className="btn btn-secondary" onClick={handleFormAddress} disabled={saveBtnEnabled}>{progressStatus === true ? 'Posting...' : 'Save'}</button>
            </div>
        </Modal>
    )
}

export default MdlAddAddress; 
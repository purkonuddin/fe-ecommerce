import React from 'react'
import Modal from 'react-modal';
import {Close} from '../../assets/properties';

const MdlAddAddress = (props) => {
    const {
        modalIsOpenAddress,
        afterOpenModal,
        closeModalAddAddress,
        customStyles,
        contentLabel,
    } = props;

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
                    <input type="text"/>
                </div> 
                <div id="receipent">
                    <div>
                        <label>Recipient’s name</label>
                        <input type="text"/>
                    </div>
                    <div>
                        <label>Recipient's telephone number</label>
                        <input type="text"/>
                    </div>
                </div>
                <div id="address-pos-code">
                    <div>
                        <label>Address</label>
                        <input type="text"/>
                    </div>
                    <div>
                        <label>Postal code</label>
                        <input type="text"/>
                    </div>
                </div>
                <div id="city">
                    <label>City or Subdistrict</label>
                    <input type="text"/>
                </div> 
                <div id="true-false">
                    <input type="radio" value="true" name="primary_address"/> <span>Make it the primary address</span>
                </div> 
            </div>
            <div className="payment-modal-bottom add-address-bottom">
                <button id="cancel" type="button" className="btn ">Cancel</button>
                <button id="save" type="button" className="btn btn-secondary">Save</button>
            </div>
        </Modal>
    )
}

export default MdlAddAddress;
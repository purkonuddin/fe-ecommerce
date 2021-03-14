/* eslint-disable no-unused-vars */
import React from 'react';
import MdlAddAddress from "../layout/add-new-address-modal"; 
import Modal from 'react-modal';  
import {Close} from '../../assets/properties';

const Address = ({address, primaryAddress, customStyles}) => { 
    const addressCounst = address.length;
    var subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [modalIsOpenAddress,setIsOpenAddress] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }
    
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }
    
    function closeModal(){
        setIsOpen(false);
    }

    function openModalAddAddress(){
        setIsOpenAddress(true)
    }

    function closeModalAddAddress(){
        setIsOpenAddress(false)
    }
    
      return (
        <div id="yourAppElement">
            <h3>Shipping Adress</h3>
            {
                addressCounst > 0 ? (
                    <>
                    {address.filter((data) => data.primary_address === 'true').map((address, i) => 
                        i < 1 &&
                            <div className="addres" key={i.toString()}>
                                <p className="subtitle">{address.username}</p>
                                <p>{address.address}</p>
                                <button type="button" onClick={openModal}>Choose another address</button>
                            </div>
                    )} 
                    </>
                ) : (
                    <div className="addres">
                        <p>{'belum ada alamat yang ditambahkan'}</p>
                        <button type="button" onClick={openModal}>+</button>
                    </div>
                )
            }
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Choose another address"
                >
                <div className="modal-top address-top">
                    <h2 ref={_subtitle => (subtitle = _subtitle)}>Choose another address</h2>
                    <button onClick={closeModal}><Close/></button>
                </div>
                <div className="add-address-btn" onClick={openModalAddAddress}>
                    <button type="button">Add new address</button>
                </div> 
                <div className="address-content"> 
                    <div>
                        <h3>Andreas Jane</h3>
                        <p>Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja, Kabupaten Banyumas, Jawa Tengah, 53181 [Tokopedia Note: blok c 16] Sokaraja, Kab. Banyumas, 53181</p>
                        <button type="button">Change address</button>
                    </div> 
                </div>
            </Modal>
            <MdlAddAddress 
                modalIsOpenAddress={modalIsOpenAddress}
                afterOpenModal={afterOpenModal}
                closeModalAddAddress={closeModalAddAddress}
                customStyles={customStyles}
                contentLabel={"Add new address"}/> 
        </div>
      )
  }

  export default Address;
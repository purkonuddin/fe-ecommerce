import React from 'react'; 
import MdlAddAddress from "../layout/add-new-address-modal"; 

const Address = (props) => {
    const {
      handleOpenModal,
      modalIsOpenAddress,
      afterOpenModal,
      closeModalAddAddress,
      customStyles, 
    } = props;
  
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
              <button type="button" onClick={handleOpenModal}>Add new address</button>
            </div>
            <div className="address-list selected">
              <h2>Andreas Jane</h2>
              <p>Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja, Kabupaten Banyumas, Jawa Tengah, 53181 [Tokopedia Note: blok c 16] Sokaraja, Kab. Banyumas, 53181</p>
              <button type="button">Change address</button>
            </div>
          </div>
        </div>
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
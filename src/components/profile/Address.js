import React from 'react'; 
import MdlAddAddress from "../layout/add-new-address-modal"; 
import Modal from 'react-modal';
import {Close} from '../../assets/properties';
import Loader from "../Loader";

const propModalStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : '50%',
    bottom                : 'auto',
    marginRight           : '-50%',
    padding               : '10px',
    borderRadius          : '8px',
    boxShadow             : '0px 1px 20px 0px rgb(53 50 50 / 25%)',
    transform             : 'translate(-50%, -50%)'
  }
}; 

const Address = (props) => {
    const {
      userData,
      userAddress,

      dataPropinsi,
      handleOpenModal,
      modalIsOpenAddress,
      afterOpenModal,
      closeModalAddAddress,
      customStyles, 
      modalIsOpenPropinsi,
      handleOpenModalPropinsi,
      handleCloseModalPropinsi,
      handleChangeState,
      selectedState,
      loadCitiesByState,
      selectedCity,
      handleChangeCity,
      cities,
      selectedCityOrSubdistrict,

      handleSubmitFormAddress,
      progressStatus,

      loadUserAddress,
    } = props;

    const [customerId, setcustomerId] = React.useState(userData.user_id)
    const [saveAddressAs, setSaveAddressAs] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [primaryAddress, setPrimaryAddress] = React.useState(false)
    const [cityOrSubdistrict, setCityOrSubdistrict] = React.useState('')
    const [recipientName, setRecipientName] = React.useState('')
    const [recipientPhoneNumber, setRecipientPhoneNumber] = React.useState('')
    const [postalCode, setPostalCode] = React.useState('') 

    const [cityId, setCityId] = React.useState('')
    const [provinceId, setProvinceId] = React.useState('')
    const [cityName, setCityName] = React.useState('')
    const [provinceName, setProvinceName] = React.useState('')

    const [saveBtnEnabled, setSaveBtnEnabled] = React.useState(true)

    React.useEffect(()=>{ 
      const disabled = selectedCityOrSubdistrict.length === 0 ? true : false 
      setSaveBtnEnabled(disabled);
    },[selectedCityOrSubdistrict]) 

    const handleFormAddress = () => {
      if(selectedCityOrSubdistrict.length === 0){
        alert('city or subdistrict, Please fulfilled')
        return false
      }

      if(customerId === ''){
        alert('customer Id, Please fulfilled')
        return false
      }

      if(saveAddressAs === ''){
        alert('save Address As, Please fulfilled')
        return false
      }

      if(address === ''){
        alert('Address, Please fulfilled')
        return false
      }

      if(postalCode === ''){
        alert('postal Code, Please fulfilled')
        return false
      } 

      const dataForm = {
        customer_id: customerId,
        save_address_as: saveAddressAs,
        address: address,
        primary_address: primaryAddress || 'false',
        city_id: selectedCityOrSubdistrict[0].city_id,
        province_id: selectedCityOrSubdistrict[0].province_id,
        city_name: `${selectedCityOrSubdistrict[0].type} ${selectedCityOrSubdistrict[0].city_name}`,
        province_name: selectedCityOrSubdistrict[0].province,
        recipient_name: recipientName,
        recipient_phone_number: recipientPhoneNumber,
        postal_code: postalCode
      }

      // console.log(dataForm);
      handleSubmitFormAddress(dataForm)
    }

    console.log(
      saveAddressAs,
      recipientName,
      recipientPhoneNumber,
      address,
      postalCode,
      primaryAddress,
      cityId,
      provinceId,
      cityName,
      provinceName,
      saveBtnEnabled,
      selectedCityOrSubdistrict.length,
      loadUserAddress,
      userAddress.length
    );
  
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
            {loadUserAddress && 
              <div className="address-list selected">
                <Loader/>
                <p>fetching data...</p> 
              </div> 
            }
            {
              userAddress.length > 0 && (
                  userAddress.sort((a, b) => (a.primary_address > b.primary_address) ? -1 : 1).map((data, key)=>{
                    let selected = data.primary_address === 'true' ? "selected" : " "
                    return (
                      <div key={key} className={`address-list ${selected} mb-2`}>
                        <h2>{data.recipient_name}</h2>
                        <p>{`[${data.save_address_as}] : ${data.address}, ${data.city_name}, ${data.province_name}, ${data.postal_code}`}</p>
                        <button type="button">Change address</button>
                      </div>
                    )
                  })
              )   
            }
          </div>
        </div>
        <MdlAddAddress 
          modalIsOpenAddress={modalIsOpenAddress}
          afterOpenModal={afterOpenModal}
          closeModalAddAddress={closeModalAddAddress}
          customStyles={customStyles}
          contentLabel={"Add new address"}

          dataPropinsi={dataPropinsi}
          handleChangeState={handleChangeState}
          handleOpenModalPropinsi={handleOpenModalPropinsi}
          selectedState={selectedState}

          loadCitiesByState={loadCitiesByState}
          selectedCity={selectedCity}
          handleChangeCity={handleChangeCity}
          cities={cities} 

          setcustomerId={(e)=>setcustomerId(e.target.value)}
          setSaveAddressAs={(e)=>setSaveAddressAs(e.target.value)}
          setAddress={(e)=>setAddress(e.target.value)}
          setPrimaryAddress={(e)=>setPrimaryAddress(!primaryAddress)}
          setRecipientName={(e)=>setRecipientName(e.target.value)}
          setRecipientPhoneNumber={(e)=>setRecipientPhoneNumber(e.target.value)}
          setPostalCode={(e)=>setPostalCode(e.target.value)} 
          setCityOrSubdistrict={(e)=>setCityOrSubdistrict(e.target.value)}

          customerId={customerId}
          saveAddressAs={saveAddressAs}
          address={address}
          primaryAddress={primaryAddress}
          recipientName={recipientName}
          recipientPhoneNumber={recipientPhoneNumber}
          postalCode={postalCode}
          cityOrSubdistrict={cityOrSubdistrict}

          handleFormAddress={handleFormAddress}
          progressStatus={progressStatus}
          saveBtnEnabled={saveBtnEnabled}
          />
      </div>
    )
  } 

  export default Address;
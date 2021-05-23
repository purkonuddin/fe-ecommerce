/* eslint-disable no-unused-vars */
import React from 'react';
import MdlAddAddress from "../layout/add-new-address-modal"; 
import Modal from 'react-modal';  
import {Close} from '../../assets/properties';

const Address = ({
    userData,
    currAddress, 
    currPrimaryAddress, 
    customStyles,
    propinsi,
    loadingPropinsi,
    handleChangeState,
    handleOpenModalPropinsi,
    selectedState,
    loadCitiesByState,
    selectedCity,
    handleChangeCity,
    cities,
    selectedCityOrSubdistrict,
    handleSubmitFormAddress,
    progressStatus,
    loadUserAddress, 
}) => { 
    /**
     * for handling modal add address
     */
    const [customerId, setcustomerId] = React.useState(userData.user_id)
    const [saveAddressAs, setSaveAddressAs] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [primaryAddress, setPrimaryAddress] = React.useState(false)
    const [cityOrSubdistrict, setCityOrSubdistrict] = React.useState('')
    const [recipientName, setRecipientName] = React.useState('')
    const [recipientPhoneNumber, setRecipientPhoneNumber] = React.useState('')
    const [postalCode, setPostalCode] = React.useState('') 
    const [saveBtnEnabled, setSaveBtnEnabled] = React.useState(true)
    const [selectedId, setSelectedId] = React.useState(currPrimaryAddress.id)

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

    // const handleSelectedAddress = (id) => {
    //     setSelectedId(id)
    // }

    /**
     * handling other
     */ 

     React.useEffect(()=>{
        setSelectedId(currPrimaryAddress.id)
     },[currPrimaryAddress])

    const addressCounst = currAddress.length;
    let subtitle;
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

    // console.log("currPrimaryAddress.id", selectedId);
    
      return (
        <div id="yourAppElement">
            <h3>Shipping Adress {selectedId}</h3>
            {
                addressCounst > 0 ? (
                    <>
                    {currAddress.filter((data) => data.id === selectedId).map((address, i) => 
                        i < 1 &&
                            <div className="addres" key={i.toString()}>
                                <p className="subtitle">{address.recipient_name}</p>
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
                {
                    currAddress.length>0 ? (
                        currAddress.sort((a, b) => (a.primary_address > b.primary_address) ? -1 : 1).map((data, i)=>{
                            let selected = data.id === selectedId ? "selected" : "border"
                            return (
                                <div 
                                    style={{
                                        cursor: "pointer"
                                    }}
                                    key={i} 
                                    onClick={()=>setSelectedId(data.id)}
                                    className={`address-list ml-4 mr-4 mb-4 pb-3 pl-3 pr-3 pt-3 ${selected}`}>
                                <div>
                                    <h2>{data.recipient_name}</h2>
                                    <p>{`[${data.save_address_as}] : ${data.address}, ${data.city_name}, ${data.province_name}, ${data.postal_code}`}</p>
                                    <button type="button">Change address</button>
                                </div>
                                </div> 
                            )
                        })
                    ) : (
                        <p>no user address</p>
                    )
                }
                {/* <div className="address-content"> 
                    <div>
                        <h3>Andreas Jane</h3>
                        <p>Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja, Kabupaten Banyumas, Jawa Tengah, 53181 [Tokopedia Note: blok c 16] Sokaraja, Kab. Banyumas, 53181</p>
                        <button type="button">Change address</button>
                    </div> 
                </div> */}
            </Modal>
            <MdlAddAddress 
                // modalIsOpenAddress={modalIsOpenAddress}
                // afterOpenModal={afterOpenModal}
                // closeModalAddAddress={closeModalAddAddress}
                // customStyles={customStyles}
                // contentLabel={"Add new address"}
      
                dataPropinsi={propinsi}
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

                modalIsOpenAddress={modalIsOpenAddress}
                afterOpenModal={afterOpenModal}
                closeModalAddAddress={closeModalAddAddress}
                customStyles={customStyles}
                contentLabel={"Add new address"}
                /> 
                
        </div>
      )
  }

  export default Address;
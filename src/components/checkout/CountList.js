/* eslint-disable no-unused-vars */
import React from 'react';
import Modal from 'react-modal';  
import {GoPay, Mastercard, POS, Close} from '../../assets/properties';

const CountList = ({tl_order = 0, delivery_cost=0, checkout, handlePaymentMethod, customStyles}) => {
    const total_payment = tl_order + delivery_cost
    var subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false);
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

    return(
        <>
        <p className="co-subtitle">Shopping summary</p>
            <div className="subtotal-box">
                <div className="st-b-left">
                    <p>Order</p>
                    <p>Delivery</p>
                </div>
                <div className="st-b-right">
                    <p>Rp.{tl_order}</p>
                    <p>Rp.{delivery_cost}</p>
                </div>
            </div>
            <hr className="co-rb-line"/>
            <div className="total-box">
                <div className="tl-b-left">
                    <p>Shopping summary</p>
                </div>
                <div className="tl-b-right">
                    <p>Rp.{total_payment}</p>
                </div>
            </div>
        <button type="button" onClick={openModal}>Select payment</button>
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Payment"
            >
            <div className="modal-top payment-top">
            <h2 ref={_subtitle => (subtitle = _subtitle)}>Payment</h2>
            <button onClick={closeModal}><Close/></button>
            </div>
            
            <div className="payment-modal-content">
            <h3 className="mb-4">Payment method</h3>
            <div>
                <div className="payment-method mb-4"><img src={POS} alt="pos" height="38"/><span>Pos</span><input type="radio" name="payment-method" value="pos" onClick={handlePaymentMethod}/></div>
                <div className="payment-method mb-4"><img src={GoPay} className="gopay-img" alt="pos" height="38"/><span>Gopay</span><input type="radio" name="payment-method" value="gopay" onClick={handlePaymentMethod}/></div>
                <div className="payment-method mb-4"><img src={Mastercard} alt="pos" height="38"/><span>Mastercard</span><input type="radio" name="payment-method" value="mastercard" onClick={handlePaymentMethod}/></div>
            </div>
            </div> 

            <div className="payment-modal-content">
                <h3 className="mb-4">Shopping summary</h3>
                <div className="shopping-summary mb-4">
                    <p>Order<span>Rp.{tl_order}</span></p>
                    <p>Delivery<span>Rp.{delivery_cost}</span></p>
                </div>
            </div>

            <div className="payment-modal-bottom">
                <div>
                    <p className="mb-0">Shopping summary</p>
                    <p className="mb-0 price">Rp.{total_payment}</p>
                </div>
                <button type="button" className="btn btn-secondary w-50" onClick={checkout}>Buy</button>
            </div>
        </Modal>
        </>
    )
}

export default CountList;
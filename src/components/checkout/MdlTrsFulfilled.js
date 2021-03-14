import React from 'react';
import Modal from 'react-modal';  
import {Close} from '../../assets/properties';

const MdlTrsFulfilled = (props) => {
    const {
        modalIsOpen,
        afterOpenModal,
        closeModal,
        customStyles,
        contentLabel,
        orderDetail,
        paymentUrl,
    } = props;

    return (
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={ customStyles }
            contentLabel={contentLabel}
            >
            <div className="modal-top">
            <h2>Transaction is Fulfilled</h2>
            <button onClick={closeModal}><Close/></button>
            </div>
            
            <div className="payment-modal-content">
                <h3 className="mb-4">Order summary</h3>
                <div className="shopping-summary mb-5">
                    <p><span># Order ID</span></p>
                    <p>Blanja - {orderDetail.ORDER_ID}</p>
                </div> 
                <div className="shopping-summary mb-4">
                    <p>Order Date<span>{orderDetail.order_date}</span></p>
                    <p>Expire Date<span>{orderDetail.expire_date}</span></p>
                    <p>Shipment <span>{orderDetail.shiping_courir} - REG</span></p>
                    <p>Payment Total<span>Rp.{orderDetail.payment_total}</span></p>
                    <p>Payment Type<span>{orderDetail.payment_type}</span></p>
                </div>
            </div>

            <div className="payment-modal-bottom">
                <a href={`${paymentUrl}`} target="_blank" rel="noreferrer" className="btn btn-outline-warning w-75">Bayar</a>
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
            </div>
        </Modal>
    )
}

export default MdlTrsFulfilled;
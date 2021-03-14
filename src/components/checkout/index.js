/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import { connect } from 'react-redux';
import '../../styles/checkout.css';
import { withRouter } from 'react-router-dom';
import NavbarComp from "../layout/navbar"; 
import {Empty, GoPay, Mastercard, POS, Close} from '../../assets/properties';
import { getCart, checkout, patchCartList } from '../../redux/actions/checkout'; 
import {getUserAddress} from '../../redux/actions/user';
import {payment} from '../../redux/actions/payment';
import {getPropince, getDestination, postCost} from '../../redux/actions/ongkir';
// import {URL, KEY, LOGO} from './config';
import Modal from 'react-modal';
// import {v4 as uuidv4} from 'uuid';
// import midtransClient from 'midtrans-client';

// modal
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      padding               : '0px',
      borderRadius          : '8px',
      boxShadow             : '0px 1px 20px 0px rgb(53 50 50 / 25%)',
      transform             : 'translate(-50%, -50%)'
    }
  };
   
  // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

class Checkout  extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            categori: '',
            products: {},
            token: '',
            cart: [],
            total: 0,
            username:'',
            address: [],
            ongkir: 0,
            provinces: [],
            originCities: [],
            destinationCities: [],
            selectedOriginProvince: {
                province_id : "6",
                province : "DKI Jakarta"
            },
            selectedOriginCity: {
                city_id : "155",
                province_id : "6",
                province : "DKI Jakarta",
                type : "Kota",
                city_name : "Jakarta Utara",
                postal_code: "14140"
            },
            selectedDestinationProvince: null,
            selectedDestinationCity: null,
            weight: 0,
            courier: null,
            showModal: false,
            payment_type:'',
            primaryAddress:{},
            modalIsOpen: false,
            paymentUrl: '/',
            orderDetail: {
                ORDER_ID: '0000',
                order_date: new Date().toLocaleDateString(),
                expire_date: new Date().toLocaleDateString(),
                payment_total: '0000',
                payment_type: 'cash',
                shiping_courir: 'Kurir'
            }
        };
    }

    handleOpenModal =()=> {
        this.setState({ showModal: true });
    }
      
    handleCloseModal =()=> {
    this.setState({ showModal: false });
    }

    handleAddress = () => {

    }

    token = async () => {
        this.setState({
          token: await this.props.auth.profile.token,
          username: await this.props.auth.profile.user_name,
        });
      };

    componentDidMount = async () => {  
        if(this.props.auth.isAuthenticated){
            await this.token();
            const config = `Bearer ${this.state.token}`;
            await this.props.dispatch(getCart(config))
            this.setState({
                cart: this.props.checkout.getCart.data.result,
                total: this.props.checkout.getCart.data.result.reduce(
                    (accumulatedTotal, cartItem) =>
                        accumulatedTotal + cartItem.price_aft_disc * cartItem.qty, 
                        0
                ),
                weight: 500 * this.props.checkout.getCart.data.result.length,
                courier: 'jne',
            })
            await this.props.dispatch(getUserAddress(config))
            if(this.props.user.getUserAddress.isFulfilled){
                const alamatUsers = this.props.user.getUserAddress.data.result
                await this.setAddress()
                const {username}=this.state;
                // console.log('@alamatUsers:', alamatUsers);
                // set primary address
                await this.setPrimaryAddress(alamatUsers)
                // console.log('@primaryAddress: ', this.state.primaryAddress);
                // await this.onLoadProvince();  
                // load destination
                const propinsiId = this.state.primaryAddress.province_id
                await this.onLoadDestination(propinsiId);
                const {destinationCities} = this.state;
                // console.log('@destinationCities:', destinationCities);
                const cityId = this.state.primaryAddress.city_id
                // set destination city
                await this.setDestinationCity(cityId)
                const {selectedDestinationCity} = this.state;
                // console.log('@selectedDestinationCity: ', selectedDestinationCity);
                await this.setDestinationToPrimary()

                await this.checkOngkir(); 
            } 
        }else{
            this.props.history.push('/');
        }
    }

    setAddress = async()=>{
        const alamatUsers = this.props.user.getUserAddress.data.result;
        this.setState({
            address: alamatUsers
        })
    }

    setDestinationToPrimary =async()=>{
        const {primaryAddress, selectedDestinationCity} = this.state
            primaryAddress.city_name = selectedDestinationCity.city_name;
            primaryAddress.province = selectedDestinationCity.province;

        this.setState({
            primaryAddress:primaryAddress
        })
    }

    handleLog=()=>{
        const {primaryAddress} = this.state;
    }

    setDestinationCity = async (cityId) => {
        const destinationCities = this.state.destinationCities
        let selectedDestinationCity = ''
        destinationCities.forEach(element => {
            if (element.city_id === cityId.toString()) {
                selectedDestinationCity= element
            }
        });

        this.setState({
            selectedDestinationCity: selectedDestinationCity
        })
    }

    setPrimaryAddress = async (alamatUsers) => {
        alamatUsers.forEach(element => {
            if (element.primary_address === 'true') {
                this.setState({
                    primaryAddress: element
                })
            }
        })
    }

    onLoadProvince = async () => {
       await this.props.dispatch(getPropince());

       this.setState({
        provinces: this.props.ongkir.propince.data
       })
    };

    onLoadDestination = async (province_id)=>{
        await this.props.dispatch(getDestination(province_id)); 
        this.setState({
            destinationCities: await this.props.ongkir.destination.data.rajaongkir.results,
            originCities: await this.props.ongkir.destination.data.rajaongkir.results,
        })
    }

    checkOngkir = async () => { 
        if(
            this.state.selectedOriginCity === null ||
            this.state.selectedDestinationCity === null ||
            this.state.weight === 0 ||
            this.state.courier === null
        ){
            alert('Please fillout the destination city, lengkapi data alamat pengiriman!');
        } else {
            const data = {
                origin: this.state.selectedOriginCity.city_id,
                destination: this.state.selectedDestinationCity.city_id,
                weight: this.state.weight,
                courier: this.state.courier,
            }

            await this.props.dispatch(postCost(data)) 
            if(this.props.ongkir.cost.isFulfilled){
                this.setState({
                    ongkir: this.props.ongkir.cost.data.rajaongkir.results[0].costs[1].cost[0].value
                })
            }
            
        }
    };

    patchCartList = async () => {
        const {cart} = this.state;
        const config = `Bearer ${this.state.token}`;

        cart.forEach(async (element) =>{
            const data = {
                product_id: element.product_id, 
                qty: element.qty, 
                sts_items: 'order'
            }
            await this.props.dispatch(patchCartList(data, config))
        })
    }

    createOrder = async () => {
        const config = `Bearer ${this.state.token}`;
        const {primaryAddress, ongkir, total, payment_type,selectedDestinationCity} = this.state 
        const current = new Date();
        const expDate = new Date(Date.UTC(`${current.getFullYear()}`, `${current.getMonth()}`, `${current.getDate()+5}`, 0, 0, 0));
        const data = {
            order_date: current.toLocaleString(),
            expire_date: expDate.toLocaleString(),
            shiping_price: ongkir,
            total_price: total,
            discount: 0,
            payment_type: payment_type,
            payment_total: total + ongkir,
            shiping_courir:"jne",
            shiping_city:selectedDestinationCity.city_name,
            shiping_address:primaryAddress.address,
            sts_order:"menunggu",
            sts_payment:"menunggu"
        }
        await this.props.dispatch(checkout(data, config))
    }

    checkout = async()=> {
        const {payment_type} = this.state 
        if(payment_type === ''){
            alert('Please select a payment type!')
        }else{
            const config = `Bearer ${this.state.token}`;
            // ubah stat itemes to order
            await this.patchCartList();
            // create order
            await this.createOrder();
            if(this.props.checkout.postOrder.isFulfilled){
                const data = this.props.checkout.postOrder.data
                // payment with midtrans
                const midtrans = {
                    order_id: data.ORDER_ID,
                    gross_amount: data.payment_total
                }
                await this.props.dispatch(payment(midtrans, config))
                this.openModal()
            }
        
        }
    }

    handlePaymentMethod =(e)=>{
        this.setState({
            payment_type: e.target.value
        })
    }

    openModal=()=> {
        const orderDetail = this.props.checkout.postOrder.data
        const paymentUrl = this.props.payment.midtransClient.data
        this.setState({
            paymentUrl: paymentUrl,
            orderDetail: orderDetail,
            modalIsOpen: true,
        })
    }
    
    afterOpenModal=()=> {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }
    
    closeModal=()=>{
        this.setState({modalIsOpen: false})
        this.props.history.push('/');
    }

    render(){
        const {cart, address, primaryAddress, ongkir, total } = this.state 
        return (
            <div className="app">
                <NavbarComp page={"product"}/>
                { this.props.checkout.getCart.isRejected ? (
                        <div><p>{`Status: ${this.props.checkout.getCart.rejected.status}, Message: ${this.props.checkout.getCart.rejected.message}`}</p></div>
                    ) : this.props.checkout.getCart.isPending ? (
                        <div><p>Loading...</p></div>
                    ) : (
                        <div className="checkout-box">
                            <h2>Checkout</h2>
                            <div className="wrap-co-content">
                                <div className="co-left-box">
                                    <Address address={address} primaryAddress={primaryAddress}/>
                                    <CartList data={cart}/>
                                </div>
                                <div className="co-right-box">
                                    <CountList tl_order= {total} delivery_cost= {ongkir} checkout={() => this.checkout()} handlePaymentMethod={(e)=>this.handlePaymentMethod(e)}/>
                                </div>
                            </div>
                            <Modal
                                isOpen={this.state.modalIsOpen}
                                onAfterOpen={this.afterOpenModal}
                                onRequestClose={this.closeModal}
                                style={customStyles}
                                contentLabel="Fulfilled"
                                >
                                <div className="modal-top">
                                <h2>Transaction is Fulfilled</h2>
                                <button onClick={this.closeModal}><Close/></button>
                                </div>
                                
                                <div className="payment-modal-content">
                                    <h3 className="mb-4">Order summary</h3>
                                    <div className="shopping-summary mb-5">
                                        <p><span># Order ID</span></p>
                                        <p>Blanja - {this.state.orderDetail.ORDER_ID}</p>
                                    </div> 
                                    <div className="shopping-summary mb-4">
                                        <p>Order Date<span>{this.state.orderDetail.order_date}</span></p>
                                        <p>Expire Date<span>{this.state.orderDetail.expire_date}</span></p>
                                        <p>Shipment <span>{this.state.orderDetail.shiping_courir} - REG</span></p>
                                        <p>Payment Total<span>Rp.{this.state.orderDetail.payment_total}</span></p>
                                        <p>Payment Type<span>{this.state.orderDetail.payment_type}</span></p>
                                    </div>
                                </div>

                                <div className="payment-modal-bottom">
                                    <a href={`${this.state.paymentUrl}`} target="_blank" rel="noreferrer" className="btn btn-outline-warning w-75">Bayar</a>
                                    <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                                </div>
                            </Modal>
                        </div> 
                    )
                }


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      auth: state.auth,
      checkout: state.checkout,
      product: state.product,
      user: state.user,
      ongkir: state.ongkir,
      payment: state.payment,
    };
  };
  
  const Nav = withRouter(Checkout);
  
  export default connect(mapStateToProps)(Nav); 

  const Address = ({address, primaryAddress}) => { 
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
                <div className="modal-top">
                    <h2 ref={_subtitle => (subtitle = _subtitle)}>Choose another address</h2>
                    <button onClick={closeModal}><Close/></button>
                </div>
                <div onClick={openModalAddAddress}>
                    <button type="button">Add new address</button>
                </div> 
                <div>
                    {
                        [1,2,3].map((data, i)=>
                        <div key={i.toString()}>
                            <h3>Andreas Jane</h3>
                            <p>Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja, Kabupaten Banyumas, Jawa Tengah, 53181 [Tokopedia Note: blok c 16] Sokaraja, Kab. Banyumas, 53181</p>
                            <button type="button">Change address</button>
                        </div>
                        )
                    }
                </div>
            </Modal>
            <Modal
                isOpen={modalIsOpenAddress}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModalAddAddress}
                style={customStyles}
                contentLabel="Add new address"
                >
                <div className="modal-top">
                    <h2>Add new address</h2>
                    <button onClick={closeModalAddAddress}><Close/></button>
                </div>
                <div className="payment-modal-content"> 
                    <div>
                        <label>Save address as (ex : home address, office address)</label>
                        <input type="text"/>
                    </div> 
                    <div>
                        <div>
                            <label>Recipient’s name</label>
                            <input type="text"/>
                        </div>
                        <div>
                            <label>Recipient's telephone number</label>
                            <input type="text"/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Address</label>
                            <input type="text"/>
                        </div>
                        <div>
                            <label>Postal code</label>
                            <input type="text"/>
                        </div>
                    </div>
                    <div>
                        <label>City or Subdistrict</label>
                        <input type="text"/>
                    </div> 
                    <div>
                        <input type="radio" value="true" name="primary_address"/> Make it the primary address
                    </div> 
                </div>
                <div className="payment-modal-bottom">
                    <button type="button" className="btn ">Cancel</button>
                    <button type="button" className="btn btn-secondary">Save</button>
                </div>
            </Modal>
        </div>
      )
  }

const CartList = ({data}) => {
    return(
        <div className="item">
            {data.map((data, i)=>(
                <div key={i.toString()} className="list-item"> 
                    <div className="wrap-item-img"> 
                        {data.product_image === undefined 
                        ? <img src={Empty} alt={"asda "} width="70px" height="70px"/>
                        : <img src={data.product_image} alt={"asda "} width="70px" height="70px"/>
                        }
                    </div>
                    <div className="item-description">
                        <p>{data.product_name} - {data.product_color}</p>
                        <p className="brand">{data.seller}</p>
                        <p className="brand">{data.qty} x @ {data.price_aft_disc}</p>
                    </div>
                    <div className="item-price">
                        <p>{data.subtotal}</p>
                    </div>
                </div>
            ))
            }
        </div>
    )
}

const CountList = ({tl_order = 0, delivery_cost=0, checkout, handlePaymentMethod}) => {
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
            <div className="modal-top">
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
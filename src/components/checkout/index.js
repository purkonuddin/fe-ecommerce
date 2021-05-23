import React, {Component} from 'react';
import { connect } from 'react-redux';
import '../../styles/checkout.css';
import { withRouter } from 'react-router-dom';
import NavbarComp from "../layout/navbar"; 
// import MdlAddAddress from "../layout/add-new-address-modal"; 
// import {Empty, GoPay, Mastercard, POS, Close} from '../../assets/properties';
import { getCart, checkout, patchCartList } from '../../redux/actions/checkout'; 
import {getUserAddress, postUserAddress} from '../../redux/actions/user';
import {payment} from '../../redux/actions/payment';
import {getPropince, getDestination, postCost} from '../../redux/actions/ongkir';
import Modal from 'react-modal';  
import MdlTrsFulfilled from './MdlTrsFulfilled';
import Address from './Address';
import CartList from './CartList';
import CountList from './CountList';
import Loader from '../Loader';
import {customer} from '../../assets/properties';

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

class Checkout extends Component {
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
            selectedOriginProvince: this.props.selectedOriginProvince,
            selectedOriginCity: this.props.selectedOriginCity,
            selectedDestinationProvince: null,
            selectedDestinationCity: null,
            weight: 0,
            courier: null,
            showModal: false,
            payment_type:'',
            primaryAddress:this.props.primaryAddress,
            modalIsOpen: false,
            paymentUrl: '/',
            orderDetail: this.props.orderDetail,
            loadingCart: true,
            loadingAddress: true,
            loadPropinsi: true,
            loadDestination: true,
            myAccount: this.props.dataUser,
            cities:[],
            cityOrSubdistrict:[],
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

    fetchingCart = async () => {
        this.setState({loadingCart: true})
        const config = `Bearer ${this.state.token}`;
        await this.props.dispatch(getCart(config))
        if(this.props.checkout.getCart.isFulfilled){
            this.setState({
                cart: this.props.checkout.getCart.data.result,
                total: this.props.checkout.getCart.data.result.reduce(
                    (accumulatedTotal, cartItem) =>
                        accumulatedTotal + cartItem.price_aft_disc * cartItem.qty, 
                        0
                ),
                weight: 500 * this.props.checkout.getCart.data.result.length,
                courier: this.props.courier,
            })
        }
        this.setState({loadingCart: false})
    }

    fetchingUserAdress = async () => {
        this.setState({loadingAddress: true})
        const config = `Bearer ${this.state.token}`;
        await this.props.dispatch(getUserAddress(config))
        if(this.props.user.getUserAddress.isFulfilled){
            // user.getUserAddress.data.result
            // primary_address
            const alamatUsers = this.props.user.getUserAddress.data.result
            await this.setAddress() 
            await this.setPrimaryAddress(alamatUsers)
            const propinsiId = this.state.primaryAddress.province_id
            await this.onLoadDestination(propinsiId);
            const cityId = this.state.primaryAddress.city_id
            await this.setDestinationCity(cityId)
            await this.setDestinationToPrimary()
            await this.checkOngkir(); 
        } 
        this.setState({loadingAddress: false})
    }

    myAccount = async () => { 
        this.setState({loadMyAccount: true})
        this.setState({ 
          myAccount: await this.props.auth.profile,
          accountType: await this.props.auth.profile.account_type
        })
        this.sleep(5000)
        this.setState({loadMyAccount: false})
    }

    componentDidMount = async () => {  
        if(this.props.auth.isAuthenticated){
            await this.myAccount()
            await this.token(); 
            await this.fetchingCart() 
            await this.fetchingUserAdress()
            await this.getPropinsi()
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

    getPropinsi = async() => {
        this.setState({loadPropinsi: true})
        await this.props.dispatch(getPropince())
        if(this.props.ongkir.propince.isFulfilled){ 
          const dataProp = this.props.ongkir.propince.data.result.rajaongkir.results
          this.setState({provinces: dataProp})
        }
        this.setState({loadPropinsi: false})
    } 

    onLoadDestination = async (province_id)=>{
        this.setState({loadDestination: true})
        await this.props.dispatch(getDestination(province_id)); 
        this.setState({
            destinationCities: await this.props.ongkir.destination.data.rajaongkir.results,
            originCities: await this.props.ongkir.destination.data.rajaongkir.results,
        })
        this.setState({loadDestination: false})
    }

    checkOngkir = async () => { 
        if(
            this.state.selectedOriginCity === null ||
            this.state.selectedDestinationCity === null ||
            this.state.weight === 0 ||
            this.state.courier === null
        ){
            alert('Please fillout the destination city!');
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

    /**
     * 
     * @returns this section for handle modal add address
     */
    handleChangePropinsi = async (event)=> {
        let propinsiId = event.target.value
        this.setState({
          selectedState: propinsiId,
          loadCitiesByState: true
        });
        
        await this.loadCities(propinsiId) 
        if(this.props.ongkir.destination.isFulfilled){
          const destinations = this.props.ongkir.destination.data.rajaongkir.results;
          this.setState({
            loadCitiesByState: false,
            cities:destinations
          })
        }
    } 

    loadCities = async(propinsiId)=> {
        await this.props.dispatch(getDestination(propinsiId))
    }

    handleChangeCity = async(event, milliseconds = 2000)=>{
        const cityId = event.target.value
        this.setState({
          selectedCity: cityId
        })
        const kota = this.state.cities
        let selectedKota = []
        kota.filter(element => element.city_id === cityId).map(selected =>
           (
              selectedKota = [...selectedKota, selected]
            ) 
        )
        await this.sleep(milliseconds)
        this.setState({cityOrSubdistrict: selectedKota})
    }
    
    sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    handleSubmitFormAddress = async (data)=> {
        this.setState({isProcess: true})
        let config = `Bearer ${this.state.token}`;
        let formData = new FormData();
        formData.append('customer_id', data.customer_id);
        formData.append('save_address_as', data.save_address_as);
        formData.append('address', data.address);
        formData.append('primary_address', data.primary_address);
        formData.append('city_id', data.city_id);
        formData.append('province_id', data.province_id);
        formData.append('city_name', data.city_name);
        formData.append('province_name', data.province_name);
        formData.append('recipient_name', data.recipient_name);
        formData.append('recipient_phone_number', data.recipient_phone_number);
        formData.append('postal_code', data.postal_code);
        await this.props.dispatch(postUserAddress(data, config))
        await this.sleep(2000)
        await this.fetchingUserAdress()
        await this.sleep(2000)
        this.setState({isProcess: false})
        this.handleCloseModal()
    }
    

    render(){
        const {cart, address, primaryAddress, ongkir, total } = this.state 
        console.log(address, primaryAddress);
        return (
            <div className="app">
                <NavbarComp page={"product"}/>
                { this.state.loadingCart ? (
                        <div><p>{`Status: ${this.props.checkout.getCart.rejected.status}, Message: ${this.props.checkout.getCart.rejected.message}`}</p></div>
                    ) : this.props.checkout.getCart.isPending ? (
                        <Loader/>
                    ) : (
                        <div className="checkout-box">
                            <h2>Checkout</h2>
                            <div className="wrap-co-content">
                                <div className="co-left-box">
                                    {this.state.loadingAddress ? (
                                        <Loader/>
                                    ) : (
                                        <>
                                        <Address 
                                        userData={this.state.myAccount}
                                        currAddress={address} 
                                        currPrimaryAddress={primaryAddress}
                                        customStyles={customStyles}
                                        propinsi={this.state.provinces}
                                        loadingPropinsi={this.state.loadingPropinsi}
                                        handleChangeState={this.handleChangePropinsi}
                                        selectedState={this.state.selectedPropinsi}
                                        loadCitiesByState={this.state.loadCitiesByPropinsi}
                                        selectedCity={this.state.selectedCity}
                                        handleChangeCity={this.handleChangeCity}
                                        cities={this.state.cities}
                                        selectedCityOrSubdistrict={this.state.cityOrSubdistrict}
                                        handleSubmitFormAddress={this.handleSubmitFormAddress}
                                        progressStatus={this.state.isProcess}

                                        loadUserAddress={this.state.loadUserAddress}
                                        />
                                        </>
                                    )}
                                    
                                    <CartList data={cart}/>
                                </div>
                                <div className="co-right-box">
                                    <CountList
                                        tl_order= {total} 
                                        delivery_cost= {ongkir} 
                                        checkout={() => this.checkout()} 
                                        handlePaymentMethod={(e)=>this.handlePaymentMethod(e)}
                                        customStyles={customStyles}
                                    />
                                </div>
                            </div>
                            <MdlTrsFulfilled
                                modalIsOpen={this.state.modalIsOpen}
                                afterOpenModal={this.afterOpenModal}
                                closeModal={this.closeModal}
                                customStyles={customStyles}
                                contentLabel={"Transaction is Fulfilled"}
                                orderDetail={this.state.orderDetail}
                                paymentUrl={this.state.paymentUrl} 
                            />
                        </div> 
                    )
                }


            </div>
        )
    }
}

Checkout.defaultProps = {
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
    orderDetail: {
        ORDER_ID: '0000',
        order_date: new Date().toLocaleDateString(),
        expire_date: new Date().toLocaleDateString(),
        payment_total: '0000',
        payment_type: 'cash',
        shiping_courir: 'Kurir'
    },
    courier: "jne",
    primaryAddress: {
        address: "",
        city_id: 78,
        city_name: "",
        customer_id: "",
        id: 9,
        postal_code: "",
        primary_address: "false",
        province_id: 9,
        province_name: "",
        recipient_name: "",
        recipient_phone_number: "",
        save_address_as: "",
    },
    dataUser: {
        account_type: "",   
        user_email: "",
        user_id: "",
        user_image: customer,
        user_name: "Name",
        user_store: "Blanja"
      },
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
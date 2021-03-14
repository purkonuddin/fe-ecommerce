import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../styles/product-detail.css'
// import { Breadcrumb,  } from "react-bootstrap";
import { withRouter } from 'react-router-dom';
// import {Star, Star22} from '../../assets/properties'
import { getProducts, getProductById } from '../../redux/actions/product'; 
import { postToCart, getCart } from '../../redux/actions/checkout'; 
import NavbarComp from "../layout/navbar"; 
import ProductDetail from "../layout/product-detail"
import ProductSeller from "../layout/product-seller"
import BreadcrumbComp from '../layout/breadcrumb';

class ProductComp extends Component {
  constructor(props) {
    super(props);

    this.mediaQuery = {
        desktop: 1200,
        tablet: 768,
        phone: 576,
      };

    this.state = {
        product_id: '', 
        products: [],
        index:0,
        colorIdx:0,
        sizeIdx:0,
        product_size:'',
        jumlah: 1,
        selected:[
          {id:1, field:'id', value: ''},
          {id:2, field:'color', value: ''},
          {id:3, field:'size', value: ''},
          {id:4, field:'qty', value: 1},
          {id:5, field:'kondisi', value: ''}
        ],
        windowWidth: document.body.clientWidth,
        token:'',
        ditambahkan: false
    };
  }

  myRef = React.createRef();
  colorsRef=React.createRef();
  sizeRef = React.createRef();

  token = async () => {
    this.setState({
      token: await this.props.auth.profile.token,
    });
  };

  handleJumlah = (action, stok) => {
    let jumlah =  this.state.jumlah;
    const product_stock = parseInt(stok)

    if (action === 'min') {
      jumlah = jumlah <= 1 ? 1 : jumlah - 1;
      this.setState({jumlah:jumlah})

    } else {
      jumlah = jumlah >= product_stock ? product_stock : jumlah + 1;
      this.setState({jumlah:jumlah})
    } 

    let selected = this.state.selected
    selected.forEach(data => {
       if (data.field === 'qty')
       data.value =  jumlah
    })
    this.setState({selected: selected})
  }

  handleSize = (action, product_size) => {

    let length = product_size.length;
    let sizeIdx = this.state.sizeIdx; 
    // console.log(sizeIdx, length-1);

    // let  index = 0;
    if (action === 'min') {
      sizeIdx= sizeIdx === 0 ? length-1 : sizeIdx - 1;
      this.setState({sizeIdx:sizeIdx})

    } else {
      sizeIdx = sizeIdx === length-1 ? 0 : sizeIdx + 1;
      this.setState({sizeIdx:sizeIdx})
    } 

    // this.handleSizeRef();
  } 

  handleSizeRef = () => {
    let selected = this.state.selected
    const ukuran= this.sizeRef.current.innerHTML
    selected.forEach(data => {
      if (data.field === 'size')
      data.value =  ukuran
   })
   this.setState({selected: selected})
  }

  handleColorRef = () =>{
    let warna = this.colorsRef.current.children
    for(let i=0; i<warna.length; i++) {
      if(warna[i].className === "color-container ellipse" ){
        // console.log(this.colorsRef.current.children[i].children[0].attributes[2].value);
        let selected = this.state.selected

        selected.forEach(data => {
          if (data.field === 'color')
          data.value =  this.colorsRef.current.children[i].children[0].attributes[2].value
        })
        this.setState({selected: selected})
      } 
    }
  }

  handleColor= (index, e)=>{ 
    let warna = this.colorsRef.current.children
    for(let i=0; i<warna.length; i++) {warna[i].className = warna[i].className.replace("ellipse", "")}
    warna[index].className = "color-container ellipse";

    let selected = this.state.selected
    selected.forEach(data => {
       if (data.field === 'color')
       data.value =  e.target.value
    })
    this.setState({selected: selected})
  }

  handleTab= index => {
    this.setState({index:index})
    // console.log(this.myRef.current)
    const images = this.myRef.current.children
    for(let i=0; i<images.length;i++){images[i].className = images[i].className.replace("active", "")}
    images[index].className = "active";
  }

  getProductById = async (product_id) => { 
    await this.props.dispatch(getProductById(product_id)) 
    this.handleParams(product_id)
  }

  handleParams = (product_id) => { 
    this.setState({
      product_id: product_id, 
    })
  }

  getProducts = async () => {
    const data = {sort: 'DESC'};
    await this.props.dispatch(getProducts(data));
    this.setState({products: this.props.product.getProducts.data})
  }; 

  setId = () => {
    const {product} = this.props;
    const {selected} = this.state;
    if(product.getProductById.isFulfilled){ 
      const prd_id = product.getProductById.data.result[0].product_id;
      const prd_cond = product.getProductById.data.result[0].product_condition;

      selected.forEach(data => {
        if (data.field === 'id')
          data.value =  prd_id
        } 
      )

      selected.forEach(data => {
        if (data.field === 'kondisi')
          data.value =  prd_cond
        }
      )
      this.setState({selected: selected})
    }
  }

  componentDidMount = async () => { 
    window.addEventListener('resize', () => {
        this.setState({windowWidth: document.body.clientWidth})
    });

    if(this.props.match.params.product_id){
      await this.getProductById(this.props.match.params.product_id)
      // await this.props.dispatch(getProductById(this.props.match.params.product_id))
      this.setId();
    }

    await this.getProducts();

    if (this.props.auth.isAuthenticated) {
      await this.token();
    }

    let config = `Bearer ${this.state.token}`;
    await this.props.dispatch(getCart(config));


    // const {colorIdx} = this.state;
    // await this.myRef.current.children[index].className="active";
    // this.colorsRef.current.children[colorIdx].className="color-container ellipse";
  }  

  handleAddBag = async ()=> {
    this.handleSizeRef();
    this.handleColorRef();
    const {selected} = this.state;
    let alertMsg = [];

    selected.forEach(data => {
      if (data.value === '')
        alertMsg.push(`Please fillout product's ${data.field}`)
      } 
    )
    
    if(alertMsg.length > 0){
      alert(`Please fillout product's color`)

    }else{
      console.log(selected);
      //add to cart
      const data = {
        product_id:selected[0].value,  
        cart_product_condition:selected[4].value,
        cart_product_size:selected[2].value,
        cart_product_color:selected[1].value,
        cart_qty:selected[3].value
      }

      let config = `Bearer ${this.state.token}`;
      // console.log('TOKEN', config);
      await this.props.dispatch(postToCart(data, config));
      await this.props.dispatch(getCart(config));
      this.setState({ditambahkan: true})
    }
  }

  render() {
    const {product, checkout} = this.props;
    const {index, sizeIdx, jumlah, ditambahkan} = this.state;  

    return ( 
      <div className="app"> 
        <NavbarComp page={"product"} cartsnumber={ditambahkan}/>
        
        {product.getProductById.isFulfilled ? (
            <div>
              <BreadcrumbComp par1={'Home'} par2={`/category/${this.props.match.params.category}`} par3={this.props.match.params.category}/>
            {product.getProductById.data.result.length > 0
              ? (
                <>
                <ProductDetail 
                  BreadCrumb= {
                    <>
                    {checkout.getCart.isFulfilled &&
                      ditambahkan &&
                        <p>thank you... Add to Bag is fulfilled!</p>
                    }
                    </> 
                  }
                  disabledAddBtn = {ditambahkan}
                  data = {product.getProductById.data.result[0]}
                  handleJumlah = {this.handleJumlah} 
                  handleSize = {this.handleSize}
                  sizeRef = {this.sizeRef}
                  colorsRef = {this.colorsRef}
                  myRef = {this.myRef}
                  index = {index}
                  sizeIdx = {sizeIdx}
                  handleTab = {this.handleTab}
                  handleColor = {this.handleColor}
                  jumlah= {jumlah} 
                  handleAddBag = {this.handleAddBag}
                  {...this.props}
                /> 
                <ProductSeller title="You can also like this" subtitle="You’ve never seen it before!" product={this.props.product} refdata={product.getProductById.data.result[0]} sortBy="id" navTo={this.getProductById}/>
                </>
              ) : null
            } 
            </div>
        ) : product.getProductById.isRejected ? (
          <div><p>{`Status: ${product.getProductById.rejected.status}, Message: ${product.getProductById.rejected.message}`}</p></div>

        ) : (
          <div><p>Loading...</p></div>
        )
      }
      </div>
    );
  }
} 

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    product: state.product,
    checkout: state.checkout,
  };
};

const Nav = withRouter(ProductComp);

export default connect(mapStateToProps)(Nav);

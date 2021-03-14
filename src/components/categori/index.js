import React, {Component} from 'react';
import { connect } from 'react-redux';
import '../../styles/category.css';
import { withRouter } from 'react-router-dom';
import BreadcrumbComp from '../layout/breadcrumb';
import NavbarComp from "../layout/navbar"; 
import { getProducts } from '../../redux/actions/product'; 
import Product from "../layout/product"

class Category  extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            categori: '',
            products: {}
        };
    }

    componentDidMount = async () => {
        if(this.props.match.params.categori_id){ 
            const data = {
                sort: 'DESC',
                product_category: this.props.match.params.categori_id,
                order_by: 'id',
                limit: 100,
                page:1,
            };
            await this.props.dispatch(getProducts(data));
            this.setState({
                products: this.props.product.getProducts.data,
                categori: this.props.match.params.categori_id,
            })
        }else {
            this.props.history.push('/')
        }
    }

    render(){
        const {categori, products} = this.state
        console.log(products);
        return (
            <div className="app">
                <NavbarComp page={"categori"}/>
                <div>
                    <BreadcrumbComp par1={'Home'} par2={`/category/${this.props.match.params.categori_id}`} par3={categori}/>
                </div>
                { this.props.product.isRejected ? (
                        <div><p>{`Status: ${this.props.product.rejected.status}, Message: ${this.props.product.rejected.message}`}</p></div>
                    ) : this.props.product.isPending ? (
                        <div><p>Loading...</p></div>
                    ) : (
                        <Product title={categori} product={products} sortBy="id" limit={100}/> 
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      auth: state.auth,
      product: state.product,
    };
  };
  
  const Nav = withRouter(Category);
  
  export default connect(mapStateToProps)(Nav);
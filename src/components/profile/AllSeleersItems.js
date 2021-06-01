import React from 'react'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DatePicker from "react-datepicker";
import {customer} from '../../assets/properties';
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import Loader from "../Loader";
import { validateFields } from './Validation';
import classnames from 'classnames';
import { getProductsBySeller } from '../../redux/actions/product';
import ReactPaginate from 'react-paginate';
import './paging.css';

class AllSeleersItems extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            order_by: 'added_at',
            sort: 'DESC',
            limit: 5,
            page: 0,

            allItems: [],
            curren_page: 0,
            hasNextPages: false,
            has_more: false,
            next_page: 0,
            pages: [],
            total_items: 0,
            total_page: 0,
            isProsess: false,
            number:0,
        }
    }

    onInputChange = (e)=> {
        console.log(e);
    }

    handleClickPage = async(e)=>{
        const {order_by, sort, limit, page} = this.state;
        const selectedPage = e.selected;
        const offset = selectedPage * limit;
        console.log(selectedPage+1, offset);

        const data = {
            seller: this.props.auth.profile.user_store,
            order_by: order_by,
            sort: sort,
            limit: limit,
            page: selectedPage + 1
        }

        await this.props.dispatch(getProductsBySeller(data))
        if(this.props.product.sellersProducts.isFulfilled){
            this.setState({
                allItems: this.props.product.sellersProducts.data.data,
                curren_page: this.props.product.sellersProducts.data.curren_page,
                hasNextPages: this.props.product.sellersProducts.data.hasNextPages,
                has_more: this.props.product.sellersProducts.data.has_more,
                next_page: this.props.product.sellersProducts.data.next_page,
                pages: this.props.product.sellersProducts.data.pages,
                total_items: this.props.product.sellersProducts.data.total,
                total_page: this.props.product.sellersProducts.data.total_page,
                number: offset
            })
        }
    }

    componentDidMount=async()=>{
        const {order_by, sort, limit, page} = this.state;
        this.setState({isProsess: true})
        const data = {
            seller: this.props.auth.profile.user_store,
            order_by: order_by,
            sort: sort,
            limit: limit,
            page: page
        }
        await this.props.dispatch(getProductsBySeller(data))
        if(this.props.product.sellersProducts.isFulfilled){
            this.setState({
                allItems: this.props.product.sellersProducts.data.data,
                curren_page: this.props.product.sellersProducts.data.curren_page,
                hasNextPages: this.props.product.sellersProducts.data.hasNextPages,
                has_more: this.props.product.sellersProducts.data.has_more,
                next_page: this.props.product.sellersProducts.data.next_page,
                pages: this.props.product.sellersProducts.data.pages,
                total_items: this.props.product.sellersProducts.data.total,
                total_page: this.props.product.sellersProducts.data.total_page,
                number: 0,
            })
        }
        this.setState({isProsess: false})
    }

    render(){
        const {allItems, curren_page, limit, hasNextPages, has_more, next_page, pages, total_items, total_page, isProsess} = this.state;
        console.log('page',this.state);
        let {number} = this.state;
        if (isProsess) {
            return (<Loader/>)
        }
        return(
            <>
            <div className="p-5 col">
                <div className="row">
                    <input className="form-control mr-sm-2 mb-5" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>this.onInputChange(e)}/>
                </div>
                <div className="row">
                <div>{`${number + 1} - ${curren_page * limit} of ${total_items}`}</div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">product_id</th>
                        <th scope="col">product_name</th>
                        <th scope="col">product_price</th>
                        <th scope="col">product_stock</th>
                        <th scope="col">product_category</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        { total_items > 0 ? (
                                allItems.map((data, i)=> {
                                    number += 1
                                    return (
                                        <tr key={i}>
                                            <th scope="row">{number}</th>
                                            <td  className="card-title text-capitalize">{data.product_id}</td>
                                            <td  className="card-title text-capitalize">{data.product_name}</td>
                                            <td  className="card-title text-capitalize">{data.product_price}</td>
                                            <td  className="card-title text-capitalize">{data.product_stock}</td>
                                            <td  className="card-title text-capitalize">{data.product_category}</td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <th scope="row">#</th>
                                    <td  colSpan={5}>No Field</td> 
                                </tr>
                            )
                            
                        } 
                    </tbody>
                    </table>
                </div>
                <div className="row wrap-pagination"> 
                    {/* Using React Paginate */} 
                        <div>
                            <ReactPaginate
                            previousLabel={<i className="fa fa-chevron-circle-left" style={{color: '#47ccde'}} aria-hidden="true"></i>}
                            nextLabel={<i className="fa fa-chevron-circle-right" style={{color: '#47ccde'}} aria-hidden="true"></i>}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={total_page}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handleClickPage}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}/>
                        </div>
                </div>
            </div>
            </>
        )
    }
}

// export default AllSeleersItems;
const mapStateToProps = (state) => {
    return {
      auth: state.auth, 
      product: state.product,
    };
};
  
const Nav = withRouter(AllSeleersItems);

export default connect(mapStateToProps)(Nav);
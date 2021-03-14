import React from 'react';
import {Empty} from '../../assets/properties';

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

export default CartList;
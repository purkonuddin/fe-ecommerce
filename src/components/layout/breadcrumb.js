import React from 'react'
import {Breadcrumb} from 'react-bootstrap'

const BreadcrumbComp = ({par1, par2, par3}) => {
    return (
        <Breadcrumb>
            <Breadcrumb.Item href="/">{par1}</Breadcrumb.Item>
            <Breadcrumb.Item href={par2}>
            {'Category'}
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{par3}</Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default BreadcrumbComp;
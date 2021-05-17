import React from 'react'
import '../../styles/modal.css'
import PropTypes from 'prop-types';
import {Close} from '../../assets/properties';

const ModalPop = (props) => {
    const {
        ButtonComp,
        ModalContent,
        ModalBottom, 
      } = props;

    return ( 
        <div className="modal-container">
            <input id="modal-toggle" type="checkbox"/>
            {ButtonComp}
            <div className="modal-backdrop">
                <div className="modal-content">

                    <div className="modal-top">
                    <label className="modal-close button" htmlFor="modal-toggle"><Close/></label> 
                    <p>Filter</p>
                    </div>

                    <div className="modal-line"/>
                    <div className="modal-center">
                    {ModalContent}

                    </div>
                    <div className="modal-line"/>
                    <div className="modal-bottom">
                        {ModalBottom} 
                    </div>
                </div>
            </div>
        </div>
    )
}

ModalPop.defaultProps = {
    ButtonComp: <><button>Click me</button> </>,
    ModalContent: <><button>Content here!</button></>,
    ModalBottom: <>
        <button>Discard</button>
        <button>Apply</button>
    </>
  };

// ModalPop.PropTypes = {
//   };

export {ModalPop}
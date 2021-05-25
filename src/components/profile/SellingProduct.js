import React from 'react'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import {ProductPrev} from '../../assets/properties';
import Loader from "../Loader";
import { validateFields } from './Validation';
import classnames from 'classnames';

const initialProducts = {
    namaProduct: "",
    unitePrice:"",
    stock:"",
    images: [], // (array of strings)   
    description:""
};

class SellingProduct extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            products: initialProducts,
            selected: this.props.selected,
            selectedTab: this.props.selectedTab,
            namaProduct: {
                value: '',
                validateOnChange: false,
                error: ''
            }, 
            unitePrice: {
                value: '',
                validateOnChange: false,
                error: ''
            }, 
            stock: {
                value: '',
                validateOnChange: false,
                error: ''
            },
            images:[],
            description: '',
            submitCalled:false,
            allFieldsValidated: false,
            resetInput: false,
            isfulfilled: this.props.isfulfilled
        }
    }

    resetForm=()=>{
        this.setState({
            namaProduct: {
                value: '',
                validateOnChange: false,
                error: ''
            }, 
            unitePrice: {
                value: '',
                validateOnChange: false,
                error: ''
            }, 
            stock: {
                value: '',
                validateOnChange: false,
                error: ''
            },
            images:[],
            description: '',
            resetInput:true
        })
    }

    componentDidUpdate=()=> {
        if(this.props.product.postProduct.isFulfilled) {
            // this.resetForm()
            console.log('reset form prd', this.props);
            console.log('reset isProcess', this.props.isProcess);
        }
    }

    handleSubmit=(evt)=> { 
        console.log('handleSubmit',evt);
        evt.preventDefault();
        // validate all fields
        const {namaProduct, unitePrice, stock, images, description } = this.state
        const namaProductError = validateFields.validateName(namaProduct.value);
        const unitePriceError = validateFields.validateName(unitePrice.value);
        const stockError = validateFields.validateName(stock.value);
        const imagesError = images.length<=0 ? true : false;
        const descriptionError = description.length<=0 ? true : false;
        if ([namaProductError, unitePriceError,stockError, imagesError, descriptionError].every(e => e === false)) {
          // no errors submit the form
          console.log('success');
          let AinitialState = this.state
    
          // clear state and show all fields are validated
          this.setState({ ...AinitialState, allFieldsValidated: true });
          this.showAllFieldsValidated();
          this.props.handleFormInserProduct(this.state.products)
        } else {
          // update the state with errors
          console.log('canceled', this.state);

          this.setState(state => ({
            namaProduct: {
                ...state.namaProduct,
                validateOnChange: true,
                error: namaProductError
            },
            unitePrice: {
                ...state.unitePrice,
              validateOnChange: true,
              error: unitePriceError
            },
            stock:{
                ...state.stock,
                validateOnChange: true,
                error: stockError
            }, 
          })); 
        }
    }
    
    showAllFieldsValidated=()=> {
        setTimeout(() => {
            this.setState({ allFieldsValidated: false });
        }, 1500);
    }

    sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    handleBlur(validationFunc, evt) {
        const field = evt.target.name;
        // validate onBlur only when validateOnChange for that field is false
        // because if validateOnChange is already true there is no need to validate onBlur
        if (
          this.state[field]['validateOnChange'] === false &&
          this.state.submitCalled === false
        ) {
          this.setState(state => ({
            [field]: {
              ...state[field],
              validateOnChange: true,
              error: validationFunc(state[field].value)
            }
          }));
        }
        return;
    }

    handleInput = (e) => {
        let updateValues = { ...this.state.products };
        updateValues[e.target.name] = e.target.value;
        this.setState({products: updateValues});
        console.log("Update input values", updateValues);
    };

    handleChange=(validationFunc, evt) => {
        const field = evt.target.name;
        const fieldVal = evt.target.value;
        this.setState(state => ({
          [field]: {
            ...state[field],
            value: fieldVal,
            error: state[field]['validateOnChange'] ? validationFunc(fieldVal) : ''
          }
        }));
        this.handleInput(evt)
    }

    handleMultipleImages = (e) => {
        console.log("handleMultipleImages",e.target.files);
        // if (e.length > 0) {
        let updateValues = { ...this.state.products };
        updateValues.images = e.target.files;
        this.setState({
            images: e.target.files,
            products: updateValues
        });
        console.log("Update input values", updateValues);
        // }
    };

    handleDeskription=(val)=>{
        let updateValues = { ...this.state.products };
        updateValues.description = val;
        this.setState({
            description:val,
            products: updateValues
        });
        console.log("Update input values", updateValues);
    } 

    componentDidMount = async () => {
        console.log('props:', this.props);
    }

    render() {
        const {namaProduct, stock, unitePrice, images, description } = this.state
        // console.log(namaProduct, stock, unitePrice, images, description);
        return (
          <form onSubmit={evt => this.handleSubmit(evt)} enctype="multipart/form-data">
            {/* { this.renderChildren(this.props.children) } */}
            <Inventory>
                <input
                    type="text"
                    name="namaProduct"
                    placeholder=""
                    value={namaProduct.value}
                    className={classnames(
                        'form-control p-2 text-capitalize',
                        { 'is-valid': namaProduct.error === false },
                        { 'is-invalid': namaProduct.error }
                      )}
                    required
                    onChange={evt =>this.handleChange(validateFields.validateName, evt)}
                    onBlur={evt => this.handleBlur(validateFields.validateName, evt)}/>
                <div className="bg-transparent invalid-feedback mb-4">{namaProduct.error}</div>
            </Inventory>
            <ItemDetails>
                <div className="sc1-input">
                    <p> <label>Unit price</label></p>
                    <input
                        type="text"
                        name="unitePrice"
                        placeholder=""
                        value={unitePrice.value}
                        className={classnames(
                            'form-control p-2 text-capitalize',
                            { 'is-valid': unitePrice.error === false },
                            { 'is-invalid': unitePrice.error }
                          )}
                        required
                        onChange={evt =>this.handleChange(validateFields.validateName, evt)}
                        onBlur={evt => this.handleBlur(validateFields.validateName, evt)}/>
                    <div className="bg-transparent invalid-feedback mb-4">{unitePrice.error}</div>
                </div><br/>
                <div className="sc1-input">
                    <p> <label>Stock</label></p>
                    <input
                        type="text"
                        name="stock"
                        placeholder=""
                        value={stock.value}
                        className={classnames(
                            'form-control p-2 text-capitalize',
                            { 'is-valid': stock.error === false },
                            { 'is-invalid': stock.error }
                          )}
                        required
                        onChange={evt =>this.handleChange(validateFields.validateName, evt)}
                        onBlur={evt => this.handleBlur(validateFields.validateName, evt)}/>
                    <div className="bg-transparent invalid-feedback mb-4">{stock.error}</div>
                </div>
            </ItemDetails>
            <PhotoOfGoods setImages={this.handleMultipleImages}/> 
            {/* <div>
                <input 
                    className="form-control"
                    type="file"  
                    name="images" 
                    multiple 
                    accept="image/*"
                    onChange={evt=>this.handleMultipleImages(evt)}
                />
            </div> */}
            <Description setDescription={this.handleDeskription}/> 
            <div className="position-relative wrap-right-content" 
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                display: "flex"
            }}>
                <button type="submit" className="btn btn-primary" 
                    disabled={false}
                    onMouseDown={() => this.setState({ submitCalled: true })}>Save
                </button>
            </div>
          </form>
        )
    }
}

const Description = ({ 
    setDescription,
    children 
}) => {
    let _contentState = ContentState.createFromText('Sample content state');
    const raw = convertToRaw(_contentState)
    const [storeDescription, setStoreDescription] = React.useState('');
    const [contentState, setContentState] = React.useState(raw)
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );
    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    }

    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setStoreDescription(currentContentAsHTML); 
        setDescription(currentContentAsHTML)
    }

    const createMarkup = (html) => {
        return  {
          __html: DOMPurify.sanitize(html)
        }
    }

    // if(resetForm){
    //     setStoreDescription('')
    //     setDescription('')
    // }

    // React.useEffect(()=>{ 
    //     if(resetForm){
    //         setStoreDescription('')
    //         setDescription('')
    //     }
    // },[storeDescription, resetForm, setDescription])

    return(
    <div className="wrap-right-content">
        <div>
            <h3>Description</h3>
        </div>
        <hr/>
        <div className="" id="Description">
            <Editor
                defaultContentState={contentState}
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                wrapperClassName="wrapper-class"
                // editorClassName="editor-class"
                editorClassName = {classnames(
                    'editor-class form-control',
                    { 'is-valid': storeDescription.length > 50 ? true : false },
                    { 'is-invalid':storeDescription.length < 50 ? true : false }
                  )}
                toolbarClassName="toolbar-class"
                />
        </div>
        {/* <div className="preview" dangerouslySetInnerHTML={createMarkup(storeDescription)}></div> */}
    </div>
    )
}

const Inventory = ({ children }) => {
    const [namaProduct, setNamaProduct] = React.useState(''); 

    return (
    <div className="wrap-right-content">
        <div>
            <h3>Inventory</h3>
        </div>
        <hr/>
        <div className="rc-center" id="Inventory">
            <div className="sc1-input">
                <p> <label>Name of goods</label></p>
                {children} 
            </div>
        </div>
    </div>
)}

const ItemDetails = ({ children }) => {
    const [unitePrice, setUnitPrice] = React.useState(''); 
    const [stock, setStock] = React.useState(''); 

    return (
    <div className="wrap-right-content">
        <div>
            <h3>Item Details</h3>
        </div>
        <hr/>
        <div className="" id="ItemDetails">
            {children}
        </div>
    </div>
)}

const PhotoOfGoods = ({ 
    setImages,
    children 
}) => {
    const hiddenImagesInput = React.useRef(null);
    const [previewImages, setPreviewImages] = React.useState([]);
    const [selectedFiles, setSelectedFiles] = React.useState(undefined);

    const handleChangeImage = event => {
        setImages(event)

        let images = [];
        for (let i = 0; i < event.target.files.length; i++) {
            images.push(URL.createObjectURL(event.target.files[i]))
        }
        setPreviewImages(images)
        // setSelectedFiles(event.target.files)
    };

    const handleClickSelectImage = event => {
        hiddenImagesInput.current.click();
    };

    React.useEffect(()=>{ 
        console.log(selectedFiles);
    }, [selectedFiles])

    // React.useEffect(()=>{ 
    //     if(resetForm){
    //         setPreviewImages([])
    //     }
    // }, [resetForm])

    return (
    <div className="wrap-right-content">
        <div>
            <h3>Photo Of Goods</h3>
        </div>
        <hr/>
        {/* <div className="" id="PhotoOfGoods"> */}
        <div className="" style={{
            border: "1px dashed #D4D4D4",
            boxSizing:" border-box",
            borderRadius: "4px",
            padding: "2em",
            marginBlock: "2em"
        }}>
            <div 
                className="" 
                style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center"
                }}>
            {/* foto */}
            {previewImages.length > 0 ? (
                <>
                {previewImages.map((img, i) => {
                    if (i === 0) {
                        return (
                            <div key={i} style={{
                                width: "fit-content",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}>
                                <img 
                                    src={img} alt={"image-" + i}  
                                    key={i} 
                                    width="190" 
                                    height="190"
                                    style={{
                                        background: "#D4D4D4",
                                        borderRadius: "6px",
                                        marginInline: "5px"
                                    }}/>
                                <span>Foto Utama</span>
                            </div>
                        );
                    }
                    return <img
                        src={img} 
                        alt={"image-" + i}  
                        key={i} 
                        width="120" 
                        height="120"
                        style={{
                            background: "#D4D4D4",
                            borderRadius: "6px",
                            marginInline: "5px"
                        }}/>;
                })}
                </>
            ) : (
                <>
                {[1,2,3,4,5].map((img, i) => {
                    if (i === 0) {
                        return (
                            <div
                                key={i}
                                className="preview" 
                                style={{
                                    width: "fit-content",
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    justifyContent: "center"
                                }}>
                                <img src={ProductPrev} alt={"image-" + i}  key={i} width="190" height="190"/>
                                <span>Foto Utama</span>
                            </div>
                        );
                    }
                    return <img src={ProductPrev} alt={"image-" + i}  key={i} width="120" height="120"/>;
                })} 
                </>
            )
            } 
            </div>
            <hr/>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <button 
                    type="button" 
                    className="mt-3" 
                    style={{
                        border: "1px solid #9B9B9B",
                        boxSizing: "border-box",
                        borderRadius: "24px",
                        color: "#9B9B9B",
                        paddingInline: "5em",
                        paddingBlock: "0.5em"
                    }}
                    onClick={handleClickSelectImage}>Select image</button>
                <input 
                    className="form-control"
                    type="file"  
                    name="images" 
                    ref={hiddenImagesInput}
                    multiple 
                    accept="image/*"
                    onChange={handleChangeImage}
                    style={{
                        visibility: "hidden",
                        position:"absolute"
                    }}/>
            </div> 
          </div> 
        {/* </div> */}
    </div>
)}

// export default SellingProduct 

const mapStateToProps = (state) => {
    return {
      product: state.product
    };
};
  
const Nav = withRouter(SellingProduct);
  
export default connect(mapStateToProps)(Nav);
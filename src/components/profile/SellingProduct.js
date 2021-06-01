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
import {postProduct} from '../../redux/actions/product';

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
            description: {
                value: '',
                validateOnChange: false,
                error: ''
            },
            submitCalled:false,
            allFieldsValidated: false,
            resetInput: false,
            isfulfilled: this.props.isfulfilled,
            isProcess: false
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
            description: {
                value: '',
                validateOnChange: false,
                error: ''
            },
            submitCalled:false,
            allFieldsValidated: false,
            resetInput:true
        })
    }

    // componentDidUpdate=()=> {
    //     if(this.props.product.postProduct.isFulfilled) {
    //         /**reset form */
    //         this.resetForm();
    //     }
    // }

    handleFormInserProduct = async ()=> {
        const {namaProduct, unitePrice, stock, images, description} = this.state;
        console.log(namaProduct, unitePrice, stock, images, description); 
        this.setState({isProcess: true})
        let config = `Bearer ${this.props.auth.profile.token}`;
        let fd = new FormData();
        fd.append('product_name', namaProduct.value);
        fd.append('product_description', description.value);
        fd.append('images', images);  
        fd.append('product_category', "T-shirt");
        fd.append('product_price', unitePrice.value);
        fd.append('disc', 0);
        fd.append('product_stock', stock.value);
        //    fd.append('seller', this.props.auth.profile.user_store);
        fd.append('product_rating', 0);
        fd.append('product_condition', "baru");
        fd.append('product_size', "S, XL, L, M, XXL");
        fd.append('product_color', "020202, B82222, 151867, FFFFFF");
        await this.props.dispatch(postProduct(fd, config))
        new Response(fd).text().then(console.log)
        await this.sleep(2000)
        this.setState({ isProcess: false })
        if(this.props.product.postProduct.isFulfilled) {
            /**reset form */
            console.log('isFulfilled');
            this.resetForm();
        }else{
            console.log('unFulfilled');
        }
    }

    handleSubmit=(evt)=> {  
        evt.preventDefault();
        // validate all fields
        const {namaProduct, unitePrice, stock, images, description } = this.state
        const namaProductError = validateFields.validateName(namaProduct.value);
        const unitePriceError = validateFields.validatePrice(unitePrice.value);
        const stockError = validateFields.validateStok(stock.value);
        const imagesError = images.length<=0 ? true : false;
        const descriptionError = validateFields.validateText(description.value);
        if ([namaProductError, unitePriceError,stockError, imagesError, descriptionError].every(e => e === false)) {
          // no errors submit the form
          console.log('success');
          let AinitialState = this.state
          // clear state and show all fields are validated
          this.setState({ ...AinitialState, allFieldsValidated: true });
          this.showAllFieldsValidated();
          this.handleFormInserProduct()
        } else { 
            // console.log(namaProductError, unitePriceError,stockError, imagesError, descriptionError);
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
            description:{
                ...state.description,
                validateOnChange: true,
                error: descriptionError
            }
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
    }

    handleMultipleImages = (e) => { 
        let updateValues = { ...this.state.products };
        updateValues.images = e.target.files;
        this.setState({
            images: e.target.files,
            products: updateValues
        }); 
    };

    handleDeskription=(val)=>{ 
        const field = "description";
        const fieldVal = val;
        this.setState(state => ({
          [field]: {
            ...state[field],
            value: fieldVal,
            error: state[field]['validateOnChange'] ? validateFields.validateText(fieldVal) : ''
          }
        }));
    } 

    componentDidMount = async () => { 
        
    }

    render() {
        const {namaProduct, stock, unitePrice, images, description, isProcess, resetInput } = this.state
        return (
          <form onSubmit={evt => this.handleSubmit(evt)} encType="multipart/form-data">
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
                        onChange={evt =>this.handleChange(validateFields.validatePrice, evt)}
                        onBlur={evt => this.handleBlur(validateFields.validatePrice, evt)}/>
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
                        onChange={evt =>this.handleChange(validateFields.validateStok, evt)}
                        onBlur={evt => this.handleBlur(validateFields.validateStok, evt)}/>
                    <div className="bg-transparent invalid-feedback mb-4">{stock.error}</div>
                </div>
            </ItemDetails>
            <PhotoOfGoods setImages={this.handleMultipleImages} _resetInput={resetInput}/>  
            <Description setDescription={this.handleDeskription} _resetInput={resetInput}/> 
            <div className="position-relative wrap-right-content" 
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                display: "flex"
            }}>
                <button type="submit" className="btn btn-primary" 
                    disabled={false}
                    onMouseDown={() => this.setState({ submitCalled: true })}>
                        {isProcess=== true ? 'Posting...' : 'Save'}
                </button>
            </div>
          </form>
        )
    }
}

const Description = ({ 
    setDescription,
    _resetInput
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

    React.useEffect(()=>{
        if(_resetInput === true) {
            setEditorState(() => EditorState.createEmpty())
            convertContentToHTML();
        }
    },[_resetInput])

    const createMarkup = (html) => {
        return  {
          __html: DOMPurify.sanitize(html)
        }
    } 

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
                editorClassName = {classnames(
                    'editor-class form-control',
                    { 'is-valid': storeDescription.length > 50 ? true : false },
                    { 'is-invalid':storeDescription.length > 1 && storeDescription.length < 50 ? true : false }
                  )}
                toolbarClassName="toolbar-class"
                />
            {storeDescription.length > 1 && storeDescription.length < 50 ?  
                (<div className="bg-transparent invalid-feedback mb-4 d-flex">this field should minimal 50 characters</div>)
                : null
            }
        </div>
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
    _resetInput 
}) => {
    const hiddenImagesInput = React.useRef(null);
    const [previewImages, setPreviewImages] = React.useState([]);
    // const [selectedFiles, setSelectedFiles] = React.useState(undefined);

    const handleChangeImage = event => {
        setImages(event)

        let images = [];
        for (let i = 0; i < event.target.files.length; i++) {
            images.push(URL.createObjectURL(event.target.files[i]))
        }
        setPreviewImages(images) 
    };

    const handleClickSelectImage = event => {
        hiddenImagesInput.current.click();
    };
    
    React.useEffect(()=>{
        if(_resetInput === true) { 
            setPreviewImages([]) 
        }
    },[_resetInput])

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
        auth: state.auth,
        product: state.product,
        checkout: state.checkout,
        ongkir: state.ongkir,
        user: state.user,
    };
};
  
const Nav = withRouter(SellingProduct);
  
export default connect(mapStateToProps)(Nav);
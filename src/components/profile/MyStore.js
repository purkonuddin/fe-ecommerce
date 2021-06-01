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
import { createMyStore, getMyStore } from '../../redux/actions/user';

class MyStore extends React.Component{
    constructor(props) {
        super(props); 
        this.state = {
            userStore: this.props.userStore,
            userData: this.props.userData,
            storeName: {
                value: '',
                validateOnChange: false,
                error: ''
            },
            email: {
                value: '',
                validateOnChange: false,
                error: ''
            },
            phoneNumber: {
                value: '',
                validateOnChange: false,
                error: ''
            },
            storeDescription: {
                value: '',
                validateOnChange: false,
                error: ''
            }, 
            storeImage: '',
            imageFile: [],
            submitCalled:false,
            allFieldsValidated: false,
            isProsess: false
        }
        this.hiddenImageInput = React.createRef();
    }

    sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    handleFormInsertStore = async()=>{ 
        const {userData, storeName, email, phoneNumber, storeDescription, imageFile} = this.state;
        this.setState({isProsess: true})
        let config = `Bearer ${userData.token}`;
        let formData = new FormData();
        formData.append('store_name', userData.user_store );
        formData.append('email', email.value);
        formData.append('phone_number', phoneNumber.value);
        formData.append('store_description', storeDescription.value); 
        formData.append('image', imageFile); 
        await this.props.dispatch(createMyStore(formData, config)); 
        await this.props.dispatch(getMyStore(config))
        await this.sleep(5000)
        this.setState({isProsess: false}) 
    }

    handleSubmitStore=(evt)=> { 
        // console.log('handleSubmit',evt);
        evt.preventDefault();
        const {userData, storeName, email, phoneNumber, storeDescription} = this.state;
        // validate all fields
        const errStoreName = validateFields.validateName(storeName.value);
        const errEmail = validateFields.validateEmail(email.value);
        const errPhoneNumber = validateFields.validatePhone(phoneNumber.value);
        const errStoreDescription = validateFields.validateText(storeDescription.value);
        if ([errStoreName, errEmail, errPhoneNumber, errStoreDescription].every(e => e === false)) {
          // no errors submit the form
          console.log('success');
          let AinitialState = this.state
          // clear state and show all fields are validated
          this.setState({ ...AinitialState, allFieldsValidated: true });
          this.showAllFieldsValidated();
          this.handleFormInsertStore()
        } else {
            console.log('denide');
          // update the state with errors
          this.setState(state => ({
            storeName: {
                ...state.storeName,
                validateOnChange: true,
                error: errStoreName
            },
            email: {
                ...state.email,
              validateOnChange: true,
              error: errEmail
            },
            errPhoneNumber:{
                ...state.errPhoneNumber,
                validateOnChange: true,
                error: errPhoneNumber
            }, 
            storeDescription:{
                ...state.storeDescription,
                validateOnChange: true,
                error: errStoreDescription
            }, 
          })); 
        }
    }
    
    showAllFieldsValidated=()=> {
        setTimeout(() => {
            this.setState({ allFieldsValidated: false });
        }, 1500);
    }

    handleDeskription = (val)=> { 
        // console.log('stockError', val);
        const field = "storeDescription";
        const fieldVal = val;
        this.setState(state => ({
          [field]: {
            ...state[field],
            value: fieldVal,
            error: state[field]['validateOnChange'] ? validateFields.validateText(fieldVal) : ''
          }
        }));
    } 

    handleBlur(validationFunc, evt) {
        const field = evt.target.name;
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

    handleClickSelectImage = event => {
        this.hiddenImageInput.current.click();
    };

    handleChangeImage = event => {
        const fileUploaded = event.target.files[0];
        this.setState({
            storeImage: URL.createObjectURL(fileUploaded),
            imageFile: fileUploaded
        })
    };

    componentDidMount = async () => {
        const config = `Bearer ${this.props.userData.token}`;
        await this.props.dispatch(getMyStore(config))

        const {user} = this.props;
        // console.log('componentDidMount',this.props);
        if(user.getMyStore.isFulfilled && user.getMyStore.data.id !== undefined){
            const {store_name, email, phone_number, store_description, store_image} = user.getMyStore.data;
            // console.log(store_name, email, phone_number, store_description, store_image);
            this.setState(state => ({
                storeName: {
                    ...state.storeName,
                    value: store_name,
                    error: ''
                },
                email: {
                    ...state.email,
                  value: email,
                  error: ''
                },
                phoneNumber:{
                    ...state.phoneNumber,
                    value:phone_number,
                    error: ''
                },
                storeDescription: {
                    ...state.storeDescription,
                    value:store_description,
                    error: ''
                },
                storeImage: store_image
            }))
        }else{
            const field = "storeName";
            const fieldVal = this.props.userData.user_store;
            this.setState(state => ({
            [field]: {
                ...state[field],
                value: fieldVal,
                error: ''
            }
            }));
        } 
    }

    createMarkup = (html) => {
        return  {
            __html: DOMPurify.sanitize(html)
        }
    }

    render(){ 
        // console.log('isproses', this.state.isProsess);
        const {isProsess, storeName, email, phoneNumber, storeDescription, storeImage} = this.state;
        return(
            <div className="wrap-right-content">
                <div >
                    <h3>My profile store</h3>
                    <p>Manage your profile information</p>
                    <hr/>
                </div> 
                <div className="rc-center">
                <form className="row" onSubmit={evt => this.handleSubmitStore(evt)} encType="multipart/form-data">
                    <div className="m-0 col row section-1">
                        <div className="col sc1-title">
                            <p>Store name</p>
                            <p>Email</p>
                            <p>Phone number</p>
                            {/* <p>Store description</p>  */}
                        </div>
                        <div className="col sc1-input">
                                <div> 
                                    <input type="text" name="storeName" placeholder="" value={storeName.value}
                                        className={classnames( 'form-control p-2 text-capitalize', { 'is-valid': storeName.error === false }, { 'is-invalid': storeName.error } )} 
                                        onChange={evt =>this.handleChange(validateFields.validateName, evt)}
                                        onBlur={evt => this.handleBlur(validateFields.validateName, evt)}/>
                                    <div className="bg-transparent invalid-feedback mb-4 d-flex">{storeName.error}</div>
                                </div>
                                <div>
                                    <input type="text" name="email" placeholder="" value={email.value}
                                        className={classnames( 'form-control p-2 text-capitalize', { 'is-valid': email.error === false }, { 'is-invalid': email.error } )} 
                                        onChange={evt =>this.handleChange(validateFields.validateEmail, evt)}
                                        onBlur={evt => this.handleBlur(validateFields.validateEmail, evt)}/>
                                    <div className="bg-transparent invalid-feedback mb-4 d-flex">{email.error}</div>
                                </div>
                                <div>
                                    <input type="text" name="phoneNumber" placeholder="" value={phoneNumber.value}
                                        className={classnames( 'form-control p-2 text-capitalize', { 'is-valid': phoneNumber.error === false }, { 'is-invalid': phoneNumber.error } )} 
                                        onChange={evt =>this.handleChange(validateFields.validatePhone, evt)}
                                        onBlur={evt => this.handleBlur(validateFields.validatePhone, evt)}/>
                                    <div className="bg-transparent invalid-feedback mb-4 d-flex">{phoneNumber.error}</div>
                                </div>  
                        </div>
                    </div>
                    <div className="col section-foto left-border">
                        {/* foto */}
                        <img src={storeImage === '' ? customer : storeImage} alt="asdf" width="111" height="111"/>
                        <button 
                        type="button" 
                        className="mt-3" 
                        onClick={this.handleClickSelectImage.bind(this)}>Select image</button>
                        <input 
                        type="file" 
                        encType="multipart/form-data" 
                        name="image" 
                        ref={this.hiddenImageInput}
                        onChange={this.handleChangeImage.bind(this)}/>
                    </div> 
                    <div> 
                        <Description setDescription={this.handleDeskription}/> 
                        <div className="breadcrumb">
                            <div className="preview" dangerouslySetInnerHTML={this.createMarkup(storeDescription.value)}></div>
                        </div>
                    </div>
                    <div>
                        {/* buton */}
                        <button className="btn btn-secondary" type="submit">
                        {!isProsess ? 'Save' : 'Processing...'}
                        </button>
                    </div>
                </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      auth: state.auth, 
      user: state.user,
    };
};
  
const Nav = withRouter(MyStore);

export default connect(mapStateToProps)(Nav);

// export default MyStore;

MyStore.defaultProps = {
    userStore: {
        store_name: '',
        email: '',
        phone_number: '',
        store_description: '',
        store_image:'', 
    },
    userData: {
        user_id: '',
        user_store: ''
    }
}

const Description = ({ 
    setDescription, 
}) => {
    let _contentState = ContentState.createFromText('Sample content state');
    const raw = convertToRaw(_contentState)
    const [storeDescription, setStoreDescription] = React.useState('defaultDescription');
    const [contentState, setContentState] = React.useState(raw)
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );
    const handleEditorChange = (state) => {
        // console.log(state);
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
                (<div className="bg-transparent invalid-feedback mb-4 d-flex">Store description minimal 50 characters</div>)
                : null
            }
            </div>
    </div>
    )
}
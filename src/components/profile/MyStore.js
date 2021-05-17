import React from 'react'; 
import DatePicker from "react-datepicker";
import {customer} from '../../assets/properties';
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';

const MyStore = (props) => {
    const {
        progressStatus,    
        handleSaveMyStore,
    } = props
 
    const hiddenImageInput = React.useRef(null);

    const [storeName, setStoreName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [storeDescription, setStoreDescription] = React.useState('');
    const [storeImage, setStoreImage] = React.useState('');
    const [imageFile, setImageFile] = React.useState(null);

    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
      );
      
    let _contentState = ContentState.createFromText('Sample content state');
    const raw = convertToRaw(_contentState)
    const [contentState, setContentState] = React.useState(raw)

    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    }

    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setStoreDescription(currentContentAsHTML);
    }

    const createMarkup = (html) => {
        return  {
          __html: DOMPurify.sanitize(html)
        }
    }

    React.useEffect(()=>{ 
        // let coba = EditorState.createEmpty()
        // console.log('coba ',coba);
    }, []);

    const onSubmitHandler = () => {
        let data = {
            store_name: storeName,
            email: email,
            phone_number: phoneNumber,
            store_description: storeDescription, 
            store_image: imageFile
        }
        handleSaveMyStore(data);
    }

    const handleClickSelectImage = event => {
        hiddenImageInput.current.click();
    };

    const handleChangeImage = event => {
        const fileUploaded = event.target.files[0];
        setStoreImage(URL.createObjectURL(fileUploaded))
        setImageFile(fileUploaded)
    };
    
    // console.log('storeDescription', storeDescription);

    return(
        <div className="wrap-right-content">
            <div >
                <h3>My profile store</h3>
                <p>Manage your profile information</p>
                <hr/>
            </div>
            <div className="rc-center">
                <div className="section-1">
                    <div className="sc1-title">
                        <p>Store name</p>
                        <p>Email</p>
                        <p>Phone number</p>
                        <p>Store description</p> 
                    </div>
                    <div className="sc1-input">
                        <p><input 
                            type="text" 
                            placeholder="store name"
                            name="storeName"
                            disabled
                            value={storeName} 
                            onChange={(e)=>setStoreName(e.target.value)}/></p>
                        <p><input 
                            type="text" 
                            placeholder="email@blanja.com"
                            name="email" 
                            value={email} 
                            onChange={(e)=>setEmail(e.target.value)}/></p>
                        <p><input 
                            type="text" 
                            placeholder="exp:. 085777XXXX"
                            name="phoneNumber" 
                            value={email} 
                            onChange={(e)=>setPhoneNumber(e.target.value)}/></p>
                        {/* <p> */}
                            {/* <textarea 
                                id="store_description" 
                                name="store_description" 
                                value={storeDescription} 
                                placeholder="Store description..."
                                onChange={(e)=>setStoreDescription(e.target.value)} 
                            ></textarea> */}
                            <Editor
                                defaultContentState={contentState}
                                // onContentStateChange={setContentState}
                                editorState={editorState}
                                onEditorStateChange={handleEditorChange}
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                toolbarClassName="toolbar-class"
                                />
                        {/* </p> */}
                    </div>
                </div>
                <div className="section-foto left-border">
                    {/* foto */}
                    <img src={storeImage === '' ? customer : storeImage} alt="asdf" width="111" height="111"/>
                    <button 
                    type="button" 
                    className="mt-3" 
                    onClick={handleClickSelectImage}>Select image</button>
                    <input 
                    type="file" 
                    encType="multipart/form-data" 
                    name="image" 
                    ref={hiddenImageInput}
                    onChange={handleChangeImage}/>
                </div> 
            </div>
            <div>
            <div>
                {/* buton */}
                <button className="btn btn-secondary" onClick={onSubmitHandler}>
                {!progressStatus ? 'Save' : 'Processing...'}
                </button>
            </div>
            </div>
            <div className="preview" dangerouslySetInnerHTML={createMarkup(storeDescription)}></div>
        </div>
    )
}

export default MyStore;
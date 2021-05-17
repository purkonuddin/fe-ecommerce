import React from 'react'; 
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import {ProductPrev} from '../../assets/properties';

class SellingProduct extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected,
            selectedTab: this.props.selectedTab
        }
    }

    renderChildren(children) {
        return React.Children.map(children, (child) => { 
            return child
        })
    }

    render() {
        return (
          <>
            { this.renderChildren(this.props.children) }
          </>
        )
    }
}

const Description = ({ children }) => {
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
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                />
        </div>
        <div className="preview" dangerouslySetInnerHTML={createMarkup(storeDescription)}></div>
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
                <input
                    type="text"
                    name="name_of_good"
                    placeholder=""
                    value={namaProduct}
                    onChange={(e)=>setNamaProduct(e.target.value)}
                />
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
            <div className="sc1-input">
                <p> <label>Unit price</label></p>
                <input
                    type="text"
                    name="unit_price"
                    placeholder=""
                    value={unitePrice}
                    onChange={(e)=>setUnitPrice(e.target.value)}
                />
            </div><br/>
            <div className="sc1-input">
                <p> <label>Stock</label></p>
                <input
                    type="text"
                    name="name_of_good"
                    placeholder=""
                    value={stock}
                    onChange={(e)=>setStock(e.target.value)}
                />
            </div>
        </div>
    </div>
)}

const PhotoOfGoods = ({ children }) => {
    const hiddenImagesInput = React.useRef(null);
    const [previewImages, setPreviewImages] = React.useState([]);
    const [selectedFiles, setSelectedFiles] = React.useState(undefined);

    const handleChangeImage = event => {
        let images = [];
        for (let i = 0; i < event.target.files.length; i++) {
            images.push(URL.createObjectURL(event.target.files[i]))
        }
        setPreviewImages(images)
        setSelectedFiles(event.target.files)
    };

    const handleClickSelectImage = event => {
        hiddenImagesInput.current.click();
    };

    React.useEffect(()=>{ 
        console.log(selectedFiles);
    }, [])

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
                            <div style={{
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
                    type="file" 
                    encType="multipart/form-data" 
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

export {
    SellingProduct, 
    Inventory,
    ItemDetails,
    PhotoOfGoods,
    Description, 
}
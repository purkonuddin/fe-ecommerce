import React from 'react'; 
import DatePicker from "react-datepicker";
import {customer} from '../../assets/properties';
// import ReactDOM from 'react-dom';

const MyProfile = ({userData, handleSaveMyAccount, progressStatus}) => { 
  const data = userData;
  // console.log('data: ', data.user_name);
  const [userName, setUserName] = React.useState(data.user_name);
  const [userEmail, setUserEmail] = React.useState(data.user_email);
  const [userPhone, setUserPhone] = React.useState(data.user_phone === 'null' ? '' : data.user_phone || '');
  const [gender, setGender] = React.useState(data.gender || 'laki-laki');
  const [dateOfBirth, setDateOfBirth] = React.useState(data.date_of_birth);
  const [userImage, setUserImage] = React.useState(data.user_image || customer);
  const [imageFile, setImageFile] = React.useState(null);
  const phoneInputRef = React.useRef(null);
  const hiddenImageInput = React.useRef(null);

  React.useEffect(()=>{ 
    const datax = userData;
    setUserName(datax.user_name)
    setUserEmail(datax.user_email)
    datax.user_phone = datax.user_phone === 'null' ? '' : datax.user_phone
    setUserPhone(datax.user_phone || '')
    setGender(datax.gender)
    let setDateToIso= Date.parse(`${datax.date_of_birth}`)
    // console.log('(datax.date_of_birth) ==> ',datax.date_of_birth, setDateToIso) 
    setDateOfBirth(setDateToIso)
    setUserImage(datax.user_image || customer)
    setImageFile(datax.file)
  },[userData]);

  React.useEffect(()=>{ 
      phoneInputRef.current.focus();  
  },[]);

  const onGenderChange = (event) =>{
    setGender(event.target.value);
  } 

  const handleChange = (date, event) => {
    setDateOfBirth(date)
  };

  const handleClickSelectImage = event => {
    hiddenImageInput.current.click();
  };

  const handleChangeImage = event => {
    const fileUploaded = event.target.files[0];
    setUserImage(URL.createObjectURL(fileUploaded))
    setImageFile(fileUploaded)
  };

  const onSubmitHandler = () => {
    let data = {
      user_name: userName,
      user_email: userEmail,
      user_phone: userPhone,
      gender: gender,
      date_of_birth: dateOfBirth.toISOString().slice(0, 10),
      image: imageFile,
      user_image: userImage
    }
    console.log(data);
    
    handleSaveMyAccount(data);

  }
   
    return(
      <div className="wrap-right-content">
        <div >
          <h3>My Profile</h3>
          <p>Manage your profile information</p>
          <hr/>
        </div>
        <div className="rc-center">
          <div className="section-1">
            {/* form */}
            <div className="sc1-title">
              <p>Name</p>
              <p>Email</p>
              <p>Phone number</p>
              <p>Gender</p>
              <p>Date of birth</p>
            </div>
            <div className="sc1-input">
              <p><input 
                  type="text" 
                  placeholder="user name"
                  name="userName"
                  disabled
                  value={userName} 
                  onChange={(e)=>setUserName(e.target.value)}/></p>
              <p><input 
                  type="text" 
                  placeholder="user@email.com"
                  disabled
                  value={userEmail} 
                  onChange={(e)=>setUserEmail(e.target.value)} 
                  /></p>
              <p><input 
                  type="text" 
                  placeholder="085xxxx"
                  value={userPhone} 
                  onChange={(e)=>setUserPhone(e.target.value)}
                  ref={phoneInputRef}
                  /></p>
              <p className="sci-radio">
                <input 
                  type="radio" 
                  name="gender" 
                  value="laki-laki"
                  checked={gender === "laki-laki"}
                  onChange={onGenderChange}
                  /> <span> Laki-laki </span> {'   '} 
                <input 
                  type="radio" 
                  name="gender" 
                  value="perempuan"
                  checked={gender === "perempuan"}
                  onChange={onGenderChange}
                  /> <span> Perempuan </span>
              </p>
              <div className="date">
              {/* <select>
                <option value="1">{'1'}</option>
                {[1,2,3,4,5,6,7,8].map(d => <option key={d}>{d}</option>)}
              </select>  */}
              <DatePicker
                onChange={handleChange}
                selected={dateOfBirth}
                dateFormat="dd/MM/yyyy"
              /> 
              {/* <select>
                <option value="Januari">{'Januari'}</option>
                {['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus', 'Sepetember', 'Oktober', 'Nopember', 'Desember'].map(m => <option key={m}>{m}</option>)}
              </select>
              <select>
                <option value="1990">{'1990'}</option>
                {[1990,1991,1992,1993,1994,1995,1996,1997].map(y => <option key={y}>{y}</option>)}
              </select>  */}
              </div>
            </div>
          </div>
          <div className="section-foto left-border">
            {/* foto */}
            <img src={userImage === '' ? customer : userImage} alt="asdf" width="111" height="111"/>
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
      </div>
    )
  }

export default MyProfile;
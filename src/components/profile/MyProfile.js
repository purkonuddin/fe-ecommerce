import React from 'react'; 
import DatePicker from "react-datepicker";
import {customer} from '../../assets/properties';

const MyProfile = ({handleChange, startDate}) => { 
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
              <p><input type="text"/></p>
              <p><input type="text"/></p>
              <p><input type="text"/></p>
              <p className="sci-radio"><input type="radio" name="gender" value="man"/> <span> Laki-laki </span> {'   '} <input type="radio" name="gender" value="woman"/> <span> Perempuan </span></p>
              <div className="date">
              {/* <select>
                <option value="1">{'1'}</option>
                {[1,2,3,4,5,6,7,8].map(d => <option key={d}>{d}</option>)}
              </select>  */}
              <DatePicker
                onChange={handleChange}
                selected={startDate}
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
            <img src={customer} alt="asdf" width="111" height="111"/>
            <button type="button" className="mt-3">Select image</button>
            <input type="file"/>
          </div> 
        </div>
        <div>
          <div>
            {/* buton */}
            <button className="btn btn-secondary">Save</button>
          </div>
        </div>
      </div>
    )
  }

export default MyProfile;
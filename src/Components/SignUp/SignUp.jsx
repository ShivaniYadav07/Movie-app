import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SignUp.scss'
import { FaArrowRight } from "react-icons/fa";
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {auth} from "../Firebase";

const SignUp = () => {

    const navigate = useNavigate();
const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
})

const [errorMsg, setErrorMsg] = useState("");
const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)

const handleSubmission=()=>{
    if(!values.name || !values.email || !values.pass){
        setErrorMsg("Fill all fields!!")
        return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true)
    createUserWithEmailAndPassword(auth, values.email, values.pass).then(async(res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
            displayName: values.name,
        });
        navigate('/');
    })
    .catch((err) =>{
        setSubmitButtonDisabled(false)
        setErrorMsg(err.message)
    } )
}

  return (
    <>
        
    <div>
    <form  autoComplete="off">
      <h2>Sign Up</h2>
      <div>
        <div >
          <input type="text" name="name"  placeholder="Name"  autoComplete="off" 
          onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value}))}/>
          <img  alt="" />
        </div>
      </div>
      <div>
        <div >
          <input type="text" name="email"  placeholder="E-mail"   autoComplete="off" 
           onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value}))}/>
          <img  alt="" />
        </div>
      </div>
      <div>
        <div >
          <input type="password" name="password" placeholder="Password"  autoComplete="off" 
           onChange={(e) => setValues((prev) => ({ ...prev, pass: e.target.value}))}/>
          <img alt="" />
        </div></div>

        <b className='error'>{errorMsg}</b>
      
        
      <div>
        <div className=''>
          <input type="checkbox" name="IsAccepted"  id="accept"  />
          <label htmlFor="accept">I accept terms of privacy policy</label>
        </div>
      </div>
      <div>
      <button type="button" onClick={(event) => handleSubmission(event)} disabled={submitButtonDisabled}>Create Account</button>

        <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
        
            Already have an account? <Link to="/login">Sign In <FaArrowRight /></Link>
          </span>
        
      </div>
    </form>
  </div>
  </>
  )
}

export default SignUp

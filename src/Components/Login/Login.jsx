import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './Login.scss'
import {signInWithEmailAndPassword} from 'firebase/auth';

import { useNavigate } from 'react-router-dom';
import {auth} from '../Firebase'
const Login = () => {

  const navigate = useNavigate();
  const [values, setValues] = useState({
      email: "",
      pass: "",
  })
  const [errorMsg, setErrorMsg] = useState("");
const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)

const handleSubmission=()=>{
    if(!values.email || !values.pass){
        setErrorMsg("Fill all fields!!")
        return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true)
    signInWithEmailAndPassword(auth, values.email, values.pass).then(async(res) => {
        setSubmitButtonDisabled(false);
       
        navigate('/')
    })
    .catch((err) =>{
        setSubmitButtonDisabled(false)
        setErrorMsg(err.message)
    } )
}
  return (
    <>
     <div className='login'>
      <form   autoComplete="off">
        <h2>Sign In</h2>
        <div>
          <div>
            <input type="text" name="email"  placeholder="E-mail"  autoComplete="off" 
            onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value}))}/>
            <img  alt="" />
          </div>
        </div>
        <div>
          <div>
            <input type="password" name="password"  placeholder="Password"   autoComplete="off" 
            onChange={(e) => setValues((prev) => ({ ...prev, pass: e.target.value}))}/>
            <img  alt="" />
          </div>
        </div>

        <b className='error'>{errorMsg}</b>

        <div>
          <button type="button" onClick={handleSubmission} disabled={submitButtonDisabled}>Sign In</button>
          <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
            Don't have a account? <Link to="/signup">Create account</Link>
          </span>
        </div>
      </form>
      {/* <ToastContainer /> */}
    </div>
    </>
  )
}

export default Login

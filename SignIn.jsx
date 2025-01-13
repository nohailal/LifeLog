import React from 'react'
import "../styles/SignIn.css"

function SignIn() {
  return (
    <div className='forme' >     
      <form className="form-container">
      <h1>sing in</h1>
      <div class="form__group field">
  <input type="text" required="required" placeholder='enter your full name'className='input' />
   <label htmlFor="username" className='form__label' >Full Name</label>
</div>
<div class="form__group field">   
  <input type="Email" required="required" placeholder='enter your email'className='input' />
  <label htmlFor="email" className='form__label'>Email</label>
  </div>
  <div class="form__group field">   
  <input type="password" placeholder='enter your password'className='input' />
  <label htmlFor="password" className='form__label'>Password</label>
  </div>
  <button className='btn-sin'>sign in</button>
</form>
</div>
  )
}

export default SignIn;
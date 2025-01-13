import React from 'react'
import "../styles/Login.css"

function Form() {
  return (
    <div className='form'>
      <form className="forme-container">
        <h1>Login</h1>
        <div class="form__group field">
        <input type="Email" required="required" placeholder='enter your email'className='input' />
         <label htmlFor="email" className='form__label' required >Email</label>
      </div>
      <div class="form__group field">   
        <input type="password" placeholder='enter your password'className='input' required />
        <label htmlFor="password" className='form__label'>Password</label>
        </div>
        <button className='btn-log'>login</button>
      </form>
</div>
 
  )
}
export default Form;
import React from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { NavLink } from 'react-router-dom';

function Login() {

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">

      <MDBRow>

        <MDBCol col='10' md='6'>
        <img
          src="/assets/anh1.jpg"
          className="card-img"
          alt="Background"
          height={550}
        />
        </MDBCol>

        <MDBCol col='4' md='6'>

          <div className="d-flex flex-row align-items-center justify-content-center">

            <p className="lead fw-normal mb-0 me-3 fs-2 fw-bold" >Sign in with</p>

            <MDBBtn floating size='md' tag='a' color='dark' className='me-2'>
            <i class="fa fa-facebook" aria-hidden="true"></i>
            </MDBBtn>

            <MDBBtn floating size='md' tag='a'  color='dark' className='me-2'>
            <i class="fa fa-instagram" aria-hidden="true"></i>
            </MDBBtn>

            <MDBBtn floating size='md' tag='a' color='dark'  className='me-2'>
            <i class="fa fa-twitter" aria-hidden="true"></i>
            </MDBBtn>

          </div>

          <div className="divider  align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0 border-bottom"></p>
          </div>

          <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"/>

          <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!# fs-3">Forgot password?</a>
          </div>

          <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn className="mb-0 px-5" size='lg' color='dark' >Login</MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2 fs-3">Don't have an account?  <NavLink to="/register"  >
                Register
              </NavLink></p>
          </div>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Login;
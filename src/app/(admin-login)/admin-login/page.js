"use client"

import React, {useState } from 'react'
import api from '@/_config/config';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'

const page = () => {
  const [adminLogin, setAdminLogin] = useState({})
  const [loader, setLoader] = useState(false);

  const router = useRouter()

  const handleLoginDetails = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setAdminLogin({ ...adminLogin, [name]: value })
  }

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setLoader(true);
      const res = await api.post(`/auth/admin_login`, adminLogin);
      setLoader(false);

      if (res.data.status === 0) {
        toast.error(res.data.message);
      } else {
        const token = res.data.token;
        localStorage.setItem("token", token);
        router.push("/admin")
      }
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <>
      <div className='d-flex align-items-center justify-content-center flex-column bg-light' style={{ height: "100vh" }}>
        <div className='d-flex justify-content-center mb-2'>
          <img src="/assets/images/logo1.png" alt="" height="45px" />
          <img src="/assets/images/logo2.png" alt="" height="50px" />
        </div>
        <div style={{ width: "500px", backgroundColor: "white", borderRadius: "8px" }} className='px-5 py-4 shadow'>
          <div className='my-3'>
            <label htmlFor="" className='form-label'><h6>Email</h6></label>
            <input type="email" name="email" onChange={handleLoginDetails} className='form-control' placeholder='Enter your email' />
          </div>
          <div className='my-3'>
            <label htmlFor="" className='form-label'><h6>Password</h6></label>
            <input type="password" name="password" onChange={handleLoginDetails} className='form-control'
              placeholder='Enter your password' />
          </div>
          <div className='d-flex justify-content-between'>
            <button onClick={handleLogin} className='btn btn-secondary mt-2' disabled={loader}>{loader ? "Loading..." : "Login"}</button>
            {/* <Link href="/admin-login/change-password" className='mt-4 text-primary' style={{ fontSize: "12px" }}><em>FORGOT PASSWORD?</em></Link> */}
          </div>
        </div>
      </div>


    </>
  )
}

export default page
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import AHeader from '../Components/AHeader'


function Alogin() {
  
  const redirect=useNavigate(); // redirect any routes



  const [formvalue, setFormvalue] = useState({
    email: "",
    password: "",
  });

  const getform = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
    console.log(formvalue);
  }

  const validation = () => {

    var result = true;

    if (formvalue.email == "") {
      toast.error('Email Field is required');
      result = false;
      return false;
    }
    if (formvalue.password == "") {
      toast.error('Password Field is required');
      result = false;
      return false;
    }
    return result;

  }

  const submithandel = async (e) => {
    e.preventDefault(); // stop page reload
    if (validation()) {
      const res = await axios.get(`http://localhost:3000/user?email=${formvalue.email}`);
      console.log(res);
      if (res.data.length > 0) {
        if (res.data[0].password == formvalue.password) {
          toast.success('Login Success');
          redirect('/');
        }
        else {
          toast.error('Password incorrect');
          return false;
        }
      }
      else {
        toast.error('Email does not Exist');
        return false;
      }
    }
  }



  return (
    <div className="container-xxl bg-white p-0">
      <AHeader title={"Login"} />
      {/* Contact Start */}
      <div className="container-xxl py-5">
        <div className="container py-5 px-lg-5">
          <div className="wow fadeInUp" data-wow-delay="0.1s">
            <p className="section-title text-secondary justify-content-center"><span />Login Us<span /></p>
            <h1 className="text-center mb-5">Login For Customer</h1>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="wow fadeInUp" data-wow-delay="0.3s">
                <form action="" method="post" onSubmit={submithandel}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="email" className="form-control" name="email" value={formvalue.email} onChange={getform} id="email" placeholder="Your Email" />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="password" className="form-control" name="password" value={formvalue.password} onChange={getform} id="email" placeholder="Your Email" />
                        <label htmlFor="email">Your Password</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <button className="btn btn-primary w-100 py-3" type="submit">Login</button>
                      <Link to="/Asignup">If you not Registered then Register Here</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact End */}
    </div>

  )
}

export default Alogin
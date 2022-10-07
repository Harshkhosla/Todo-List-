import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
// import { useState } from 'react'
import Logo from './img2.svg'
// import './App.css'

const Signup = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("localhost:3000/api/auth/login", {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.sucess) {

        }
        else {
            alert("nope")
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <>
            <form onClick={handleSubmit}>
                <div className="container-fluid">


                    <div className="row">
                        <div className="col-md-6 col-lg-6 col-xl-6 borber border primary bg-img" style={{ backgroundImage: `url(${Logo})` }}>

                        </div>

                        <div className="col-md-6 col-lg-6 col-xl-6 d-flex align-items-center justify-content-center ">


                            <form>

                                <div className="form-outline mb-4">

                                    <label className="form-label" for="form1Example13">Sign In</label>
                                </div>
                                <div className="form-outline mb-4">

                                    <label className="form-label" for="form1Example13">Sign in using your infos</label>{{}}
                                </div>

                                <div className="form-outline mb-4">
                                    <div class="row align-items-start">
                                        <div class="col text-start">
                                            <div className='d-flex'>
                                                <div className='mx-2'>
                                                    <label className="form-label text-end" for="form1Example23">Your Email </label>
                                                    <input type="email" id="email" value={credentials.email} onChange={onChange} className="form-control form-control-lg " name='email' />
                                                </div>
                                                <div>
                                                    <label className="form-label text-end" for="form1Example23">Password</label>

                                                    <input type="password" id="password" value={credentials.password} onChange={onChange} className="form-control form-control-lg " name="password" ></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link to='/home' type="submit" className="btn btn-outline-success ">Sign in</Link>
                                <div className="d-flex justify-content-around align-items-center mb-4">


                                    <Link to='/sighn' href="#!"> Go to Join us</Link>

                                </div>






                            </form>
                        </div>
                    </div>

                </div>
            </form>


        </>
    )

}

export default Signup

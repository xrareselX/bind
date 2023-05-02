import { useState } from "react";

function SignUp(props){
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("User");
    const [secretKey, setSecretKey] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        if(userType=="Admin" && secretKey!="Rares"){
            alert("Invalid Admin Key");
        }else{
            // console.log(fname);
            // console.log(lname);
            // console.log(email);
            // console.log(password);
            fetch("http://localhost:5000/register", {
                method: "POST",
                crossDomain: true,
                headers:{
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    fname,
                    lname,
                    email,
                    password,
                    userType
                }),
            }).then((res)=> res.json())
            .then((data)=>{
                console.log(data, "userRegister");
            })
        }
    }
    return(
        <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div className="container mt-4">
            <h5>Register As</h5>  
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="userType" value="User" defaultChecked onChange={(e)=> setUserType(e.target.value)} />  
                <label className="form-check-label">User</label>
            </div>
            <div className="form-check form-check-inline">
                <input  className="form-check-input" type="radio" name="userType" value="Admin" onChange={(e)=> setUserType(e.target.value)} />
                <label className="form-check-label">Admin</label>
            </div>
        </div>
        {userType=="Admin" &&(

            <div className="mb-3">
          <label>Secret Key</label>
          <input
            type="text"
            className="form-control"
            placeholder="Secret key"
            onChange={(e) => setSecretKey(e.target.value)}
            />
        </div>
            )}
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(e) => setFname(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Last name</label>
          <input type="text" className="form-control" placeholder="Last name" 
            onChange={(e) => setLname(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    );
}
export default SignUp;
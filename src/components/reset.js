import { useState } from "react";

function Reset(props){
    const [email, setEmail] = useState("");
    const  handleSubmit = (e)=>{
        e.preventDefault();
        console.log(email);
        fetch("http://localhost:5000/forgot-password", {
            method: "POST",
            crossDomain: true,
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                email
            }),
        }).then((res)=> res.json())
        .then((data)=>{
            console.log(data, "userRegister");
            alert(data.status);
        });
    }
    return(
        <form onSubmit={handleSubmit}>
        <h3>Forgotten Password</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
           <a href="/sign-up">Sign up</a>
        </p>
      </form>
    );
}
export default Reset;
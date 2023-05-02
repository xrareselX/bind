import { useEffect, useState } from "react";
import UserHome from "./userHome";
import AdminHome from "./adminHome";

function UserDetails(props){
    const [userDetails, setUserDetails] = useState({});
    // const [fname, setFname] = useState("");
    // const [lname, setLname] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() =>{
        fetch("http://localhost:5000/userData", {
            method: "POST",
            crossDomain: true,
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
            }),
        })
        .then((res)=> res.json())
        .then((data)=>{
            console.log(data, "userData");
            if(data.data.userType=="Admin"){
                setIsAdmin(true);
            }
            setUserDetails(userDetails => ({
                // ...userDetails,
                ...data.data
            }));
            if (data.data == "token expired") {
                alert("Token expired login again");
                logout();
            }
        })
    }, [])

    const logout = () =>{
        window.localStorage.clear();
        window.location.href = "./sign-in";
    }
    return(
        isAdmin ? <AdminHome userDetails={userDetails}/> : <UserHome userDetails={userDetails}/>
    );
}
export default UserDetails;
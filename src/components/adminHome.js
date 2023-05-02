import { useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function AdminHome(props){
    
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        getAllUsers();
    }, []);

    const getAllUsers = () => {
        fetch("http://localhost:5000/getAllUsers", {
            method: "GET",
        })
        .then((res)=> res.json())
        .then((data)=>{
            // console.log("users", data);
            setUsers(data.data);
        })
    }
    const logout = () =>{
        window.localStorage.clear();
        window.location.href = "./sign-in";
    }

    const deleteUser = (id, fname, type) =>{
        if(type == "Admin"){
            alert("Cannot delete an admin");
        }else{
            if(window.confirm(`Are you sure you want to delete ${fname}?`)){
                fetch("http://localhost:5000/deleteUser", {
                method: "POST",
                crossDomain: true,
                headers:{
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    userId: id
                }),
            })
            .then((res)=> res.json())
            .then((data)=>{
                alert(data.data);
                getAllUsers();
            });
            } else{
                console.log("deleted aborded")
            }
        }
    }
    return(
        <div className="container">
            <h4>Welcome Admin</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>User Type</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user=>{
                        return(
                            <tr key={user._id}>
                                <th><Link to={`/edit-user/${user._id}`}>{user.fname}</Link></th>
                                <th>{user.email}</th>
                                <th>{user.userType}</th>
                                <th><FontAwesomeIcon icon={faTrash} onClick={()=>deleteUser(user._id, user.fname, user.userType)}/></th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            Name<h1>{props.userDetails.fname}</h1>
            Email<h1>{props.userDetails.email}</h1><br/>
            <button className="btn btn-primary" onClick={logout}>Log Out</button>
        </div>
    );
}
export default AdminHome;
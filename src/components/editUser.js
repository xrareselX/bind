import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function EditUser(props){

    const [user, setUser] = useState({});
    const [dnsName, setDnsName] = useState("");
    const [allDns, setAllDns] = useState([]);
    const params = useParams();
    useEffect(() =>{
        console.log("params:", params);
        fetch("http://localhost:5000/getUser", {
            method: "POST",
            crossDomain: true,
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(params),
            // body: JSON.stringify(params.id),
        })
        .then((res)=> res.json())
        .then((data)=>{
            // console.log(data.data, "userData");
            setUser(user => ({
                ...user,
                ...data.data
            }));
            console.log("user that is edited", user);
        });
        fetch("http://localhost:5000/getAllDnsByUser", {
            method: "POST",
            crossDomain: true,
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            // body: JSON.stringify(user),
            // body: JSON.stringify(user._id),
            // body: JSON.stringify(params.id),
            body: JSON.stringify({
                id: params.id
            }),
        })
        .then((res)=> res.json())
        .then((data)=>{
            if (data.status=="ok") {
                // alert("Got all dns of this user");
                console.log("data recieved to be all dns:", data.data)
                setAllDns(data.data);
            }
            console.log(data, "data returned");
            console.log("user that is edited 2", user);
        });
    }, [])
    
    const handleFnameChange = (e) => {
        const userCopy = user;
        user.fname = e.target.value;
        setUser(userCopy);
    }

    const handleLnameChange = (e) => {
        const userCopy = user;
        user.lname = e.target.value;
        setUser(userCopy);
    }
    
    const handleEmailChange = (e) => {
        const userCopy = user;
        user.email = e.target.value;
        setUser(userCopy);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:5000/updateUser", {
            method: "POST",
            crossDomain: true,
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(user),
        })
        .then((res)=> res.json())
        .then((data)=>{
            if (data.status=="ok") {
                alert("User credentials changed");
            }
            console.log(data, "userData modified");
        });
    };
    const handleDnsNameChange = (e) => {
        setDnsName(e.target.value);
    }
    const handleDnsSubmit = (event) => {
        console.log(dnsName);
        event.preventDefault();
        fetch("http://localhost:5000/addDns", {
            method: "POST",
            crossDomain: true,
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                userId: user._id,
                dnsName: dnsName
                }),
        })
        .then((res)=> res.json())
        .then((data)=>{
            if (data.status=="ok") {
                // alert("New DNS added successfully!");
                window.location.reload(true);
            }
            console.log(data, "data from dns");
        })
    }
    const handleReset = () => {
        window.location.reload(true);
    };
    const deleteDns = (id) =>{
        // if(type == "Admin"){
        //     alert("Cannot delete an admin");
        // }else{
            if(window.confirm(`Are you sure you want to delete?`)){
                fetch("http://localhost:5000/deleteDns", {
                method: "POST",
                crossDomain: true,
                headers:{
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    dnsId: id
                }),
            })
            .then((res)=> res.json())
            .then((data)=>{
                console.log(data.data);
                // alert("deleted that dns");
                window.location.reload(true);
                // getAllUsers();
            });
            } else{
                alert("delete dns aborted");
                console.log("delete dns aborded")
            }
        // }
    }
    return(
<div>
    <form onSubmit={handleSubmit} onReset={handleReset}>
        <label>
            First Name:
            <input
            type="text"
            name="fname"
            defaultValue={user.fname}
            onChange={handleFnameChange}
            />
        </label>
        <br />
        <label>
            Last Name:
            <input
                type="text"
                name="lname"
                defaultValue={user.lname}
                onChange={handleLnameChange}
            />
        </label>
        <br />
        <label>
            Email:
            <input
                type="email"
                name="email"
                defaultValue={user.email}
                onChange={handleEmailChange}
            />
        </label>
        <br />
        <button type="submit">Submit</button>
        <button type="reset" >Reset</button>
    </form>
    <div className="container">
        <div className="row">
            <h4>Add new DNS to this user</h4>
            <form onSubmit={handleDnsSubmit} onReset={handleReset}>
                <label>
                    DNS Name:
                    <input
                    type="text"
                    name="dnsName"
                    onChange={handleDnsNameChange}
                    />
                </label>
            <br />
            <button type="submit">Submit</button>
            <button type="reset" >Reset</button>
        </form>
        </div>
    </div>
    <div className="container">
        <h4>This user has the following dns:</h4>
        <table className="table">
            <thead>
                <tr className="text-center">
                    <th>DNS name</th>
                    <th>Delete</th>
                </tr>
            </thead>
                <tbody>
                    {allDns.map(dns=>{
                        return(
                            <tr className="text-center" key={dns._id}>
                                <th><Link to={`/edit-dns/${dns._id}`}>{dns.dnsName}</Link></th>
                                <th><FontAwesomeIcon icon={faTrash} onClick={()=>deleteDns(dns._id)}/></th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
 
    );
}
export default EditUser;
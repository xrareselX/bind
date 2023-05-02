import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserHome(props){
    // const [user, setUser] = useState({...props.userDetails});
    const [user, setUser] = useState({});
    const [allDns, setAllDns] = useState([]);
    const [userId, setUserId] = useState(() => props.userDetails._id);
    const [dnsName, setDnsName] = useState("");

    useEffect(() => {
        setUser(() => {
            return props.userDetails
        });
        // console.log("this is the id inside the useEffect:", userId);
        // console.log("this is the id inside the useEffect using the props:", props.userDetails._id);
        // console.log("this is the id inside the useEffect using the props:", userId);
        fetch("http://localhost:5000/getAllDnsByUser", {
            method: "POST",
            crossDomain: true,
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            // body: JSON.stringify(user),
            // body: JSON.stringify(props.userDetails),
            // body: JSON.stringify(userId),
            // body: JSON.stringify(props.userDetails._id),
            body: JSON.stringify({
                id: props.userDetails._id
            }),
            // aici sus e problema ca body accepta .id nu altceva fa le pe ambele sa trimita id ul si la backend sa ia body ca id
            // body: props.userDetails,
        })
        .then((res)=> res.json())
        .then((data)=>{
            if (data.status=="ok") {
                // alert("Got all dns of this user");
                console.log("data recieved to be all dns:", data.data)
                setAllDns(data.data);
            }
            console.log(data, "data returned");
        });
    }, [props.userDetails._id]);// u need to add the prop here. this makes the hook run whenever thiis prop changes, e.g when its value is first populated

    const logout = () => {
        window.localStorage.clear();
        window.location.href = "./sign-in";
    }

    const deleteDns = (id) => {
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
            // body: JSON.stringify({
            //     ...props.userDetails
            // }),
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
                userId: props.userDetails._id,
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
    const handleDnsNameChange = (e) => {
        setDnsName(e.target.value);
    }
    const handleFnameChange = (e) => {
        const userCopy = user;
        user.fname = e.target.value;
        setUser(userCopy);
    }
    const handleReset = () => {
        window.location.reload(true);
    };

    const handleLnameChange = (e) => {
        const userCopy = user;
        user.lname = e.target.value;
        setUser(userCopy);
    };
    const handleEmailChange = (e) => {
        const userCopy = user;
        user.email = e.target.value;
        setUser(userCopy);
    };
    return(
        // eventual fa cumva ca atunci cand asta vrea sa si editeze user credentials sa fie trimis la edit user ca si admin ul dar sa nu aiba acces decat la ale lui
        <div>
            <form
             onSubmit={handleSubmit} onReset={handleReset}
             >
        <label>
            First Name:
            <input
            type="text"
            name="fname"
            defaultValue={props.userDetails.fname}
            onChange={handleFnameChange}
            />
        </label>
        <br />
        <label>
            Last Name:
            <input
                type="text"
                name="lname"
                defaultValue={props.userDetails.lname}
                onChange={handleLnameChange}
            />
        </label>
        <br />
        <label>
            Email:
            <input
                type="email"
                name="email"
                defaultValue={props.userDetails.email}
                onChange={handleEmailChange}
            />
        </label>
        <br />
        <button type="submit">Submit</button>
        <button type="reset" >Reset</button>
    </form>
    <div className="row">
            <h4>Add new DNS to this user</h4>
            <form 
            onSubmit={handleDnsSubmit} onReset={handleReset}
            >
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
            {/* fa sa poata modifica name ul si email ul si sa poata sa si stearga contul si sa poata sa adauge el un dns */}
    <div className="container">
        <h4>You have the following dns:</h4>
        <table className="table">
            <thead>
                <tr>
                    <th>DNS name</th>
                    <th>Delete</th>
                </tr>
            </thead>
                <tbody>
                    {allDns.map(dns=>{
                        return(
                            <tr key={dns._id}>
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
export default UserHome;
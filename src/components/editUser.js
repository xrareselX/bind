import { faBriefcase, faChartSimple, faEnvelope, faFile, faGlobe, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; 
import CreateZoneModal from "./createZoneModal";

function EditUser(props){

    const [user, setUser] = useState({});
    const [dnsName, setDnsName] = useState("");
    const [allDns, setAllDns] = useState([]);
    const params = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModalHandle = () => {
        setIsModalOpen(false);
    }
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
    const deleteDns = (id, name) =>{
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
                    dnsId: id,
                    dnsName: name
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
    <div className="container mb-5">
        <div className="row">
        <div className="col-12 col-md-6">
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
        </div>
        <div className="col-12 col-md-6">
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
    </div>
    <div className="container-fluid">
        <div className="row">
            <div className="col-12">
                <div id=" dashboard-zones">
                    <div className="table-zones mb-5">
                        <table className="dashboard-table dashboard a-l text-left">
                            <thead>
                                <tr className="heading-first-row"> 
                                    <th className="v-m table-heading" colSpan={3}>
                                        <div class="qsw dns-hosting-heading f-l mr-5">
                                            <div class="heading zones">
                                                <span>DNS Hosting</span>
                                            </div>
                                        </div>
                                        {/* aici mai era un div cu search */}
                                    </th>
                                    <th className="removeColspan off-870 align-middle menu-column" colSpan={5} style={{minWidth: "25%", position:"relative"}}>
                                        {/* aici la fel cv */}
                                        {/* search */}

                                        <div className="float-start quickSearchWraper">
                                        <div className="flat2-input-style">
                                        {/* <form className="d-flex" role="search"> */}
                                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                            {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
                                        {/* </form> */}
                                        </div>
                                        </div>
                                    </th>
                                </tr>
                                <tr className="zones-sub-header sub-header pt-0">
                                    <th className="dynSecColspan" colspan="5">
                                        <ul id="dnsLimits">
                                            <li>
                                                <a href="/subscription/" class="icon icon-free zones-subheader-tooltip">
                                                    <FontAwesomeIcon icon={faBriefcase} className="table-icon"/>
                                                    Free
                                                </a>
                                            </li>
                                            <li>
                                            <FontAwesomeIcon icon={faGlobe} className="table-icon"/>
                                                <span className="icon icon-dns-zones zones-subheader-tooltip cursor-default " aria-label="DNS zones 1 / 1">
                                                    <span id="userDataZones">1</span> / <span id="userDataZonesAvailable">1</span>
                                                </span>
                                            </li>
                                            <li>
                                            <FontAwesomeIcon icon={faFile} className="table-icon"/>
                                                <span className="icon icon-templates zones-subheader-tooltip cursor-default " aria-label="DNS Records 12 / 50">
                                                    <span id="userDataRecords">12</span> / <span id="userDataRecordsAvailable">50</span>
                                                </span>
                                            </li>
                                            <li>
                                                <a href="/stats-by-account/">
                                                <FontAwesomeIcon icon={faChartSimple} className="table-icon"/>
                                                    <span className="icon icon-statistics zones-subheader-tooltip " aria-label="Queries 0 / 500K">
                                                        <span id="userDataQueries">0</span> / <span id="userDataQueriesAvailable">500K</span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                            <FontAwesomeIcon icon={faEnvelope} className="table-icon"/>
                                                <span className="icon icon-mail-forwards zones-subheader-tooltip cursor-default " aria-label="Mail forwards 0 / 1">
                                                    <span id="userDataMailForwards">0</span> / <span id="userDataMailForwardsAvailable">1</span>
                                                </span>
                                            </li>
					                </ul>
				                </th>
			                </tr>
                            <tr>
                                <th className="table-heading" colspan="2">
                                    <div className="dns-hosting-heading heading zones float-start align-items-bottom">
                                        <a href="javascript: void(0);" onclick="insideCloudPage('dashboard-zones', 'main', '&amp;show=zones');" className="showZonesTitle">Zones</a>
                                    </div>
                                    <div className="zones-table-buttons">
                                        <CreateZoneModal isOpen={isModalOpen} onClose={closeModalHandle}/>
                                            {/* sdafgsdfsa */}
                                            {/* </createZoneModal> */}
                                        <button className="round-btn xs-btn color-btn" onClick={()=> setIsModalOpen(true)}>create zone</button>
                                        <button className="round-btn xs-btn x-bright3-btn available-nameservers-button" onclick="showPopup('main', '&amp;show=availableNameServers')">available name servers</button>
                                        <button className="round-btn xs-btn x-bright3-btn available-nameservers-button" onclick="location.href='/subscription/#zoneBackups';">backups</button>
                                    </div>
                                </th>
								<th class="a-r created-on-column off-1020">
                                    <a href="javascript: void(0);" onclick="insideCloudPage('dashboard-zones', 'main', '&amp;show=zones&amp;orderBy=createdOn');" class="showZonesTitle">Created on</a>
                                    <span class=""></span>
                                </th>
                                <th class="a-r off-1020">
                                    <a href="javascript: void(0);" onclick="insideCloudPage('dashboard-zones', 'main', '&amp;show=zones&amp;orderBy=lastUpdate');" class="showZonesTitle">Last update</a>
                                    <span class=""></span>
                                </th>
                                <th class="a-r"></th>   
                            </tr>
                            </thead>
                            <tbody>
                            {allDns.map(dns=>{
                        return(
                            <tr className="" key={dns._id}>
                                <th><Link to={`/edit-dns/${dns._id}`}>{dns.dnsName}</Link></th>
                                <th><Link to={`/edit-dns/${dns._id}`}>{dns.dnsName}</Link></th>
                                <th><Link to={`/edit-dns/${dns._id}`}>{dns.dnsName}</Link></th>
                                <th><FontAwesomeIcon icon={faTrash} onClick={()=>deleteDns(dns._id, dns.dnsName)}/></th>
                            </tr>
                        )
                    })} 
                    {!allDns && (
                        <tr>
                            <td className="italic dynColspan" colSpan={5}>
                            Currently you don't have any registered DNS zones.
                            </td>
                        </tr>
                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="container">
        {/* <h4>This user has the following dns:</h4> */}
        
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
                                <th><FontAwesomeIcon icon={faTrash} onClick={()=>deleteDns(dns._id, dns.dnsName)}/></th>
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
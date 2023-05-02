import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditDns(props){
    const [dns, setDns] = useState({});
    const params = useParams();

    useEffect(() => {
        fetch("http://localhost:5000/getDns", {
            method: "POST",
            crossDomain: true,
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(params),
        })
        .then((res)=> res.json())
        .then((data)=>{
            // console.log(data.data, "userData");
            setDns(dns => ({
                ...dns,
                ...data.data
            }));
            console.log("the current dns is:", dns);
        });
    }, []);
     const handleDnsNameChange = (e) => {
        const dnsCopy = dns;
        dnsCopy.dnsName = e.target.value;
        setDns(dnsCopy);
    }
    //submit si reset
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/updateDns", {
            method: "POST",
            crossDomain: true,
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(dns),
        })
        .then((res)=> res.json())
        .then((data)=>{
            if (data.status=="ok") {
                alert("Dns Name changed");
            }
            console.log(data, "userData modified");
        });
    }
    const handleReset = () => {
        window.location.reload(true);
    };
    return(
         <form onSubmit={handleSubmit} onReset={handleReset}>
        <label>
            Dns Name:
            <input
            type="text"
            name="dnsName"
            defaultValue={dns.dnsName}
            onChange={handleDnsNameChange}
            />
        </label>
        <br />
        <button type="submit">Submit</button>
        <button type="reset" >Reset</button>
    </form>
    );
}
export default EditDns;
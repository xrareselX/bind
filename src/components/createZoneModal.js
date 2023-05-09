import { useState } from "react";
import NewZoneModal from "./newZoneModal";

function CreateZoneModal(props) {

    const [zoneId, setZoneId] = useState(0);
    const handleOverlayClick = () => {
        setZoneId(0);
        props.onClose();
      };
    const handleDialogClick = (event) => {//The handleDialogClick function is called when the user clicks inside the modal, and it prevents the click from bubbling up to the overlay and closing the modal.
        event.stopPropagation();
      };
    // const closeButtonHandle = () => {
    //     setZoneId(0);
    //     props.onClose();
    //   };
    const modalComponentPressed = (e) => {
        e.preventDefault();
        setZoneId(e.currentTarget.id);
        console.log(e.target, "dddd");
        console.log(e.currentTarget, "xxxx");
        console.log(e.currentTarget.id, "xxxxid");
    };
    return(
        <div className={`modal ${props.isOpen ? 'is-open' : ''}`} onClick={handleOverlayClick}>
        <div className="modal-dialog" onClick={handleDialogClick}>
          <div className="modal-content">
            <div className="modal-header">
            </div>
              <button type="button" className="btn-close" onClick={handleOverlayClick}></button>
            <div className="modal-body d-flex flex-wrap justify-content-around align-items-center">
                {zoneId == 0 ? 
                <>
                <button id="1" className=" flex-item newZoneBox card-gradient" onClick={modalComponentPressed}>
                    <b>Master zone</b>
                    <span>Primary DNS - Records can be managed only from out interface</span>
                </button>
                <button id="2" className=" flex-item  newZoneBox card-gradient" onClick={modalComponentPressed}>
                    <b>Secondary zone</b>
                    <span>Secondary DNS - Records can be managed only at your master server.</span>
                </button>
                <button id="3" className=" flex-item  newZoneBox card-gradient" onClick={modalComponentPressed}>
                    <b>Master reverse zone</b>
                    <span>Master IPv4 or IPv6 reverse zone.</span>
                </button>
                <button id="4" className=" flex-item  newZoneBox card-gradient" onClick={modalComponentPressed}>
                    <b>Secondary reverse zone</b>
                    <span>Secondary IPv4 or IPv6 reverse zone.</span>
                </button>
                <button id="5" className=" flex-item  newZoneBox card-gradient" onClick={modalComponentPressed}>
                    <b>Primary ENUM zone</b>
                    <span>Primary zone for E.164 numbers</span>
                </button>
                <button id="6" className=" flex-item  newZoneBox card-gradient" onClick={modalComponentPressed}>
                    <b>Secondary ENUM zone</b>
                    <span>Secondary zone for E.164 numbers</span>
                </button>
                <button id="7" className=" flex-item  newZoneBox card-gradient" onClick={modalComponentPressed}>
                    <b>Parked zone zone</b>
                    <span>Simple web page with contact form, title and description</span>
                </button>
                <button id="8" className=" flex-item  newZoneBox card-gradient" onClick={modalComponentPressed}>
                    <b>Free zone</b>
                    <span>DNS zone with free domain name. Records can be managed only from our interface.</span>
                </button>
                </>
                 : <>
                 <NewZoneModal/>
                 </>}
            </div>
          </div>
        </div>
      </div>
    );
}
export default CreateZoneModal;
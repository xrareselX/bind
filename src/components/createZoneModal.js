
function createZoneModal(props) {
    const handleOverlayClick = () => {
        props.onClose();
      };
    const handleDialogClick = (event) => {//The handleDialogClick function is called when the user clicks inside the modal, and it prevents the click from bubbling up to the overlay and closing the modal.
        event.stopPropagation();
      };
    return(
        <div className={`modal ${props.isOpen ? 'is-open' : ''}`} onClick={handleOverlayClick}>
        <div className="modal-dialog" onClick={handleDialogClick}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal Title</h5>
              <button type="button" className="btn-close" onClick={props.onClose}></button>
            </div>
            <div className="modal-body">
                {/* {props.children} */}
                dfasd
                </div>
          </div>
        </div>
      </div>
    );
}
export default createZoneModal;
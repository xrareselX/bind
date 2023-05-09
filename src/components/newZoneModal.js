//this part goes inside the create zone Modal
function NewZoneModal(props) {
    return(
    <>
    <h2 className="flex-fill new-zone-h2">New domain zone</h2>
    <form className="master-zone">
    <div class="row-content-mb10">
        <div class="row-content-mb10">
            <label>
                <input class="minus-999-em" type="radio" name="newZoneOptions" value="1" onclick="showNewZoneOptions(1)" checked="checked" />
                <span class="radiobutton"></span>
                Create with NS records
            </label>
        </div>
        <div id="zoneOptions1" class="ml-20 zoneOptions">
            <div id="masterDNSServers" class="master-dns-servers row-content-mb10">
                <label class="ns-server f-l"><input class="f-l" type="checkbox" value="314" checked="checked" name="masterDNSServer"/><span class="checkbox"></span><span>ns41.cloudns.net</span></label>
                <label class="ns-server f-l"><input class="f-l" type="checkbox" value="514" checked="checked" name="masterDNSServer"/><span class="checkbox"></span><span>ns42.cloudns.net</span></label>
                <label class="ns-server f-l"><input class="f-l" type="checkbox" value="515" checked="checked" name="masterDNSServer"/><span class="checkbox"></span><span>ns43.cloudns.net</span></label>
                <label class="ns-server f-l"><input class="f-l" type="checkbox" value="516" checked="checked" name="masterDNSServer"/><span class="checkbox"></span><span>ns44.cloudns.net</span></label>
                <br class="clear"/>
			</div>
			<div class="row-content-mb10">
				<label><input type="checkbox" id="checkall" name="checkall" onclick="checkUncheckAll('checkall', 'masterDNSServers');" checked="checked"/><span class="checkbox"></span>Check / uncheck all </label>
			</div>
		</div>
    </div>
    <hr/>
    <div class="row-content-mb10">
			<label style={{color: "#ccc"}}><input class="minus-999-em" type="radio" name="newZoneOptions" value="2" disabled="disabled"/><span class="radiobutton"></span> Copy records from existing zone</label>
    </div>
    <hr/>
    <div class="row-content-mb10">
			<label><input class="minus-999-em" type="radio" name="newZoneOptions" value="3" onclick="showNewZoneOptions(3)"/><span class="radiobutton"></span>Create empty without records</label>
    </div>
    <hr/>
    <ul>
        <li>
            <label class="label-auto" for="masterDomain">Domain name: </label>
            <input onkeyup="dashboard_checkNewZoneName('masterDomain', 'It is better to create the zone without &quot;www.&quot; and to create the www subdomain as a record in the zone. ');" type="text" autocapitalize="off" spellcheck="false" autocorrect="off" id="masterDomain" class="strech" value=""/>
        </li>
    </ul>
    <button type="submit" id="masterDomain_button" class="round-btn color-btn f-r">create</button>
    <button type="button" onclick="removeTipsy(); dashboard_newZonePopup('');" class="round-btn bright-btn f-l">cancel</button>
    <div class="notification info">
        <div>You can manage the records from ClouDNS web interface.</div>
    </div>
    </form>    
    </>
    );
}
export default NewZoneModal;
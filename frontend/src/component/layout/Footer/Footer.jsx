import React from "react";
//img
//img
import "./Footer.css"

function Footer(){
    return(
        <footer id="footer">
            <div className="leftFooter">
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Android and ios Mobile phone</p>
            {/* img */}
            </div>

            <div className="midFooter">
            <h1>S.mart</h1>
            <p>look fabulous without breaking the bank!</p>
            <p>Copyrights @2024</p>
            </div>

            <div className="rightFooter">
                <h4>Follow Us</h4>
                <p>insta handler</p>
            </div>
        </footer>
    );
};

export default Footer;
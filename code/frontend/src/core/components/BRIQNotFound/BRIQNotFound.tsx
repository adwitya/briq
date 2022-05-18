import React from "react";
import { useNavigate } from "react-router-dom";
import './BRIQNotFound.css';

const BRIQNotFound = () => {
    const history = useNavigate();
    const handleRedirectClick = (evt: any) => {
        history("/");
    }
    return <>
        <div className="not-found-container">
            <h1>404</h1>
            <h3>OOPS! NOTHING WAS FOUND</h3>
            <div className="font-20">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </div>
            <div className="link-text font-20" style={{ display: 'inline-block' }} onClick={handleRedirectClick}>Return to Dashboard.</div>
        </div>
    </>
}

export default BRIQNotFound
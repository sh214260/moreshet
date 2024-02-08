import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const SocialLinks = ({ href, href1 }) => {
    return (
        <div className="social-links">
            <a href={href} rel="noopener noreferrer" target="_blank">
                <img className="img" alt="Linkedin" src="linkedin.svg" />
            </a>
            <a className="github" href="https://github.com/AnimaApp" rel="noopener noreferrer" target="_blank">
                <img className="vector" alt="Vector" src="vector.svg" />
            </a>
            <a href={href1} rel="noopener noreferrer" target="_blank">
                <img className="img" alt="Twitter" src="twitter.svg" />
            </a>
        </div>
    );
};

SocialLinks.propTypes = {
    href: PropTypes.string,
    href1: PropTypes.string,
};

import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedIn from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LinkIcon from "@mui/icons-material/Link";
function footer() {
    return (
        <div className="footer-container">
            <div className="footer">
                Built by Karthik
                <a href="https://karthik-portfolio.onrender.com/">
                    <LinkIcon style={{ verticalAlign: 'bottom', fontSize: '1.2rem', marginLeft: '0.3rem', position: 'relative', top: '-1px' }} />
                </a>
            </div>
            <div className="footer1">
                <a
                    href="https://www.instagram.com/karthik.ak._/"
                    target="_blank"
                    title="Instagram"
                >
                    <InstagramIcon />
                </a>
                <a
                    href="https://www.linkedin.com/in/karthik-ambaragonda/"
                    target="_blank"
                    title="linkedin"
                >
                    <LinkedIn />
                </a>
                <a
                    href="https://github.com/karthikambaragonda"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="github"
                >
                    <GitHubIcon />
                </a>
                <a
                    href="mailto:ambaragondakarthik@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="email"
                >
                    <EmailIcon />
                </a>
            </div>
        </div>
    );
}
export default footer;

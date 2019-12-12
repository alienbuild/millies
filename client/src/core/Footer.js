import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <Fragment>
        <footer id="footer-primary">
            <div className="container">
                <div className="footer-grid">
                    <section>
                        <h4>Company Info</h4>
                        <ul className="contact-info">
                            <li>
                                <address>
                                    H-Tune, Unit 9
                                    <br />
                                    Adam Centre, Telford Estate
                                    <br />
                                    Kettering, UK
                                    <br />
                                    NN16 8PX
                                </address>
                            </li>
                            <li>
                                <time>
                                    Monday to Friday
                                    <br />
                                    9:00am - 5:00pm GMT
                                </time>
                            </li>
                        </ul>
                    </section>
                    <section>
                        <h4>Useful Links</h4>
                        <ul className="useful-links">
                            <li><Link to="/">My Account</Link></li>
                            <li><Link to="/">Orders History</Link></li>
                            <li><Link to="/">Customer Service</Link></li>
                            <li><Link to="/">Dispatch &amp; Delivery</Link></li>
                            <li><Link to="/">Guarantees &amp; Returns</Link></li>
                            <li><Link to="/">Price-Matching Policy</Link></li>
                            <li><Link to="/">Company Info</Link></li>
                            <li><Link to="/">Terms of Service</Link></li>
                        </ul>
                    </section>
                    <section>
                        <h4>Trusted & Recommended</h4>
                        <p>We work hard to do the best by our customers, follow the link below to see our latest feedback. We don't censor a thing.</p>
                    </section>
                    <section>
                        <h4>DOMO.</h4>
                    </section>
                </div>
            </div>
        </footer>
        <footer id="footer-secondary">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Link to="/"><img src="https://h-tune.co.uk/media/h-tune/logo.svg" alt="H-Tune Logo" width="90" /></Link>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </footer>
    </Fragment>
);

export default Footer;
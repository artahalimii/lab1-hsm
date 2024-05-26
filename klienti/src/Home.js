import React, { Component, Fragment, useState, useEffect } from 'react';
import './Home.css';
import FooterPage from './FooterPage';
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import Navbar from './/components/Navbar';
import Banner from './/components/Banner';

import Button from 'react-bootstrap/Button';
const Home = () => {

    const [fullImgSrc, setFullImgSrc] = useState(null);

    function openFullImg(src) {
        setFullImgSrc(src);
    }

    function closeFullImg() {
        setFullImgSrc(null);
    }


    return (
        <Fragment className='bodyHome' ><Navbar />
            <Banner />
            <div className='home-container'>
                <video src="videoHome.mp4" autoPlay loop muted />
                <h1><span>Hospital-SM</span></h1>
                <p><strong>Welcome to our Hospital, where your health is our priority !</strong></p>

            </div>
            <div className='body-card'>
                <div className='container-home'>
                    <div className='card-home'>
                        <div className='imgbox'>
                            <img src="https://i.pinimg.com/736x/48/d8/d3/48d8d3f49ac249c290d8d6768f883a5b.jpg" />
                        </div>
                        <div className='content-home'>
                            <h2>The best staff</h2>
                            <p>Our team of doctors includes leading specialists in various fields of medicine, each bringing a wealth of knowledge and experience. They are committed to continuous learning and staying at the forefront of medical advancements to offer cutting-edge treatments and personalized care plans.</p>
                        </div>
                    </div>
                    <div className='card-home'>
                        <div className='imgbox'>
                            <img src="https://i.pinimg.com/originals/45/ea/92/45ea92b520b3897259b7689caf36eae3.jpg" />
                        </div>
                        <div className='content-home'>
                            <h2>Resonance</h2>
                            <p>Full Body Health Checkup Using Quantum Resonance Magnetic Body Health Analyzer Machine to analyze your entire body</p>
                        </div>
                    </div>
                    <div className='card-home'>
                        <div className='imgbox'>
                            <img src="https://images.squarespace-cdn.com/content/v1/5aa96c579772aea9adaa2ef7/295bd613-d748-4a18-9b91-c04a725f7f06/MedicalTechnologyExamples_124.png" />
                        </div>
                        <div className='content-home'>
                            <h2>Latest Equipmens</h2>
                            <p>Dental Care of SunRiseCare Hospital is your home for affordable dentistry and exceptional service in Prishtine, Kosove.</p>
                        </div>
                    </div>
                    <div className='card-home'>
                        <div className='imgbox'>
                            <img src="https://th.bing.com/th/id/R.8b331ba96f1b74cdbbb0140fdfd3b8a8?rik=HnJy%2bFc2LzkZmw&pid=ImgRaw&r=0" />
                        </div>
                        <div className='content-home'>
                            <h2>Laboratory</h2>
                            <p>Our laboratory equipped with all equipment for biochemical analysis which enables you to perform all biochemical analyzes needed in one place.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='all-buttons'>
                <Link to="/RegisterForm" style={{ textDecoration: "none" }}>
                    <div className='container-button'>
                        <div className='button-1'><strong>Patient Registration</strong></div>
                    </div>
                </Link>
                <Link to="/Reservation" style={{ textDecoration: "none" }}>
                    <div className='container-button'>
                        <div className='button-1'><strong>Choose an appointment</strong></div>
                    </div>
                </Link>
                <Link to="/Contact" style={{ textDecoration: "none" }}>
                    <div className='container-button'>
                        <div className='button-1'><strong>Contact</strong></div>
                    </div>
                </Link>
            </div>

            <hr></hr>
            <div class="heading">
                <p>Your health and happiness are our greatest rewards, and we are here for you, ready to provide the highest level of care, today and always.</p>
            </div>

            <div class="coontainer">
                <section class="about">
                    <div class="about-image-patient">
                        <img src="about-patient.jpg" />

                    </div>
                    <div class="about-coontent">
                        <h2>"Your Journey to Better Health Begins Here."</h2>
                        <p>
                            Our hospital stands as a beacon of hope and healing in our community. For years, we have been at the forefront of providing exceptional healthcare services to our patients, driven by a steadfast commitment to their well-being.
                            Within our walls, you will find a team of dedicated medical professionals who are not only experts in their respective fields but also deeply compassionate individuals.
                        </p>



                    </div>

                </section>
            </div>
            <hr></hr>

            <div class="servicess">
                <div class="service-heading">
                    <h3 style={{ textAlign: 'center' }}>Our Special Services</h3>
                </div>

                <div class="main-servicess">
                    <div class="main-inner-servicess">
                        <div class="services-img">
                            <img src="https://i.pinimg.com/736x/48/d8/d3/48d8d3f49ac249c290d8d6768f883a5b.jpg" alt="Endokrinologji" />
                        </div>
                        <div class="servicess-content">
                            <h2>hospital</h2>
                            <Button variant="outline-secondary">Read More</Button>{' '}
                        </div>
                    </div>

                    <div class="main-inner-servicess">
                        <div class="services-img">
                            <img src="https://i.pinimg.com/736x/48/d8/d3/48d8d3f49ac249c290d8d6768f883a5b.jpg" alt="Urgjenca 24/7" />
                        </div>
                        <div class="servicess-content">
                            <h2>hospital</h2>
                            <Button variant="outline-secondary">Read More</Button>{' '}
                        </div>
                    </div>

                    <div class="main-inner-servicess">
                        <div class="services-img">
                            <img src="https://images.squarespace-cdn.com/content/v1/5aa96c579772aea9adaa2ef7/295bd613-d748-4a18-9b91-c04a725f7f06/MedicalTechnologyExamples_124.png" alt="Alergologjia" />
                        </div>
                        <div class="servicess-content">
                            <h2>hospital</h2>
                            <Button variant="outline-secondary">Read More</Button>{' '}
                        </div>
                    </div>

                    <div class="main-inner-servicess">
                        <div class="services-img">
                            <img src="https://images.squarespace-cdn.com/content/v1/5aa96c579772aea9adaa2ef7/295bd613-d748-4a18-9b91-c04a725f7f06/MedicalTechnologyExamples_124.png" alt="Alergologjia" />
                        </div>
                        <div class="servicess-content">
                            <h2>hospital</h2>
                            <Button variant="outline-secondary">Read More</Button>{' '}
                        </div>
                    </div>

                    <div class="main-inner-servicess">
                        <div class="services-img">
                            <img src="https://images.squarespace-cdn.com/content/v1/5aa96c579772aea9adaa2ef7/295bd613-d748-4a18-9b91-c04a725f7f06/MedicalTechnologyExamples_124.png" alt="Alergologjia" />
                        </div>
                        <div class="servicess-content">
                            <h2>hospital</h2>
                            <Button variant="outline-secondary">Read More</Button>{' '}
                        </div>
                    </div>

                    <div class="main-inner-servicess">
                        <div class="services-img">
                            <img src="https://images.squarespace-cdn.com/content/v1/5aa96c579772aea9adaa2ef7/295bd613-d748-4a18-9b91-c04a725f7f06/MedicalTechnologyExamples_124.png" alt="Dermatologji" />
                        </div>
                        <div class="servicess-content">
                            <h2>hospital</h2>
                            <Button variant="outline-secondary">Read More</Button>{' '}
                        </div>
                    </div>
                </div>
                <div class="read-more-button">
                    <button><a href="#">Click Here for more Services</a></button>
                </div>
            </div>

            <hr></hr>

            <div class="working-hours-section">
                <div class="working-hours-info">
                    <h2>Working Hours</h2>
                    <ul class="working-hours-list">
                        <li><span>Monday:</span> 8:00 AM - 5:00 PM</li>
                        <li><span>Tuesday:</span> 8:00 AM - 5:00 PM</li>
                        <li><span>Wednesday:</span> 8:00 AM - 5:00 PM</li>
                        <li><span>Thursday:</span> 8:00 AM - 5:00 PM</li>
                        <li><span>Friday:</span> 8:00 AM - 5:00 PM</li>
                        <li><span>Saturday:</span> 9:00 AM - 3:00 PM</li>
                        <li><span>Sunday:</span> Closed</li>
                    </ul>
                </div>

                <div class="photo">
                    <img src="https://cdn.sanity.io/images/0vv8moc6/medec/48e7c9e2591e90c0b64cf7a823123f397f34b342-1000x600.png?fit=crop&auto=format" alt="Hospital" />
                </div>
            </div>


            <hr></hr>

            <br></br>
            <center><h3>Where can you find us ?</h3></center>
            <br></br>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2856.812469825241!2d21.143523503176603!3d42.65200171275375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549ef3f69baacb%3A0xf864a269cc75e908!2sDukagjini%20Residence!5e0!3m2!1sen!2s!4v1682282589650!5m2!1sen!2s"
                width="100%"
                height="450"
                style={{ border: "0" }}
                allowfullscreen=""
                loading="lazy">
            </iframe>
            <FooterPage />
        </Fragment>
    );
};

export default Home;

import React, { Fragment } from 'react';
import '../CSS/Reviews.css'; // You can create a new CSS file for specific styles or reuse 'Home.css'
import FooterPage from './FooterPage';
import Navbar from '../components/Navbar';
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";

const Reviews = () => {
    // Example reviews data, you can fetch this from a server in real implementation
    const reviews = [
        {
            name: "John Doe",
            title: "Amazing Service!",
            review: "The doctors and staff were so professional and caring. I felt safe and well cared for during my stay.",
            img: "https://th.bing.com/th/id/R.50fb97fc2f909ee7abe6477b195ffb03?rik=gzjn39i1I4Nw%2bg&pid=ImgRaw&r=0"
        },
        {
            name: "Jane Smith",
            title: "Highly Recommend",
            review: "I received top-notch treatment. The staff is friendly, and the facility is clean and well-organized.",
            img: "https://www.cardinalhealth.com/content/dam/corp/products/professional-products/search-engine/search-procedure-mask-gown.jpg"
        },
        {
            name: "Michael Lee",
            title: "Excellent Care",
            review: "The entire experience was exceptional. I recommend this hospital to everyone.",
            img: "https://www.mckinsey.com/~/media/mckinsey/industries/life%20sciences/our%20insights/the%20pursuit%20of%20excellence%20in%20new%20drug%20development/the-pursuit-of-excellence-5050-1536x1536.jpg"
        },
        {
            name: "Sara Connor",
            title: "Best Healthcare Facility",
            review: "I've never felt more comfortable and well looked after. The team here is wonderful!",
            img: "https://th.bing.com/th/id/R.33620f16727e46d608bf6cf83a266472?rik=3xmXnVWaTFX5Kg&riu=http%3a%2f%2fwww.acc.org%2f-%2fmedia%2f2B10250DE2D8430AA513F18F4ACD6BD1.jpg&ehk=WDInOrTWxamptCtbV26EhrtUfldbbOYDRYjJ3fxcSDI%3d&risl=&pid=ImgRaw&r=0"
        },
        {
            name: "Emily Watson",
            title: "Great Facility",
            review: "The staff were incredibly kind, and the facility was spotless. I would recommend this hospital to anyone!",
            img: "https://th.bing.com/th/id/R.1817fb5fdb786d716991c9451e923549?rik=8w9radBx%2f%2ffxuw&riu=http%3a%2f%2fsueschade.com%2fwp-content%2fuploads%2f2015%2f12%2fiStock_000074341681_Medium.jpg&ehk=Ky1LAPhKkTYC%2fB106FWOjdBTlvg8%2fFeMx6kX7TnuYbg%3d&risl=&pid=ImgRaw&r=0"
        },
        {
            name: "Robert Johnson",
            title: "Outstanding Care",
            review: "I was amazed by the level of attention and care provided. They made my recovery much easier.",
            img: "https://th.bing.com/th/id/OIP.bR--rue8Ln1tIb__lyWK8wHaE8?rs=1&pid=ImgDetMain"
        },
        {
            name: "Lisa Brown",
            title: "Highly Professional",
            review: "The doctors are extremely knowledgeable, and the support staff were always helpful and compassionate.",
            img: "https://thumbs.dreamstime.com/z/male-female-doctor-treating-patient-hospital-examining-sick-stethoscope-analyzing-reports-166516502.jpg"
        }
    ];

    return (
        <Fragment>
            <Helmet>
                <title>Reviews - Hospital-SM</title>
            </Helmet>
            <Navbar />

            <div className='reviews-container'>
                <div className='banner'>
                    <h1>What Our Patients Say</h1>
                    <p>Your feedback drives us to improve and offer the best healthcare experience.</p>
                </div>

                <div className='reviews-grid'>
                    {reviews.map((review, index) => (
                        <div className='review-card' key={index}>
                            <div className='imgbox'>
                                <img src={review.img} alt={review.name} />
                            </div>
                            <div className='review-content'>
                                <h3>{review.title}</h3>
                                <p>{review.review}</p>
                                <p><strong>- {review.name}</strong></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='leave-review'>
                <h2>Log in for more</h2>
                <Link to="/LoginForm">
                    <button className='button-1'>Log in </button>
                </Link>
            </div>

            <FooterPage />
        </Fragment>
    );
};

export default Reviews;

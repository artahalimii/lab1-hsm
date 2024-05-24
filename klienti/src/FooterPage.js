import React from 'react';
//  import  Footer  from 'mdbreact';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
// // import 'mdbreact/dist/css/mdb.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import './Footer.css';

export class FooterPage extends React.Component {
    render() {
        return (
            <footer >
                <Container className="text-left">
                    <Row>
                        <Col md="6">
                        </Col>
                        <hr className="clearfix w-100 d-md-none" />
                        <Col md="4">
                            <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">Links</h5>
                            <ul className="list-unstyled">
                                <li><a href="/" className='linksFooter'>Home</a></li>
                                <li><a href="/" className='linksFooter'>Services</a></li>
                                <li><a href="/" className='linksFooter'>More About Us</a></li>
                                <li><a href="/" className='linksFooter'>Contact Information</a></li>
                            </ul>
                            
                        </Col>

                           

                        
                    </Row>
                </Container>
                <hr />
                <div className="text-center py-3">
                    <ul className="list-unstyled list-inline mb-0">
                        <li className="list-inline-item">

                            <h5 className="mb-1">Register for free</h5> 

                        </li>
                        <li className="list-inline-item"><a href="/RegisterForm" className="btn btn-danger btn-rounded">Sign up!</a></li>
                    </ul>
                </div>
                <hr />
                <div className="text-center">
                    <ul className="list-unstyled list-inline">
                        <li className="list-inline-item"><a className="btn-floating btn-sm btn-fb mx-1" href="https://www.facebook.com/"><i className="fab fa-facebook"> </i></a></li>
                        <li className="list-inline-item"><a className="btn-floating btn-sm btn-tw mx-1" href="https://www.twitter.com/"><i className="fab fa-twitter"> </i></a></li>
                        <li className="list-inline-item"><a className="btn-floating btn-sm btn-gplus mx-1" href="https://plus.google.com/"><i className="fab fa-google-plus"> </i></a></li>
                        <li className="list-inline-item"><a className="btn-floating btn-sm btn-li mx-1" href="https://linkedin.com/"><i className="fab fa-linkedin"> </i></a></li>
                        <li className="list-inline-item"><a className="btn-floating btn-sm btn-dribbble mx-1" href="https://dribbble.com/"><i className="fab fa-dribbble"> </i></a></li>
                    </ul>
                </div>
                <div className="footer-copyright text-center">
                    <Container fluid>
                        &copy; {(new Date().getFullYear())} Copyright: <a href="/" className='originalPathFooter'> HospitalManagmentSystem.com </a>
                    </Container>
                </div>
            </footer>
        );
    }
}

export default FooterPage;
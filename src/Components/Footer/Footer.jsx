import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  HiOutlineMail, 
  HiOutlinePhone, 
  HiOutlineLocationMarker,
  HiOutlineGlobe,
  HiOutlineDocumentText,
  HiOutlineShieldCheck,
  HiOutlineHeart
} from 'react-icons/hi';
import './Footer.css';

const Footer = ({ variant = 'default' }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', link: '/about' },
      { label: 'Our Team', link: '/team' },
      { label: 'Careers', link: '/careers' },
      { label: 'Contact', link: '/contact' },
    ],
    services: [
      { label: 'Dashboard', link: '/dashboard' },
      { label: 'Analytics', link: '/analytics' },
      { label: 'Reports', link: '/reports' },
      { label: 'Support', link: '/support' },
    ],
    resources: [
      { label: 'Documentation', link: '/docs', icon: HiOutlineDocumentText },
      { label: 'API Reference', link: '/api' },
      { label: 'Tutorials', link: '/tutorials' },
      { label: 'Blog', link: '/blog' },
    ],
    legal: [
      { label: 'Privacy Policy', link: '/privacy', icon: HiOutlineShieldCheck },
      { label: 'Terms of Service', link: '/terms' },
      { label: 'Cookie Policy', link: '/cookies' },
      { label: 'GDPR', link: '/gdpr' },
    ],
  };

  const contactInfo = [
    { 
      icon: HiOutlineMail, 
      label: 'Email', 
      value: 'support@milestone.com',
      link: 'mailto:support@milestone.com'
    },
    { 
      icon: HiOutlinePhone, 
      label: 'Phone', 
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    { 
      icon: HiOutlineLocationMarker, 
      label: 'Address', 
      value: '123 Business St, Suite 100, City, State 12345'
    },
    { 
      icon: HiOutlineGlobe, 
      label: 'Website', 
      value: 'www.milestone.com',
      link: 'https://www.milestone.com'
    },
  ];

  return (
    <footer className={`footer-main-container ${variant}`}>
      <Container>
        {/* Main Footer Content */}
        <Row className="footer-content">
          {/* Company Info */}
          <Col lg={4} md={6} sm={12} className="mb-4 mb-lg-0">
            <div className="footer-section">
              <h3 className="footer-title">Milestone</h3>
              <p className="footer-description">
                Empowering businesses with innovative solutions for efficient management, 
                real-time analytics, and secure operations. Your success is our priority.
              </p>
              
              {/* Contact Information */}
              <div className="contact-info">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="contact-item">
                    <contact.icon className="contact-icon" />
                    <div className="contact-details">
                      <span className="contact-label">{contact.label}:</span>
                      {contact.link ? (
                        <a 
                          href={contact.link} 
                          className="contact-link"
                          target={contact.link.startsWith('http') ? '_blank' : undefined}
                          rel={contact.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <span className="contact-value">{contact.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6} sm={6} className="mb-4 mb-lg-0">
            <div className="footer-section">
              <h4 className="footer-subtitle">Company</h4>
              <ul className="footer-links">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link to={link.link} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Col>

          <Col lg={2} md={6} sm={6} className="mb-4 mb-lg-0">
            <div className="footer-section">
              <h4 className="footer-subtitle">Services</h4>
              <ul className="footer-links">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <Link to={link.link} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Col>

          <Col lg={2} md={6} sm={6} className="mb-4 mb-lg-0">
            <div className="footer-section">
              <h4 className="footer-subtitle">Resources</h4>
              <ul className="footer-links">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <Link to={link.link} className="footer-link">
                      {link.icon && <link.icon className="link-icon" />}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Col>

          <Col lg={2} md={6} sm={6} className="mb-4 mb-lg-0">
            <div className="footer-section">
              <h4 className="footer-subtitle">Legal</h4>
              <ul className="footer-links">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <Link to={link.link} className="footer-link">
                      {link.icon && <link.icon className="link-icon" />}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>

        {/* Footer Bottom */}
        <Row className="footer-bottom">
          <Col xs={12}>
            <div className="footer-bottom-content">
              <div className="copyright">
                <p className="mb-0">
                  © {currentYear} Milestone. All rights reserved. Made with{' '}
                  <HiOutlineHeart className="heart-icon" /> for our users.
                </p>
              </div>
              <div className="footer-social">
                <span className="social-text">Follow us:</span>
                <div className="social-links">
                  <a href="#" className="social-link" aria-label="Facebook">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="#" className="social-link" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="social-link" aria-label="LinkedIn">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="#" className="social-link" aria-label="GitHub">
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 
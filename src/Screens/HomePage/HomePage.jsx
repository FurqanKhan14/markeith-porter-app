import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineGlobe,
  HiOutlineLightningBolt,
  HiOutlineShieldCheck,
  HiOutlineUsers,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import CustomButton from '../../Components/CustomButton';
import useUserStore from '../../Stores/UserStore';
import './HomePage.css';

const HomePage = () => {
  const { user, role = 'guest' } = useUserStore();
  const isAuthenticated = !!user;

  const features = [
    {
      icon: HiOutlineChartBar,
      title: 'Analytics Dashboard',
      description:
        'Get real-time insights into your business performance with comprehensive analytics and reporting tools.',
      color: 'var(--primary-color)',
      bgColor: 'var(--dash-icon-wrapper-bg)',
    },
    {
      icon: HiOutlineShieldCheck,
      title: 'Secure Platform',
      description:
        'Enterprise-grade security ensures your data is protected with advanced encryption and compliance standards.',
      color: '#28a745',
      bgColor: '#e8f5e8',
    },
    {
      icon: HiOutlineLightningBolt,
      title: 'Lightning Fast',
      description:
        'Optimized performance and fast loading times ensure smooth user experience across all devices.',
      color: '#ffc107',
      bgColor: '#fff8e1',
    },
    {
      icon: HiOutlineUsers,
      title: 'Team Collaboration',
      description:
        'Built-in collaboration tools help your team work together efficiently and stay connected.',
      color: '#6f42c1',
      bgColor: '#f3e5f5',
    },
    {
      icon: HiOutlineGlobe,
      title: 'Global Access',
      description:
        'Access your data from anywhere in the world with our cloud-based platform and mobile apps.',
      color: '#17a2b8',
      bgColor: '#e1f5fe',
    },
    {
      icon: HiOutlineCog,
      title: 'Easy Integration',
      description:
        'Seamlessly integrate with your existing tools and workflows with our comprehensive API.',
      color: '#fd7e14',
      bgColor: '#fff3e0',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' },
    { number: '50+', label: 'Countries' },
  ];

  return (
    <div className="homepage">
      <main className="homepage-main">
        {/* Hero Section */}
        <section className="hero-section">
          <Container>
            <Row className="align-items-center">
              <Col lg={6} md={12} className="mb-5 mb-lg-0">
                <h1 className="hero-title">
                  {isAuthenticated
                    ? 'Welcome to Your Dashboard'
                    : 'Transform Your Business with Milestone'}
                </h1>
                <p className="hero-description">
                  {isAuthenticated
                    ? 'Access all your tools and insights in one place. Manage your business efficiently with our comprehensive platform.'
                    : 'Empower your business with innovative solutions for efficient management, real-time analytics, and secure operations.'}
                </p>
                <div className="hero-actions">
                  {isAuthenticated ? (
                    <CustomButton
                      text="Go to Dashboard"
                      onClick={() => (window.location.href = '/dashboard')}
                      className="fitContent"
                    />
                  ) : (
                    <>
                      <Link to="/signup">
                        <CustomButton
                          text="Get Started Free"
                          className="fitContent me-3"
                        />
                      </Link>
                      <Link to="/login">
                        <CustomButton
                          text="Learn More"
                          variant="secondaryButton"
                          className="fitContent"
                        />
                      </Link>
                    </>
                  )}
                </div>
              </Col>
              <Col lg={6} md={12} className="text-center">
                <div className="hero-image">
                  <div
                    className="dash-icon-wrapper mx-auto"
                    style={{ width: '200px', height: '200px' }}
                  >
                    <HiOutlineChartBar
                      size={80}
                      style={{ color: 'var(--primary-color)' }}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <Container>
            <Row>
              {stats.map((stat, index) => (
                <Col lg={3} md={6} sm={6} key={index} className="mb-4">
                  <div className="stat-card text-center">
                    <h2 className="stat-number">{stat.number}</h2>
                    <p className="stat-label">{stat.label}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <Container>
            <div className="text-center mb-5">
              <h2 className="section-title">Why Choose Milestone?</h2>
              <p className="section-description">
                Discover the features that make our platform the perfect choice
                for your business
              </p>
            </div>
            <Row>
              {features.map((feature, index) => (
                <Col lg={4} md={6} sm={12} key={index} className="mb-4">
                  <div className="feature-card">
                    <div
                      className="feature-icon-wrapper"
                      style={{
                        backgroundColor: feature.bgColor,
                        width: '80px',
                        height: '80px',
                      }}
                    >
                      <feature.icon
                        size={40}
                        style={{ color: feature.color }}
                      />
                    </div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <Container>
            <div className="cta-content text-center">
              <h2 className="cta-title">
                {isAuthenticated
                  ? 'Ready to Explore More Features?'
                  : 'Ready to Get Started?'}
              </h2>
              <p className="cta-description">
                {isAuthenticated
                  ? 'Discover all the powerful tools and features available in your dashboard.'
                  : 'Join thousands of businesses already using Milestone to grow and succeed.'}
              </p>
              {isAuthenticated ? (
                <CustomButton
                  text="Explore Dashboard"
                  onClick={() => (window.location.href = '/dashboard')}
                  className="fitContent"
                />
              ) : (
                <div className="d-flex flex-wrap gap-3 justify-content-center">
                  <Link to="/signup">
                    <CustomButton
                      text="Start Free Trial"
                      className="fitContent"
                    />
                  </Link>
                  <Link to="/contact">
                    <CustomButton
                      text="Contact Sales"
                      variant="secondaryButton"
                      className="fitContent"
                    />
                  </Link>
                </div>
              )}
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
};

export default HomePage;

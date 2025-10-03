import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import {
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineUser,
  HiOutlineBell,
  HiOutlineHome,
  HiOutlineDocumentText,
} from 'react-icons/hi';
import useUserStore from '../../Stores/UserStore';
import CustomButton from '../../Components/Common/CustomButton';

const Home = () => {
  const { user, role = 'guest' } = useUserStore();
  const isAuthenticated = !!user;

  const getInitials = (name = '') => {
    return name
      ?.split(' ')
      ?.map((word) => word?.[0]?.toUpperCase())
      ?.join('');
  };

  const quickActions = [
    {
      title: 'Dashboard',
      description: 'View your analytics and insights',
      icon: HiOutlineChartBar,
      link: '/dashboard',
      color: 'var(--primary-color)',
      bgColor: 'var(--dash-icon-wrapper-bg)',
    },
    {
      title: 'Profile',
      description: 'Manage your account settings',
      icon: HiOutlineUser,
      link: '/profile',
      color: '#28a745',
      bgColor: '#e8f5e8',
    },
    {
      title: 'Notifications',
      description: 'Check your latest updates',
      icon: HiOutlineBell,
      link: '/notifications',
      color: '#ffc107',
      bgColor: '#fff8e1',
    },
    {
      title: 'Preferences',
      description: 'Customize your experience',
      icon: HiOutlineCog,
      link: '/preferences',
      color: '#6f42c1',
      bgColor: '#f3e5f5',
    },
  ];

  const features = [
    {
      title: 'Easy Management',
      description: 'Streamlined tools to manage your business efficiently',
      icon: HiOutlineHome,
    },
    {
      title: 'Real-time Analytics',
      description: 'Get insights into your performance with detailed reports',
      icon: HiOutlineChartBar,
    },
    {
      title: 'Secure Platform',
      description: 'Your data is protected with enterprise-grade security',
      icon: HiOutlineDocumentText,
    },
  ];

  return (
    <div className="homepage my-5">
      {/* Hero Section */}
      <section className="mb-5">
        <div className="d-card py-45">
          <Row className="align-items-center">
            <Col lg={8} md={12} className="mb-4 mb-lg-0">
              {isAuthenticated ? (
                <>
                  <h1 className="dashboardTitle mb-3">
                    Welcome back, {user?.user_name || user?.name || 'User'}!
                  </h1>
                  <p
                    className="secondary-text mb-4"
                    style={{ fontSize: '18px' }}
                  >
                    You're logged in as a{' '}
                    <span className="primary-text fw-semibold">{role}</span>.
                    Ready to manage your business efficiently?
                  </p>
                  <div className="d-flex flex-wrap gap-3">
                    <CustomButton
                      text="Go to Dashboard"
                      onClick={() => (window.location.href = '/dashboard')}
                      className="fitContent"
                    />
                    <CustomButton
                      text="View Profile"
                      variant="secondaryButton"
                      onClick={() => (window.location.href = '/profile')}
                      className="fitContent"
                    />
                  </div>
                </>
              ) : (
                <>
                  <h1 className="dashboardTitle mb-3">
                    Welcome to Our Platform
                  </h1>
                  <p
                    className="secondary-text mb-4"
                    style={{ fontSize: '18px' }}
                  >
                    Discover amazing features and services designed to help your
                    business grow. Sign up or log in to access your personalized
                    experience.
                  </p>
                  <div className="d-flex flex-wrap gap-3">
                    <Link to="/login">
                      <CustomButton text="Login" className="fitContent" />
                    </Link>
                    <Link to="/signup">
                      <CustomButton
                        text="Sign Up"
                        variant="secondaryButton"
                        className="fitContent"
                      />
                    </Link>
                  </div>
                </>
              )}
            </Col>
            <Col lg={4} md={12} className="text-center">
              {isAuthenticated && (
                <div
                  className="dash-icon-wrapper mx-auto"
                  style={{ width: '120px', height: '120px' }}
                >
                  <h1
                    className="mb-0"
                    style={{ fontSize: '48px', color: 'var(--primary-color)' }}
                  >
                    {getInitials(user?.user_name || user?.name)}
                  </h1>
                </div>
              )}
            </Col>
          </Row>
        </div>
      </section>

      {/* Quick Actions Section - Only for authenticated users */}
      {isAuthenticated && (
        <section className="mb-5">
          <h2 className="screen-title-body mb-4">Quick Actions</h2>
          <Row>
            {quickActions.map((action, index) => (
              <Col lg={3} md={6} sm={12} key={index} className="mb-4">
                <div className="d-card h-100">
                  <div className="d-flex flex-column h-100">
                    <div
                      className="dash-icon-wrapper mb-3"
                      style={{
                        backgroundColor: action.bgColor,
                        width: '60px',
                        height: '60px',
                      }}
                    >
                      <action.icon size={28} style={{ color: action.color }} />
                    </div>
                    <h5 className="d-card-title mb-2">{action.title}</h5>
                    <p className="secondary-text mb-3 flex-grow-1">
                      {action.description}
                    </p>
                    <Link to={action.link} className="mt-auto">
                      <CustomButton
                        text="Access"
                        variant="secondaryButton"
                        className="w-100"
                      />
                    </Link>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </section>
      )}

      {/* Features Section */}
      <section className="mb-5">
        <h2 className="screen-title-body mb-4 text-center">
          {isAuthenticated ? 'Why Choose Our Platform?' : 'Platform Features'}
        </h2>
        <Row>
          {features.map((feature, index) => (
            <Col lg={4} md={6} sm={12} key={index} className="mb-4">
              <div className="d-card h-100 text-center">
                <div
                  className="dash-icon-wrapper mx-auto mb-3"
                  style={{
                    backgroundColor: 'var(--dash-icon-wrapper-bg)',
                    width: '80px',
                    height: '80px',
                  }}
                >
                  <feature.icon
                    size={36}
                    style={{ color: 'var(--primary-color)' }}
                  />
                </div>
                <h5 className="d-card-title mb-3">{feature.title}</h5>
                <p className="secondary-text">{feature.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </section>

      {/* Call to Action Section */}
      <section>
        <div
          className="d-card py-45 text-center"
          style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}
        >
          <h2 className="dashboardTitle mb-3" style={{ color: 'white' }}>
            {isAuthenticated
              ? 'Ready to Get Started?'
              : 'Join Thousands of Users'}
          </h2>
          <p className="mb-4" style={{ fontSize: '18px', opacity: 0.9 }}>
            {isAuthenticated
              ? 'Explore all our features and take your business to the next level.'
              : 'Start your journey today and experience the difference our platform makes.'}
          </p>
          {isAuthenticated ? (
            <div className="d-inline-block">
              <CustomButton text="Explore Features" />
            </div>
          ) : (
            <div className="d-flex flex-wrap gap-3 justify-content-center">
              <Link to="/signup">
                <CustomButton
                  text="Get Started Free"
                  variant="secondaryButton"
                  className="fitContent"
                  style={{
                    backgroundColor: 'white',
                    color: 'var(--primary-color)',
                  }}
                />
              </Link>
              <Link to="/login">
                <CustomButton
                  text="Learn More"
                  variant="secondaryButton"
                  className="fitContent"
                  style={{ borderColor: 'white', color: 'white' }}
                />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

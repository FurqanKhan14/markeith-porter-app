import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AuthLayout.css';

export const AuthLayout = ({
  authTitle,
  authMain,
  authParagraph,
  children,
  backOption,
  adminAuth = false,
}) => {
  return (
    <section className="admin-login-wrap auth-wrapper beechMein authBg">
      <Container>
        <Row className="beechMein">
          <Col lg={9}>
            <div className="authForm authBox authformBg">
              <div className="authFormHeader text-center mb-lg-5 mb-3">
              {authTitle && (
                <h2 className="authTitle">{authTitle}</h2>
              )}
                {authMain && (
                  <p className="mb-0 px-lg-5 mx-lg-5 px-2 mx-2">
                    {authParagraph}
                  </p>
                )}
              </div>
              {children}
              {backOption && (
                <div className="text-center mt-4">
                  <Link
                    to={adminAuth ? '/admin/login' : '/login'}
                    className="text-link"
                  >
                    Back To Login
                  </Link>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

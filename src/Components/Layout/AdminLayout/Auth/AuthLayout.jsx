import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles.css';
import { images } from '../../../../assets';

export const AuthLayout = ({
  authTitle,
  isSubTitle = true,
  authParagraph,
  children,
  backOption,
  isAdminAuth = false,
  authWrapClass,
}) => {
  return (
    <section
      className={`admin-login-wrap beechMein authBg ${
        authWrapClass ? authWrapClass : ''
      }`}
    >
      <Container fluid className="p-0">
        <Row className="beechMein g-0">
          <Col xs={12} xl={12} className="mx-auto">
            <div className="login-card p-0">
              <Row className="justify-content-center g-0">
                <Col
                  xs={12}
                  lg={5}
                  className="d-flex flex-column justify-content-center"
                >
                  <div className="left px-xxl-5">
                    <div className="authForm">
                      <div className="authFormHeader mb-sm-5 mb-4 text-center">
                        <img
                          src={images.adminAuthLogo}
                          alt="authLogo"
                          className="adminAuthLogo d-inline-block mb-5"
                        />

                        {authTitle && (
                          <h2 className="authTitle">{authTitle}</h2>
                        )}
                        {isSubTitle && authParagraph && (
                          <p className="authPara px-1 px-lg-3 px-xl-4">{authParagraph}</p>
                        )}
                      </div>
                      {children}
                      {backOption && (
                        <div className="text-center mt-5">
                          <Link
                            to={isAdminAuth ? '/admin/login' : '/login'}
                            className="fw-normal text-decoration-underline"
                          >
                            <button className="fw-medium btn p-0 btn-link text-black">
                              <span className="lightGrayColor">Back To</span>{' '}
                              Login
                            </button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </Col>
                {/* <Col
                  xs={12}
                  lg={7}
                  className="d-flex align-items-stretch d-lg-block d-none right"
                >
                  <div className="position-relative w-100 h-100">
                    <img
                      src={images.authRightImg}
                      alt="authLogo"
                      className="img-fluid"
                    />
                  </div>
                </Col> */}
              </Row>
            </div>
          </Col>

          {/* <Col lg={9}>
            <div className="authForm authBox authformBg">
              <div className="authFormHeader text-center mb-lg-5 mb-3">
                <h2 className="authTitle">{authTitle}</h2>
                {isSubTitle && (
                  <p className="mb-0 px-lg-5 mx-lg-5 px-2 mx-2">
                    {authParagraph}
                  </p>
                )}
              </div>
              {children}
              {backOption && (
                <div className="text-center mt-4">
                  <Link
                    to={isAdminAuth ? '/admin/login' : '/login'}
                    className="text-link"
                  >
                    Back To Login
                  </Link>
                </div>
              )}
            </div>
          </Col> */}
        </Row>
      </Container>
    </section>
  );
};

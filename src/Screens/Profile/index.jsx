import React from 'react';
import useUserStore from '../../Stores/UserStore';
import { usePageTitle } from '../../Hooks/usePageTitle';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { images } from '../../assets';

const AdminProfile = () => {
  usePageTitle('My Profile');
  let { user } = useUserStore();
  const setUser = useUserStore((state) => state.setUser);

  return (
    <>
      <section className="profile-management">
        <div className="admin-content-header mb-4 d-flex gap-2">
          <h2 className="screen-title mb-0">Profile</h2>
        </div>
        <div className="admin-content-body rounded-20 p-4 p-lg-4 p-xxl-4 mb-4">
          <Row>
            <Col xl={10} xxl={6}>
              {user ? (
                <>
                  <Row>
                    <Col xs={12} className="mb-3 mb-xxl-5">
                      <div className="admin-profile-img">
                        <img
                          src={user?.["photo-path"] || images.UserImage}
                          className="img-fluid ml-0"
                          alt=""
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col
                      xs={12}
                      xxl={6}
                      className="mb-3 mb-lg-4 mb-xxl-4 detail-box"
                    >
                      <h5 className="mb-2">First Name</h5>
                      <p className="fw-medium">{user?.first_name}</p>
                    </Col>
                    <Col
                      xs={12}
                      xxl={6}
                      className="mb-3 mb-lg-4 mb-xxl-4 detail-box"
                    >
                      <h5 className="mb-2">Last Name</h5>
                      <p className="fw-medium">{user?.last_name}</p>
                    </Col>
                    <Col
                      xs={12}
                      xxl={6}
                      className="mb-3 mb-lg-4 mb-xxl-4 detail-box"
                    >
                      <h5 className="mb-2">Email</h5>
                      <p className="fw-medium">{user?.email}</p>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col xs={12} className="text-center d-flex gap-4 flex-wrap">
                      <Link
                        to="/admin/profile/edit-profile"
                        className="btn btn-primary min-width-220"
                      >
                        Edit Profile
                      </Link>
                      <Link
                        to="/admin/profile/change-password"
                        className="btn btn-link px-0"
                      >
                        Change Password
                      </Link>
                    </Col>
                  </Row>
                </>
              ) : (
                ''
              )}
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default AdminProfile;

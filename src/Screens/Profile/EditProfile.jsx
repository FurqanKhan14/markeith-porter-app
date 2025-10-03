import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../Components/Common/CustomButton';
import useUserStore from '../../Stores/UserStore';
import { isNullOrEmpty } from '../../Utils/Utils';
import { editAdminProfileSchema } from '../../Utils/Validations/ValidationSchemas';
import { useMutation } from '@tanstack/react-query';
import { profileUpdate } from '../../Services/Admin/Profile';
import { showToast } from '../../Components/Toast/Toast';
import { usePageTitle } from '../../Hooks/usePageTitle';
import { Col, Row } from 'react-bootstrap';
import { images } from '../../assets';
import TextInput from '../../Components/Common/FormElements/TextInput';
import withModal from '../../HOC/withModal';

import { MdOutlineCameraAlt } from "react-icons/md";
import BackButton from '../../Components/BackButton';



const EditProfile = ({showModal}) => {
  usePageTitle('Edit Profile');

  let { user } = useUserStore();
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(user?.["photo-path"] || images.UserImage);

  const updateProfileMutation = useMutation({
    mutationFn: profileUpdate,
    onSuccess: (value) => {
      setUser(value.detail);
      showModal('Profile Updated Successfully', 'Profile has been updated successfully.', () => {
        navigate('/admin/profile');
      }, 'success');
    },
    onError: (error) => {
      console.error('Failed to update profile', error);
      if (!isNullOrEmpty(error.errors?.email)) {
        showToast(error.errors.email[0], 'error');
      }
    },
  });

  const { isPending } = updateProfileMutation;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        showToast('Please select a valid image file (JPEG, PNG, GIF)', 'error');
        return;
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        showToast('Image size should be less than 5MB', 'error');
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // Set the file for form submission
      setSelectedImage(file);
    }
  };

  const handleEditProfileSubmit = (values) => {
    console.log('values', values);
    showModal('Profile Updated Successfully', 'Profile has been updated successfully.', () => {
      navigate('/admin/profile');
    }, 'success');
    
    // Create FormData if image is selected
    if (selectedImage) {
      const formData = new FormData();
      formData.append('first_name', values.first_name);
      formData.append('last_name', values.last_name);
      formData.append('email', values.email);
      formData.append('photo', selectedImage);
      
      updateProfileMutation.mutate(formData);
    } else {
      // Submit without image
      updateProfileMutation.mutate(values);
    }
  };

  return (
    <section className="profile-management">
      <div className="admin-content-header mb-4 d-flex gap-2">
        <BackButton />
        <h2 className="screen-title mb-0">Edit Profile</h2>
      </div>

      <div className="admin-content-body rounded-20 p-4 p-lg-4 p-xxl-4 mb-4">
        <Row>
          <Col md={10} lg={8} xl={6} xxl={5}>
            <Row>
              <Col xs={12} className="mb-3 mb-xxl-5">
                <div className="admin-profile-img position-relative">
                  <img
                    src={imagePreview}
                    className="img-fluid ml-0"
                    alt="Profile"
                  />
                 
                  <div className="image-upload-overlay">
                  <label
                    htmlFor="image-upload"
                    className="upload-profile-btn"
                  >
                    <MdOutlineCameraAlt />
                  </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          
              <Formik
                initialValues={{ ...user }}
                validationSchema={editAdminProfileSchema}
                onSubmit={handleEditProfileSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  isSubmitting,
                }) => (
                  <Form>
                    <Row>
                      {console.log('values', errors)}
                      <Col xs={12} className="mb-3 mb-lg-4 mb-xxl-4">
                        <TextInput
                          name={'first_name'}
                          type={'text'}
                          required
                          label={'First Name'}
                          placeholder={'Enter First Name'}
                          value={values.first_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.first_name && errors.first_name}
                          labelClassName={`label-padding-left`}
                        />
                      </Col>
                      <Col xs={12} className="mb-3 mb-lg-4 mb-xxl-4">
                        <TextInput
                          name={'last_name'}
                          type={'text'}
                          required
                          label={'Last Name'}
                          placeholder={'Enter Last Name'}
                          value={values.last_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.last_name && errors.last_name}
                          labelClassName={`label-padding-left`}
                        />
                      </Col>
                      <Col xs={12} className="mb-3 mb-lg-4 mb-xxl-4">
                        <TextInput
                          name={'email'}
                          type={'email'}
                          required
                          label={'Email'}
                          placeholder={'Enter Email'}
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && errors.email}
                          labelClassName={`label-padding-left`}
                          readOnly
                        />
                      </Col>
                    </Row>
                    
                    <Row className="mt-4">
                      <Col xs={12}>
                        <CustomButton 
                          type="submit" 
                          text={'Update'}
                          loading={isPending}
                          loadingText="Updating..."
                          className='min-width-220'
                        />
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default withModal(EditProfile); 
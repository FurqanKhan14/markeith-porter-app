import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { HiTrash } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../../../Components/CustomModal';
import CustomTable from '../../../Components/CustomTable/CustomTable';
import TableActionDropDown from '../../../Components/TableActionDropDown/TableActionDropDown';
import { showToast } from '../../../Components/Toast/Toast';
import withFilters from '../../../HOC/withFilters ';
import withModal from '../../../HOC/withModal';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { useFetchTableData } from '../../../Hooks/useTable';
import {
  getPromoListing,
  updatePromo,
} from '../../../Services/Admin/PromoManagement';
import { statusClassMap } from '../../../Utils/Constants/SelectOptions';
import { userStatusFilters } from '../../../Utils/Constants/TableFilter';
import { promoCodeHeaders } from '../../../Utils/Constants/TableHeaders';
import { formatDate, serialNum, showErrorToast } from '../../../Utils/Utils';
import { HiPencilAlt } from 'react-icons/hi';
import { ErrorMessage, Form, Formik } from 'formik';
import TextInput from '../../../Components/Common/FormElements/TextInput';
import { promoCodeSchema } from '../../../Utils/Validations/ValidationSchemas';
import CustomButton from '../../../Components/Common/CustomButton';
import './styles.css';
import { VscPercentage } from 'react-icons/vsc';
import { BsQuestionCircleFill } from 'react-icons/bs';

const PromoCodeManagement = ({
  showModal,
  closeModal,
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  usePageTitle('User Management');
  const navigate = useNavigate();
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [selectedObj, setSelectedObj] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState(null); // Add this state

  let queryClient = useQueryClient();

  //GET USERS
  const {
    data: fetchedData, // Renamed to avoid confusion with the derived `promoManagement`
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchTableData(
    'userListing',
    filters,
    updatePagination,
    getPromoListing
  );

  // Provide a default value for `promoManagement`
  const promoManagement = fetchedData?.data ?? [];

  // console.log(promoManagement, 'Abc');

  if (isError) {
    showErrorToast(error);
  }
  const isStatusActive = (item) => {
    return item?.status_detail === 'Active';
  };

  const handleSubmit = (values, { resetForm, isSubmitting }) => {
    console.log('values', values);
    showModal(``, `Promocode Has Been added Successfully.!`, null, 'success');
    // Remove these undefined variables
    // const newEntry = {
    //   id: Date.now(),
    //   disbursement_time: values.disbursement_time,
    //   date: getCurrentDate(),
    // };
    // setPromoCodes((prevpromocode) => [...prevpromocode, newEntry]);
    resetForm();
    // Remove this undefined function call
    // onSubmit(values);
  };

  const handleFormUpdate = (values) => {
    const payload = {
      id: editData?.id,
      promo_name: values.code_name, // Fix field name
      promo_discount: values.code_discount, // Fix field name
    };
    console.log('Update Payload:', payload);
    setEditModal(false);
    setEditData(null); // Reset edit data
    showModal(``, `Promo code Has Been Updated successfully.`, null, 'success');
  };

  const handleDelete = (id) => {
    showModal(``, `Promo code Has Been deleted successfully.`, null, 'success');
    console.log('Deleted ID:', id);
  };

  const handleEdit = (item) => {
    setEditData(item); // Set the data to edit
    setEditModal(true); // Show the modal
  };

  return (
    <>
      <section className="promo-code-management">
        <div className="admin-content-header mb-4 d-flex gap-2">
          <h2 className="screen-title mb-0">Promo Code Management</h2>
        </div>
        <div className="admin-content-body rounded-20 p-4 p-lg-4 p-xxl-4 mb-4">
          <Formik
            initialValues={{
              code_name: '',
              code_discount: '',
            }}
            validationSchema={promoCodeSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit} className="payout-wrap">
                <Row className="mb-3">
                  {console.log('erros', errors)}
                  <Col
                    md={10}
                    lg={11}
                    xl={11}
                    xxl={10}
                    className="promo-code d-flex align-items-xl-end flex-xl-row flex-column gap-2"
                  >
                    <div className="flex-shrink-0">
                      <TextInput
                        id="code_name"
                        name="code_name"
                        label="Promocode Name"
                        type="text"
                        placeholder="Enter Promocode Name"
                        value={values.code_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        labelClassName="label-padding-left"
                        error={touched.code_name}
                      />
                      <div className="d-xl-none d-block">
                        <ErrorMessage
                          name="code_name"
                          component="p"
                          className="error-message mt-1 mb-0"
                        />
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <TextInput
                        id="code_discount"
                        name="code_discount"
                        label="Discount Percentage"
                        type="number"
                        placeholder="05"
                        value={values.code_discount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        labelClassName="label-padding-left"
                        iconPosition="right"
                        inputIcon={VscPercentage} // 👈 react-icons component
                        error={touched.code_discount}
                      />
                      <div className="d-xl-none d-block">
                        <ErrorMessage
                          name="code_discount"
                          component="p"
                          className="error-message mt-1 mb-0"
                        />
                      </div>
                    </div>
                    {/* Update Button */}
                    <div className="flex-grow-1 mt-xl-0 mt-2">
                      <CustomButton
                        type="submit"
                        loading={isSubmitting}
                        loadingText="Submitting..."
                        text="Add"
                        className="min-width-200"
                      />
                    </div>

                    {/* Commission rate input */}
                  </Col>
                  <Col xs={12}>
                    <div className="d-flex gap-2 d-xl-flex d-none">
                      <div className="code-error">
                        <ErrorMessage
                          name="code_name"
                          component="p"
                          className="error-message mb-0 mt-1"
                        />
                      </div>
                      <div className="code-error">
                        <ErrorMessage
                          name="code_discount"
                          component="p"
                          className="error-message mt-1 mb-0"
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
        <div className="admin-content-body rounded-20 p-4 p-lg-4 p-xxl-5">
          <Row>
            <Col xs={12}>
              <CustomTable
                filters={filters}
                setFilters={setFilters}
                headers={promoCodeHeaders}
                pagination={pagination}
                isLoading={isLoading}
                centerLastHeader={true}
                selectOptions={[
                  {
                    title: 'status',
                    options: userStatusFilters,
                  },
                ]}
                dateFilters={[
                  { title: 'Registration Date', from: 'from', to: 'to' },
                ]}
              >
                {(promoManagement?.length || isError) && (
                  <tbody>
                    {isError && (
                      <tr>
                        <td colSpan={promoCodeHeaders.length}>
                          <p className="text-danger mb-0">
                            Unable to fetch data at this time
                          </p>
                        </td>
                      </tr>
                    )}
                    {promoManagement?.map((item, index) => (
                      <tr key={item.id}>
                        <td>
                          {serialNum(
                            (filters?.page - 1) * filters?.per_page + index + 1
                          )}
                        </td>
                        <td>{item?.promo_name}</td>
                        <td>{item?.promo_discount}</td>
                        <td>{formatDate(item?.date)}</td>
                        <td>
                          <TableActionDropDown
                            actions={[
                              {
                                name: 'Edit',
                                icon: HiPencilAlt,
                                onClick: () => handleEdit(item), // Fix this
                                className: 'view',
                              },
                              {
                                name: 'Delete',
                                icon: HiTrash,
                                onClick: () => handleDelete(`${item.id}`),
                                className: 'delete',
                              },
                            ]}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </CustomTable>
            </Col>
          </Row>
        </div>
      </section>
      <CustomModal
        show={editModal}
        close={() => {
          setEditModal(false);
          setEditData(null); // Reset edit data when closing
        }}
      >
        <div className="h3 text-center fw-semibold">Promocode Discount</div>
        <div className="px-sm-4">
          <Formik
            enableReinitialize
            initialValues={{
              id: editData?.id || '',
              code_name: editData?.promo_name || '', // Fix field name
              code_discount: editData?.promo_discount || '', // Fix field name
            }}
            validationSchema={promoCodeSchema}
            onSubmit={handleFormUpdate}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit} className="category-wrap">
                <Row className="row">
                  <Col xs={12}>
                    <div className="mb-md-4 mb-3">
                      <TextInput
                        id="code_name"
                        name="code_name"
                        label="Promocode Name"
                        type="text"
                        placeholder="Enter Promocode Name"
                        value={values.code_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        labelClassName="label-padding-left"
                        touched={touched.code_name}
                      />
                    </div>
                    <div>
                      <TextInput
                        id="code_discount"
                        name="code_discount"
                        label="Discount Percentage"
                        type="number"
                        placeholder="05"
                        value={values.code_discount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        labelClassName="label-padding-left"
                        iconPosition="right"
                        inputIcon={VscPercentage} // 👈 react-icons component
                      />
                    </div>
                  </Col>
                </Row>
                <div className="row mb-3 mt-3">
                  <div className="col-12 text-center">
                    <CustomButton
                      variant="btn btn-primary"
                      className="px-5"
                      text="Update"
                      type="submit"
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </CustomModal>

      {/* <CustomModal
        show={changeStatusModal}
        close={() => setChangeStatusModal(false)}
        // disableClick={isStatusUpdating} // Disable action button during mutation
        // action={confirmStatusChange} // Perform status change on confirm
        title={isStatusActive(selectedObj) ? 'Deactivate' : 'Activate'}
        description={`Are you sure you want to ${
          isStatusActive(selectedObj) ? 'deactivate' : 'activate'
        } this user?`}
      /> */}
    </>
  );
};

export default withModal(withFilters(PromoCodeManagement));

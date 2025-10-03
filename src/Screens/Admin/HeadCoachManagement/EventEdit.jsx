import { QueryClient, useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Col, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import BackButton from '../../../Components/BackButton';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { 
  editEvent,
  updateEvent
} from '../../../Services/Admin/HeadCoachManagement';
import { formatDate } from '../../../Utils/Utils';
import './styles.css';
import TextInput from '../../../Components/Common/FormElements/TextInput';
import SelectInput from '../../../Components/Common/FormElements/SelectInput';
import CustomButton from '../../../Components/Common/CustomButton';
import CustomCheckbox from '../../../Components/CustomCheckbox/CustomCheckbox';
import withFilters from '../../../HOC/withFilters ';
import withModal from '../../../HOC/withModal';
import { durationOptions2 } from '../../../Utils/Constants/SelectOptions';
import { eventEditValidationSchema } from '../../../Utils/Validations/ValidationSchemas';

const EventEdit = ({ showModal }) => {
  usePageTitle('Edit Event');
  let queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();

  // Event Details for editing
  const {
    data: eventData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['eventEditData', id],
    queryFn: () => editEvent(id),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  console.log('Event Data for editing:', eventData);
  // Update event mutation
  const updateEventMutation = useMutation({
    mutationFn: ({ id, eventData }) => updateEvent({ id, eventData }),
    onSuccess: (data) => {
      showModal(
        '',
        'Event has been updated successfully.',
        () => {
          navigate(`/admin/head-coach-management/${id}/event-details/${id}`);
        },
        'success'
      );
      queryClient.invalidateQueries(['eventEditData', id]);
    },
    onError: (error) => {
      console.error('Failed to update event:', error);
      showModal(
        'Update Failed',
        'Failed to update event. Please try again.',
        null,
        'error'
      );
    },
  });

  const handleSubmit = (values) => {
    console.log('Submitting event data:', values);
    
    // Convert boolean attendance_required to string format for API
    const formattedValues = {
      ...values,
      attendance_required: values.attendance_required ? 'Yes' : 'No'
    };
    
    updateEventMutation.mutate({ id, eventData: formattedValues });
  };

  if (isLoading) {
    return (
      <>
        <div className="d-card">
          <div className="row">
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-7">
              <div className="row mb-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="col-12 col-sm-6 mb-3 align-items-center"
                    style={{ height: 56 }}
                  >
                    <Skeleton
                      style={{ marginTop: 28 }}
                      duration={1}
                      width={'50%'}
                      baseColor="#ddd"
                      height={22}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <div className="d-card">
          <p className="text-danger">{error.message}</p>
        </div>
      </>
    );
  }

  return (
    <section className="event-edit-management">
      <div className="admin-content-header mb-4 d-flex gap-2">
        <BackButton />
        <h2 className="page-title">Edit Event</h2>
      </div>
      <div className="admin-content-body rounded-20 p-4 p-lg-4 p-xxl-5 mb-4">
      <Row>
        <Col xs={12} md={12} lg={11} xl={10} xxl={7}>
          <Formik
            initialValues={{
              event_name: eventData?.event_name || '',
              event_date: eventData?.event_date || '',
              event_start_time: eventData?.event_start_time || '',
              event_end_time: eventData?.event_end_time || '',
              duration: eventData?.duration || '',
              location: eventData?.location || '',
              assigned_to: eventData?.assigned_to || '',
              equipment: eventData?.equipment || '',
              attendance_required: eventData?.attendance_required === 'Yes' || false,
              event_focus: eventData?.event_focus || '',
            }}
            validationSchema={eventEditValidationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => {
              return (
                <Form>
                  <Row>
                    <Col xs={12} md={6} lg={6} className="mb-4">
                      <TextInput
                        id="event_name"
                        name="event_name"
                        label="Event Name"
                        value={values.event_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.event_name && errors.event_name}
                        labelClassName='label-padding-left'
                        required
                      />
                    </Col>
                    <Col xs={12} md={6} lg={6} className="mb-4">
                      <TextInput
                        id="event_date"
                        name="event_date"
                        type="date"
                        label="Event Date"
                        value={values.event_date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.event_date && errors.event_date}
                        labelClassName='label-padding-left'
                        required
                      />
                    </Col>
                    <Col xs={12} md={6} lg={6} className="mb-4">
                      <TextInput
                        id="event_start_time"
                        name="event_start_time"
                        type="time"
                        label="Start Time"
                        value={values.event_start_time}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.event_start_time && errors.event_start_time}
                        labelClassName='label-padding-left'
                        required
                      />
                    </Col>
                    <Col xs={12} md={6} lg={6} className="mb-4">
                      <TextInput
                        id="event_end_time"
                        name="event_end_time"
                        type="time"
                        label="End Time"
                        value={values.event_end_time}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.event_end_time && errors.event_end_time}
                        labelClassName='label-padding-left'
                        required
                      />
                    </Col>
                    <Col xs={12} md={6} lg={6} className="mb-4">
                      <SelectInput
                        id="duration"
                        name="duration"
                        label="Duration"
                        value={values.duration || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        options={durationOptions2}
                        error={touched.duration && errors.duration}
                        labelClassName='label-padding-left'
                        required
                        placeholder="Select duration"
                      />
                    </Col>
                    <Col xs={12} md={6} lg={6} className="mb-4">
                      <TextInput
                        id="location"
                        name="location"
                        label="Location"
                        value={values.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.location && errors.location}
                        labelClassName='label-padding-left'
                        required
                      />
                    </Col>
                    <Col xs={12} md={6} lg={6} className="mb-4">
                      <TextInput
                        id="assigned_to"
                        name="assigned_to"
                        label="Assigned To"
                        value={values.assigned_to}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.assigned_to && errors.assigned_to}
                        labelClassName='label-padding-left'
                        required
                      />
                    </Col>
                    <Col xs={12} md={6} lg={6} className="mb-4">
                      <TextInput
                        id="event_focus"
                        name="event_focus"
                        label="Event Focus"
                        value={values.event_focus}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.event_focus && errors.event_focus}
                        labelClassName='label-padding-left'
                        required
                      />
                    </Col>
                    <Col xs={12} md={6} lg={6} className="mb-4">
                      <TextInput
                        id="equipment"
                        name="equipment"
                        label="Equipment"
                        value={values.equipment}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.equipment && errors.equipment}
                        labelClassName='label-padding-left'
                        required
                      />
                    </Col>
                   
                    <Col xs={12} className="mb-4">
                      <div className="d-flex flex-column">
                        <CustomCheckbox
                          name="attendance_required"
                          label="Attendance is required for this event"
                          checked={values.attendance_required}
                          onChange={(e) => setFieldValue('attendance_required', e.target.checked)}
                          style={{ border: 'none', marginBottom: 0, paddingInline: 0 }}
                        />
                        {touched.attendance_required && errors.attendance_required && (
                          <div className="error-message text-danger fw-light ps-3 pt-1">
                            {errors.attendance_required}
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <CustomButton
                        type="submit"
                        text="Update"
                        className='min-width-180 text-uppercase'
                        loading={updateEventMutation.isPending}
                        disabled={updateEventMutation.isPending}
                      />
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </Col>
        </Row>
      </div>
    </section>
  );
};

export default withFilters(withModal(EventEdit));

import { Navigate, Route, Routes } from 'react-router-dom';

import AdminLogin from './Auth/AdminLogin';
import ForgetPassword from './Auth/ForgetPassword';
import ForgetPassword2 from './Auth/ForgetPassword2';
import ForgetPassword3 from './Auth/ForgetPassword3';
import Dashboard from './Dashboard/index';
import Notifications from './Notifications';
import QueryManagement from './QueryManagement';
import QueryDetails from './QueryManagement/QueryDetails';
import PromoCodeManagement from './PromoCodeManagement';
import HeadCoachManagement from './HeadCoachManagement/index';
import HeadCoachView from './HeadCoachManagement/HeadCoachView';
import AssistantCoachView from './HeadCoachManagement/AssistantCoachView';
import StudentDetailsView from './HeadCoachManagement/StudentDetailsView';
import EventView from './HeadCoachManagement/EventView';
import EventEdit from './HeadCoachManagement/EventEdit';
import SubscriptionLogs from './SubscriptionLogs';
import SubscriptionPlan from './SubscriptionLogs/SubscriptionPlan';
import SubscriptionDetails from './SubscriptionLogs/SubscriptionDetails';
import SubscriptionEdit from './SubscriptionLogs/SubscriptionEdit';
import SubscriptionAdd from './SubscriptionLogs/SubscriptionAdd';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="head-coach-management" element={<HeadCoachManagement />} />
      <Route path="head-coach-management/:id" element={<HeadCoachView />} />
      <Route path="head-coach-management/:id/assistant-coach-management/:id" element={<AssistantCoachView />} />
      <Route path="head-coach-management/:id/student-details/:id" element={<StudentDetailsView />} />
      <Route path="head-coach-management/:id/event-details/:id" element={<EventView />} />
      <Route path="head-coach-management/:id/event-details/:id/edit" element={<EventEdit />} />
      <Route path="query-management" element={<QueryManagement />} />
      <Route path="query-management/:id" element={<QueryDetails />} />
      <Route path="promo-code-Management" element={<PromoCodeManagement />} />
      <Route path="subscription-logs" element={<SubscriptionLogs />} />
      <Route path="subscription-logs/subscription-plan" element={<SubscriptionPlan />} />
      <Route path="subscription-logs/subscription-plan/add" element={<SubscriptionAdd />} />
      <Route path="subscription-logs/subscription-plan/:id" element={<SubscriptionDetails />} />
      <Route path="subscription-logs/subscription-plan/edit/:id" element={<SubscriptionEdit />} />
      <Route path="*" element={<Navigate to="/admin/dashboard" />} />
    </Routes>
  );
};

export default AdminRoutes;

export {
  AdminLogin,
  Dashboard,
  ForgetPassword,
  ForgetPassword2,
  ForgetPassword3,
  Notifications,
  QueryManagement,
  QueryDetails,
};

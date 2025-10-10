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
import LoaderRiggerManagement from './LoaderRiggerManagement';
import LoaderRiggerDetails from './LoaderRiggerManagement/LoaderRiggerDetails';

// import HeadCoachManagement from './Loader /RiggerManagement'
// import AssistantCoachView from './LoaderRiggerManagement/_AssistantCoachView';
// import StudentDetailsView from './LoaderRiggerManagement/_StudentDetailsView';
// import EventView from './LoaderRiggerManagement/_EventView';
// import EventEdit from './LoaderRiggerManagement/_EventEdit';
import SubscriptionLogs from './SubscriptionLogs';
import SubscriptionPlan from './SubscriptionLogs/SubscriptionPlan';
import SubscriptionDetails from './SubscriptionLogs/SubscriptionDetails';
import SubscriptionEdit from './SubscriptionLogs/SubscriptionEdit';
import SubscriptionAdd from './SubscriptionLogs/SubscriptionAdd';
import PalltetDetails from './LoaderRiggerManagement/PalltetDetails';
import IncidentDetails from './LoaderRiggerManagement/IncidentDetails';
import LoaderRiggerAdd from './LoaderRiggerManagement/LoaderRiggerAdd';
import PrivateCompanyManagement from './PrivateCompanyManagement';
import PrivateCompanyManagementDetails from './PrivateCompanyManagement/privateCompanyManagementDetails';
import PrivateCompanyAccountRequest from './PrivateCompanyManagement/PrivateCompanyAccountRequest';
import PrivateCompanyAccountRequestDetail from './PrivateCompanyManagement/PrivateCompanyAccountRequestDetail';
import ShipyardUserManagement from './ShipyardUserManagement';
import ShipyardUserManagementDetails from './ShipyardUserManagement/ShipyardUserManagementDetails';
import ShipyardUserManagementAdd from './ShipyardUserManagement/ShipyardUserManagementAdd';
import SubAdminManagement from './SubAdminManagement';
import SubAdminManagementAdd from './SubAdminManagement/SubAdminManagementAdd';
import SubAdminManagementEdit from './SubAdminManagement/SubAdminManagementEdit';
import SubAdminManagementDetails from './SubAdminManagement/SubAdminManagementDetails';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route
        path="loader-Rigger-management"
        element={<LoaderRiggerManagement />}
      />
      <Route
        path="loader-Rigger-management/:id"
        element={<LoaderRiggerDetails />}
      />
      {/* <Route path="loader-Rigger-management/:id/assistant-coach-management/:id" element={<AssistantCoachView />} />
      <Route path="loader-Rigger-management/:id/student-details/:id" element={<StudentDetailsView />} />
      <Route path="loader-Rigger-management/:id/event-details/:id" element={<EventView />} />
      <Route path="loader-Rigger-management/:id/event-details/:id/edit" element={<EventEdit />} /> */}
      <Route path="query-management" element={<QueryManagement />} />
      <Route path="query-management/:id" element={<QueryDetails />} />
      <Route path="promo-code-Management" element={<PromoCodeManagement />} />
      <Route path="subscription-logs" element={<SubscriptionLogs />} />
      <Route
        path="subscription-logs/subscription-plan"
        element={<SubscriptionPlan />}
      />
      <Route
        path="subscription-logs/subscription-plan/add"
        element={<SubscriptionAdd />}
      />
      <Route
        path="subscription-logs/subscription-plan/:id"
        element={<SubscriptionDetails />}
      />
      <Route
        path="subscription-logs/subscription-plan/edit/:id"
        element={<SubscriptionEdit />}
      />

      <Route
        path="loader-Rigger-management/:id/pallet-logs/:id"
        element={<PalltetDetails />}
      />
      <Route
        path="loader-Rigger-management/add"
        element={<LoaderRiggerAdd />}
      />

      <Route
        path="loader-Rigger-management/:id/incident-logs/:id"
        element={<IncidentDetails />}
      />

      <Route
        path="private-company-management"
        element={<PrivateCompanyManagement />}
      />
      <Route
        path="private-company-management/:id"
        element={<PrivateCompanyManagementDetails />}
      />

      <Route
        path="private-company-management/account-request"
        element={<PrivateCompanyAccountRequest />}
      />
      <Route
        path="private-company-management/:id/pallet-logs/:id"
        element={<PalltetDetails />}
      />
      <Route
        path="private-company-management/account-request/:id"
        element={<PrivateCompanyAccountRequestDetail />}
      />

      <Route
        path="shipyard-user-management"
        element={<ShipyardUserManagement />}
      />

      <Route
        path="shipyard-user-management/:id"
        element={<ShipyardUserManagementDetails />}
      />

      <Route
        path="shipyard-user-management/:id/pallet-logs/:id"
        element={<PalltetDetails />}
      />

      <Route
        path="shipyard-user-management/add"
        element={<ShipyardUserManagementAdd />}
      />

      <Route path="sub-admin-management" element={<SubAdminManagement />} />

      <Route
        path="sub-admin-management/:id"
        element={<SubAdminManagementDetails />}
      />

      <Route
        path="sub-admin-management/add"
        element={<SubAdminManagementAdd />}
      />

      <Route
        path="sub-admin-management/edit/:id"
        element={<SubAdminManagementEdit />}
      />

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

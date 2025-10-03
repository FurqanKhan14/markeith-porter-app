import { useQuery } from '@tanstack/react-query';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import User from '../../../assets/images/dash-user.svg?react';
import Receivable from '../../../assets/images/receivable.svg?react';
import CustomSelect from '../../../Components/Common/FormElements/SelectInput';
import withModal from '../../../HOC/withModal';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { lineGraphOptions } from '../../../Mocks/MockData';
import {
  getDashboardData,
  getEarningChart,
  getUserChart,
} from '../../../Services/Admin/Dashboard';
import useThemeStore from '../../../Stores/ThemeStore';
import { themeDictionary } from '../../../Utils/Constants/ColorConstants';
import { dateRangeSelectOptions } from '../../../Utils/Constants/SelectOptions';

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler
);

const Dashboard = ({ showModal }) => {
  usePageTitle('Dashboard');
  const { theme } = useThemeStore();
  const navigate = useNavigate();

  const [userChartType, setUserChartType] = useState('yearly');
  const [earningChartType, setEarningChartType] = useState('yearly');
  const [linegraphStyling, setLineGraphStyling] = useState({});
  useEffect(() => {
    const graphStyling = {
      borderColor: '',
      pointBorderColor: '',
      backgroundColor: '',
    };
    graphStyling.borderColor = themeDictionary[theme][0];
    graphStyling.pointBorderColor = themeDictionary[theme][1];
    graphStyling.backgroundColor = `${themeDictionary[theme][0]}55`;
    setLineGraphStyling(graphStyling);
  }, [theme]);

  const handleDateRangeSelect = (graph, v) => {
    if (graph === 'totalUsers') setUserChartType(v.target.value);
    if (graph === 'totalEarning') setEarningChartType(v.target.value);
  };

  // Get Dashboard Card Data
  const { data: cardData, isLoading: cardDataLoading } = useQuery({
    queryKey: ['cardData', 'card'],
    queryFn: getDashboardData,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // Get Charts Data based on selected type
  

  // Reusable Chart Component
  const renderChart = (title, chartData, chartType, handleChange) => {
    return (
      <div className="d-card chart-padding mt-3">
        <div className="d-flex justify-content-between mb-3">
          <h4 className="d-card-title">{title}</h4>
          <CustomSelect
            name="Monthly"
            options={dateRangeSelectOptions}
            firstIsLabel={false}
            className="gray"
            onChange={(e) => handleChange(chartType, e)}
            value={userChartType}
          />
        </div>
        <div style={{ height: 600 }} className="dashboardChart">
          {/* <Line
            data={{
              labels: chartData?.map((item) => item[0]),
              datasets: [
                {
                  data: chartData?.map((item) => item[1]),
                  borderRadius: 50,
                  tension: 0.4,
                  pointRadius: 0,
                  pointHoverRadius: 6,
                  pointBorderWidth: 5,
                  pointHoverBorderWidth: 5,
                  pointBackgroundColor: '#fff',
                  borderWidth: 2,
                  fill: { target: 'origin' },
                  ...linegraphStyling,
                },
              ],
            }}
            options={lineGraphOptions}
          /> */}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2 className="screen-title d-inline-block">Dashboard</h2>
      <button className='btn btn-primary'>Testing Button </button>
      <div className="row">
        <div className="col-12 col-sm-6 col-xxl-3 mb-4 mb-xxl-0">
          <div className="d-card chart-padding">
            <div className="d-flex gap-3 gap-md-3">
              <div className="dash-icon-wrapper">
                <User className="dash-icon user" />
              </div>
              <div className="glance-info-text">
                <h6>New Users</h6>
                <h4>{cardData?.users}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-xxl-3 mb-4 mb-xxl-0">
          <div className="d-card chart-padding">
            <div className="d-flex gap-3 gap-md-3">
              <div className="dash-icon-wrapper">
                <Receivable className="dash-icon" />
              </div>
              <div className="glance-info-text">
                <h6>Total Earnings</h6>
                <h4>${cardData?.earnings}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {renderChart(
        'Total Users',
        userChart,
        'totalUsers',
        handleDateRangeSelect
      )}
      {renderChart(
        'Total Earnings',
        earningChart,
        'totalEarning',
        handleDateRangeSelect
      )}
    </div>
  );
};

export default withModal(Dashboard);

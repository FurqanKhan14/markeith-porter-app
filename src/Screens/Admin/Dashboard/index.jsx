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
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import User from '../../../assets/images/dash-user.svg?react';
import Receivable from '../../../assets/images/receivable.svg?react';
import CustomSelect from '../../../Components/Common/FormElements/SelectInput';
import StatsCard from '../../../Components/Common/StatsCard';
import withModal from '../../../HOC/withModal';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import {
  getDashboardData,
  getEarningChart,
  getUserChart,
} from '../../../Services/Admin/Dashboard';
import useThemeStore from '../../../Stores/ThemeStore';
import { themeDictionary } from '../../../Utils/Constants/ColorConstants';
import { dateRangeSelectOptions } from '../../../Utils/Constants/SelectOptions';
import { Col, Row } from 'react-bootstrap';

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
  const [userChartData, setUserChartData] = useState(null);
  const [earningChartData, setEarningChartData] = useState(null);

  useEffect(() => {
    // Update chart colors based on theme
    if (userChartData) {
      const updatedUserChart = JSON.parse(JSON.stringify(userChartData));
      updatedUserChart.datasets[0].backgroundColor = [
        themeDictionary[theme][0],
        themeDictionary[theme][1],
      ];
      setUserChartData(updatedUserChart);
    }
    if (earningChartData) {
      const updatedEarningChart = JSON.parse(JSON.stringify(earningChartData));
      updatedEarningChart.datasets[0].backgroundColor = [
        themeDictionary[theme][0],
        themeDictionary[theme][1],
      ];
      setEarningChartData(updatedEarningChart);
    }
  }, [theme, userChartData, earningChartData]);

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
  const { data: userChart } = useQuery({
    queryKey: ['userChart', userChartType],
    queryFn: () => getUserChart(userChartType),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: earningChart } = useQuery({
    queryKey: ['earningChart', earningChartType],
    queryFn: () => getEarningChart(earningChartType),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // Update chart data when it changes
  useEffect(() => {
    if (userChart) {
      setUserChartData(userChart);
    }
  }, [userChart]);

  useEffect(() => {
    if (earningChart) {
      setEarningChartData(earningChart);
    }
  }, [earningChart]);

  // Reusable Chart Component
  const renderChart = (title, chartData, chartType, handleChange) => {
    if (!chartData) return null;
    
    return (
      <div className="d-card chart-padding mt-3">
        <div className="d-flex justify-content-between mb-3">
          <div className="flex-grow-1">
            <h4 className="d-card-title flex-grow-1">{title}</h4>
          </div>
          <div className="flex-shrink-0">
            <CustomSelect
              name="Monthly"
              options={dateRangeSelectOptions}
              firstIsLabel={false}
              className="gray"
              onChange={(e) => handleChange(chartType, e)}
              value={userChartType}
            />
          </div>
        </div>
        <div style={{ height: 600 }} className="dashboardChart">
          <Bar
            data={chartData}
            options={chartData.options}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2 className="screen-title d-inline-block">Dashboard</h2>
      
      {/* Stats Cards using data from getDashboardData service */}
      <Row className="mb-4">
        {cardData?.map((card) => (
          <Col key={card.id} xs={12} md={6} xl={4} xxl={3} className="mb-4 mb-xxl-0">
            <StatsCard item={card} />
          </Col>
        ))}
      </Row>

      {renderChart(
        'Total Users',
        userChartData,
        'totalUsers',
        handleDateRangeSelect
      )}
      {renderChart(
        'Total Earnings',
        earningChartData,
        'totalEarning',
        handleDateRangeSelect
      )}
    </div>
  );
};

export default withModal(Dashboard);

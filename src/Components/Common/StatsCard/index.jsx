import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowUp, 
  faArrowDown, 
  faDollarSign, 
  faUsers, 
  faChartLine,
  faUser,
  faShoppingCart,
  faEye
} from '@fortawesome/free-solid-svg-icons';
import './style.css';

// Icon mapping for common icons
const iconMap = {
  faDollarSign,
  faUsers,
  faChartLine,
  faUser,
  faShoppingCart,
  faEye
};

const StatsCard = ({ item }) => {
  // Function to get the icon
  const getIcon = (iconName) => {
    if (typeof iconName === 'string') {
      // Check if it's a FontAwesome icon name
      if (iconName.startsWith('fa') && iconMap[iconName]) {
        return iconMap[iconName];
      }
      // If it's a string but not a known FontAwesome icon, return null
      return null;
    }
    return null;
  };

  const icon = getIcon(item.image);

  return (
    <Card className="card-dashboard flex-grow-1">
      <Card.Body>
        <div className="align-items-center d-flex">
          <div className="flex-grow-1">
            <Card.Title as="h4" className="mb-2">{item.text}</Card.Title>
            <Card.Title as="h3" className="mb-0">{item.number}</Card.Title>
          </div>
          <div className="flex-shrink-0 stats-icon-wrapper">
            {icon ? (
              <FontAwesomeIcon 
                icon={icon} 
                alt="Card Icon" 
                className="card-icon"
                style={{ fontSize: '2rem', color: '#2A8209' }}
              />
            ) : (
              <img src={item.image} alt="Card Icon" />
            )}
          </div>
        </div>
      </Card.Body>
      <Card.Footer>
        <Card.Text>
          <span>{item.increase} % </span>
          {parseFloat(item.increase) > 0 ? (
            <FontAwesomeIcon
              icon={faArrowUp}
              className="mx-1 text-lightGreen"
            />
          ) : (
            <FontAwesomeIcon
              icon={faArrowDown}
              className="mx-1 text-primary"
            />
          )}
          {item.sinceWeek}
        </Card.Text>
      </Card.Footer>
    </Card>
  );
};

export default StatsCard;
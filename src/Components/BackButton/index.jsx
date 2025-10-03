import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router';
import './style.css';

const BackButton = ({ handleBack, url = '' }) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (url) {
      navigate(url);
    } else {
      navigate(-1);
    }
  };

  return (
    <button className="back-button" onClick={handleBack || goBack}>
      <BsArrowLeft />
    </button>
  );
};

export default BackButton;

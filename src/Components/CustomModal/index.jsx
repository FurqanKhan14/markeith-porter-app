import React from 'react';
import { Modal } from 'react-bootstrap';
import { IoCloseCircle, IoCloseOutline } from 'react-icons/io5';
import { PulseLoader } from 'react-spinners';
import CustomButton from '../Common/CustomButton';
import './style.css';
import { BsCheckCircleFill, BsQuestionCircleFill } from 'react-icons/bs';

const CustomModal = ({
  background,
  show,
  close,
  size,
  fullscreen,
  contentClassName,
  hideClose,
  showImage,
  variant, // prop to handle image types
  showTitle,
  title,
  children,
  description,
  note,
  btntext,
  action,
  btn1Text,
  btn2Text,
  disableClick,
  style,
}) => {
  const renderImage = (type) => {
    switch (type) {
      case 'success':
        return (
          <div className="rounded-circle d-flex justify-content-center">
            <BsCheckCircleFill size={100} color="#34B704" />
          </div>
        );
      case 'error':
        return (
          <div className="rounded-circle d-flex justify-content-center">
            <IoCloseCircle size={100} color="red" />
          </div>
        );
      case 'info':
        return (
          <div className="rounded-circle d-flex justify-content-center">
            <BsQuestionCircleFill size={100} color="#34B704" />
          </div>
        );
      default:
        return (
          <div className="rounded-circle d-flex justify-content-center">
            <BsQuestionCircleFill size={100} color="#34B704" />
          </div>
        );
    }
  };

  return (
    <Modal
      className={`${background ? 'modal-lg' : ''}`}
      show={show}
      centered
      onHide={close}
      size={size}
      fullscreen={fullscreen}
      contentClassName={contentClassName}
    >
      <div className={`${background}`}>
        {!hideClose && (
          <div className="d-flex justify-content-end">
            <button
              className="closeButton notButton rounded-circle beechMein mt-2 me-2 p-1 kaata"
              onClick={close}
            >
              <IoCloseOutline size={20} color="red" />
            </button>
          </div>
        )}
      </div>
      <Modal.Body
        className={`${!children && 'text-center'} `}
        style={style}
      >
        {children ? (
          <div className="modalInputs">
            {showImage && renderImage(variant)}
            {showTitle && (
              <div className="pt-3 text-center">
                <h4 className="modalTitle">{title}</h4>
              </div>
            )}
            {children}
          </div>
        ) : (
          <>
          
            <div className="modal-icon-wrapper">
              {renderImage(variant)}
            </div>
            {title && (
            <h3 className="modal-title">
              {title}
            </h3>
            )}
            {description && (
              <p className="modal-text">
                {description}
              </p>
            )}
            {note && <p className="modal-note">{note}</p>}
            </>
        )}
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0 pb-4 text-center d-flex justify-content-center flex-column flex-sm-row align-items-stretch gap-2">
        {variant === 'success' ? (
          
            <CustomButton
              type="button"
              className="modal-btn"
              text={btntext || 'Ok'}
              onClick={action ? action : close}
            />
        ) : (
          <>
            {variant === 'error' ? (
              <div className="beechMein gap-2 gap-sm-3 flex-wrap">
                <CustomButton
                  type="button"
                  variant={'primary'}
                  text={btn1Text || 'Ok'}
                  onClick={action ?? close}
                />
              </div>
            ) : (
              <>
                {!disableClick ? (
                  <>
                    <CustomButton
                      type="button"
                      text={btn1Text || 'Yes'}
                      variant={'primary'}
                      onClick={action}
                    />
                    <CustomButton
                      type="button"
                      text={btn2Text || 'No'}
                      variant={'outline-primary'}
                      onClick={close}
                    />
                  </>
                ) : (
                  <PulseLoader size={11} className="modalLoader" />
                )}
              </>
            )}
          </>
        )}

      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;

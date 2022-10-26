import { ThreeDots } from 'react-loader-spinner';
import Modal from 'react-modal';
import { deletePostById, sharePost } from '../../services/axiosService';

const modalStyles = {
    content: {
      height: 'auto',
      minHeight: '262px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#333333',
      borderRadius: '50px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    h2: {
      maxWidth: '360px',
      fontSize: '34px',
      fontWeight: '700',
      fontFamily: '"Lato", sans-serif',
      textAlign: 'center',
      color: '#ffffff',
      marginBottom: '40px'
    },
    cancelButton: {
      width: '134px',
      height: '37px',
      marginRight: '27px',
      backgroundColor: '#ffffff',
      fontSize: '18px',
      fontWeight: '700',
      fontFamily: '"Lato", sans-serif',
      color: '#1877F2',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    confirmButton: {
      width: '134px',
      height: '37px',
      backgroundColor: '#1877F2',
      fontSize: '18px',
      fontWeight: '700',
      fontFamily: '"Lato", sans-serif',
      color: '#ffffff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
};

Modal.setAppElement('.root');

export default function ConfirmationModal ({
    obj,
    modalIsOpen,
    setModalIsOpen,
    isDisable,
    setIsDisable,
    action,
    message,
    cancelText,
    confirmText 
}) {

    function closeModal() {
        setModalIsOpen(false);
    }

    function performModalAction () {
        switch (action) {
            case "share":
                share();
                break;
            default:
                deletePost();
        }

            
    }

    function deletePost() {
      setIsDisable(true);
  
      deletePostById(obj.id)
      .then(() => {
        closeModal();
        setIsDisable(false);
      })
      .catch((error) => {
        alert('Could not delete the post');
        console.log(error);
        closeModal();
        setIsDisable(false);
      });
    }

    function share() {
      setIsDisable(true);
  
      sharePost(obj.id)
      .then(() => {
        closeModal();
        setIsDisable(false);
      })
      .catch((error) => {
        alert('Could not delete the post');
        console.log(error);
        closeModal();
        setIsDisable(false);
      });
    }

    return (
        <>
            <Modal
              isOpen={modalIsOpen}
              style={modalStyles}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
            >
              <h2 style={modalStyles.h2}>{message}</h2>
              <div style={{ display: 'flex' }}>
                {
                  isDisable ? 
                    <>
                      <button style={modalStyles.cancelButton} disabled>
                        <ThreeDots
                          height="20"
                          width="50"
                          radius="9"
                          color="#1877F2"
                          ariaLabel="three-dots-loading"
                        />
                      </button>
                      <button style={modalStyles.confirmButton} disabled>
                        <ThreeDots
                            height="20"
                            width="50"
                            radius="9"
                            color="#ffffff"
                            ariaLabel="three-dots-loading"
                          />
                      </button>
                    </> :
                    <>
                      <button style={modalStyles.cancelButton} onClick={closeModal}>{cancelText}</button>
                      <button style={modalStyles.confirmButton} onClick={performModalAction}>{confirmText}</button>
                    </>
                }
              </div>
            </Modal>
        </>
    )
}
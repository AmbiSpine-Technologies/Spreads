import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment'; 
import { acceptFriendRequest } from '../../../actions/chatAction';
import { fetchNotifications } from '../../../actions/commentAction'; 

const RequestModal = () => {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector(state => state.notification);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading notifications</div>;

  const handleAccept = async (requestId) => {
    try {
      await dispatch(acceptFriendRequest(requestId, true));
      dispatch(fetchNotifications()); // Refetch notifications after accepting
    } catch (error) {
      // Handle error if needed
    }
  };
  
  const handleReject = async (requestId) => {
    try {
      await dispatch(acceptFriendRequest(requestId, false));
      dispatch(fetchNotifications()); // Refetch notifications after rejecting
    } catch (error) {
      // Handle error if needed
    }
  };
  
  const handleClearAll = () => {
    // dispatch(clearAllNotifications());
  };

  return (
    <div className="modal-dialog modal-dialog-centered" style={{ width: "600px" }}>
      <div className="modal-content">
        <div className="d-flex p-2 justify-content-between border-bottom">
          <h3 className="fs-5 ms-2" id="exampleModalLabel">Requests</h3>
          <button
            type="button"
            className="btn-close btn-sm me-2"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          {notifications?.length ? (
            notifications.map(notification => (
              <div key={notification._id} className="d-flex mb-3">
                <img
                  src={notification?.sender?.avatar || "https://i.pinimg.com/736x/07/c9/f4/07c9f488cb6381d020a8397fe112c2cc.jpg"}
                  alt={notification?.sender?.name}
                  width="50px"
                  height="50px"
                  className="rounded-circle border"
                />
                <div className='ms-3'>
                  <span>{notification?.sender?.name} sent you a <strong>friend request</strong></span> <br />
                  <span className="text-muted">{moment(notification?.createdAt).fromNow()}</span>
                  <div className="text-center mt-2">
                    <button
                      className="btn btn-outline-danger btn-sm me-2"
                      onClick={() => handleReject(notification._id)}
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleAccept(notification._id)}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No notifications</p>
          )}
        </div>
        {notifications?.length > 0 && (
          <div className="text-center border-top pt-2">
            <button
              type="button"
              className="btn btn-link"
              onClick={handleClearAll}
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestModal;

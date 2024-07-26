import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMeetings, deleteMeeting } from '../../store/slices/meetingSlice';
import { logout } from '../../store/slices/authSlice';
import MeetingModal from './MeetingModal';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const meetings = useSelector((state) => Array.isArray(state.meetings.meetings) ? state.meetings.meetings : []);
  const meetingStatus = useSelector((state) => state.meetings.status);
  const error = useSelector((state) => state.meetings.error);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMeetingId, setCurrentMeetingId] = useState(null);

  useEffect(() => {
    if (meetingStatus === 'idle') {
      dispatch(fetchMeetings());
    }
  }, [meetingStatus, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteMeeting(id));
  };

  const handleEdit = (id) => {
    setCurrentMeetingId(id);
    setIsModalOpen(true);
  };

  const handleAddMeeting = () => {
    setCurrentMeetingId(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  let content;

  if (meetingStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (meetingStatus === 'succeeded') {
    content = (
      <table className={styles.meetingTable}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting) => (
            <tr key={meeting.id}>
              <td>{meeting.title}</td>
              <td>{meeting.description}</td>
              <td>{meeting.date}</td>
              <td>{meeting.startTime}</td>
              <td>{meeting.endTime}</td>
              <td>
                <button onClick={() => handleEdit(meeting.id)}>Edit</button>
                <button onClick={() => handleDelete(meeting.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (meetingStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <section>
      <h2>Meetings</h2>
      <div className={styles.actionButtons}>
        <button className={styles.addButton} onClick={handleAddMeeting}>Add Meeting</button>
        <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </div>
      {content}
      <MeetingModal isOpen={isModalOpen} onClose={handleCloseModal} meetingId={currentMeetingId} />
    </section>
  );
};

export default Dashboard;

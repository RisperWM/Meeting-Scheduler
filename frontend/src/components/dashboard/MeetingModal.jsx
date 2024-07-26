import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMeeting, editMeeting, fetchMeetings } from '../../store/slices/meetingSlice';
import { useNavigate } from 'react-router-dom';
import styles from './MeetingModal.module.css';

const MeetingModal = ({ isOpen, onClose, meetingId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const meetings = useSelector((state) => state.meetings.meetings);
  const [meetingData, setMeetingData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    if (meetingId && meetings.length === 0) {
      dispatch(fetchMeetings());
    } else if (meetingId) {
      const existingMeeting = meetings.find((meeting) => meeting.id === parseInt(meetingId));
      if (existingMeeting) {
        setMeetingData(existingMeeting);
      }
    }
  }, [dispatch, meetingId, meetings]);

  const handleChange = (e) => {
    setMeetingData({
      ...meetingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (meetingId) {
      await dispatch(editMeeting({ id: meetingId, meetingData }));
    } else {
      await dispatch(addMeeting(meetingData));
    }
    onClose();
    navigate('/dashboard');
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <h4>{meetingId ? 'Edit Meeting' : 'Add Meeting'}</h4>
          <div>
            <label htmlFor="title">Title</label><br />
            <input type="text" id="title" name="title" value={meetingData.title} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="description">Description</label><br />
            <textarea id="description" name="description" value={meetingData.description} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="date">Date</label><br />
            <input type="date" id="date" name="date" value={meetingData.date} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="startTime">Start Time</label><br />
            <input type="time" id="startTime" name="startTime" value={meetingData.startTime} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="endTime">End Time</label><br />
            <input type="time" id="endTime" name="endTime" value={meetingData.endTime} onChange={handleChange} required />
          </div>
          <button type="submit">{meetingId ? 'Update' : 'Add'} Meeting</button>
        </form>
      </div>
    </div>
  );
};

export default MeetingModal;

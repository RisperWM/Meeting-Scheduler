const { Meeting } = require('../models');
const { Op } = require('sequelize');
const { format, parseISO } = require('date-fns');

exports.createMeeting = async (req, res) => {
  const { title, description, date, startTime, endTime } = req.body;
  const userId = req.user.id;

  try {
    if (!title || !date || !startTime || !endTime) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const formattedDate = format(parseISO(date), 'yyyy-MM-dd');
    const formattedStartTime = new Date(`1970-01-01T${startTime}Z`).toISOString().substring(11, 19);
    const formattedEndTime = new Date(`1970-01-01T${endTime}Z`).toISOString().substring(11, 19);

    const existingMeeting = await Meeting.findOne({
      where: {
        date: formattedDate,
        [Op.and]: [
          { startTime: { [Op.lt]: formattedEndTime } },
          { endTime: { [Op.gt]: formattedStartTime } },
        ],
        userId,
      },
    });

    if (existingMeeting) {
      return res.status(400).json({ message: 'Meeting time conflict' });
    }

    const meeting = await Meeting.create({ 
      title, 
      description, 
      date: formattedDate, 
      startTime: formattedStartTime, 
      endTime: formattedEndTime, 
      userId 
    });
    
    res.status(201).json(meeting);
  } catch (error) {
    console.error('Error creating meeting:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.findAll();

    res.json(meetings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateMeeting = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, startTime, endTime } = req.body;
  const userId = req.user.id;

  const meeting = await Meeting.findOne({ where: { id, userId } });
  if (!meeting) {
    return res.status(404).json({ message: 'Meeting not found' });
  }

  const existingMeeting = await Meeting.findOne({
    where: {
      id: { [Op.ne]: id },
      date,
      [Op.and]: [
        { startTime: { [Op.lt]: endTime } },
        { endTime: { [Op.gt]: startTime } },
      ],
      userId,
    },
  });

  if (existingMeeting) {
    return res.status(400).json({ message: 'Meeting time conflict' });
  }

  meeting.title = title;
  meeting.description = description;
  meeting.date = date;
  meeting.startTime = startTime;
  meeting.endTime = endTime;

  await meeting.save();
  res.json(meeting);
};

exports.deleteMeeting = async (req, res) => {
  const { id } = req.params;

  const meeting = await Meeting.findOne({ where: { id } });
  if (!meeting) {
    return res.status(404).json({ message: 'Meeting not found' });
  }

  await meeting.destroy();
  res.json({ message: 'Meeting deleted successfully' });
};

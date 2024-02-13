import Video from '../models/videoMode.js'

const addVideo = async (req, res) => {
    try {
      const { title, link, content } = req.body;
  
      const video = await Video.create({ title, link, content });
      if (!video) {
        return res.status(404).json({ error: 'Failed to create video' });
      }
      res.status(201).json({ message: 'Video created successfully', data: video });
    } catch (err) {
      console.error('Error:', err.message);
      res.status(500).json({ error: 'Internal server error', message: err.message });
    }
  }

  const deleteVideo = async (req, res) => {
    try {
      const { id } = req.body;
  
      const deletedVideo = await Video.findByIdAndDelete(id);
  
      if (!deletedVideo) {
        return res.status(404).json({ error: 'Video not found' });
      }
  
      res.status(200).json({ message: 'Video deleted successfully' });
    } catch (err) {
      console.error('Error:', err.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  const getVideos = async (req, res) => {
    try {
      const videos = await Video.find();
      res.status(200).json({ message: 'Got videos successfully', data: videos });
    } catch (err) {
      console.error('Error:', err.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  

export {addVideo, getVideos, deleteVideo}
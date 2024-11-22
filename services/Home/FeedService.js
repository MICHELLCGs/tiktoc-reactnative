import axios from 'axios';
import { API_URL } from '@env';

// Fetch videos from the API
export const fetchVideos = async () => {
  try {
    const response = await axios.get(`${API_URL}/videos`);
    return response.data;  // Devuelve la lista de videos
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];  // En caso de error, devuelve un array vacío
  }
};

// Fetch comments of a specific video (GET request)
export const fetchComments = async (videoId) => {
  try {
    const response = await axios.get(`${API_URL}/videos/${videoId}/comments`);
    return response.data;  // Devuelve los comentarios de ese video
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];  // En caso de error, devuelve un array vacío
  }
};

// Add a comment to a specific video (POST request)
export const addComment = async (videoId, comment) => {
  try {
    const response = await axios.post(`${API_URL}/videos/${videoId}/comments`, { comment });
    return response.data;  // Devuelve el comentario recién agregado
  } catch (error) {
    console.error('Error adding comment:', error);
    return null;  // En caso de error, devuelve null
  }
};
/*
export const fetchVideos = () => {
    return [
      {
        _id: '1',
        videoUrl: 'https://videos.pexels.com/video-files/8953675/8953675-uhd_1440_2560_30fps.mp4',
        user: 'Usuario 1',
        link: 'Link de la pelicula',
        Plataforma: 'Plataforma',
        sinopsis: 'Sinopsis corta de la pelicula #pelicula_1 #pelicula_2',
        comments: [],
        linkEnabled: false,
      },
      {
        _id: '2',
        videoUrl: 'https://videos.pexels.com/video-files/28792890/12478782_1080_1920_30fps.mp4',
        user: 'Usuario 3',
        link: 'Link de la pelicula',
        Plataforma: 'Plataforma',
        sinopsis: 'Sinopsis corta de la pelicula #pelicula_1 #pelicula_2',
        comments: [],
        linkEnabled: true,
      },
      {
        _id: '3',
        videoUrl: 'https://videos.pexels.com/video-files/16097756/16097756-hd_1080_1920_30fps.mp4',
        user: 'Usuario 4',
        link: 'Link de la pelicula',
        Plataforma: 'Plataforma',
        sinopsis: 'Sinopsis corta de la pelicula #pelicula_1 #pelicula_2',
        comments: [],
        linkEnabled: true,
      },
      {
        _id: '4',
        videoUrl: 'https://videos.pexels.com/video-files/11280923/11280923-hd_1080_1920_60fps.mp4',
        user: 'Usuario 5',
        link: 'Link de la pelicula',
        Plataforma: 'Plataforma',
        sinopsis: 'Sinopsis corta de la pelicula #pelicula_1 #pelicula_2',
        comments: [],
        linkEnabled: true,
      },
    ];
  };
  */
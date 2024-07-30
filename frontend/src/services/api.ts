import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

export const fetchCourses = () => axios.get(`${API_URL}/courses`);
export const createCourse = (courseData: any) => axios.post(`${API_URL}/courses/newCourse`, courseData);
export const updateCourse = (id: string, courseData: any) => axios.put(`${API_URL}/courses/${id}`, courseData);
export const deleteCourse = (id: string) => axios.delete(`${API_URL}/courses/${id}`);

export const createModule = (courseId: string, moduleData: any) => axios.post(`${API_URL}/modules/${courseId}`, moduleData);
export const updateModule = (courseId: string, moduleId: string, moduleData: any) => axios.put(`${API_URL}/modules/${courseId}/${moduleId}`, moduleData);
export const deleteModule = (courseId: string, moduleId: string) => axios.delete(`${API_URL}/modules/${courseId}/${moduleId}`);

export const createTopic = (courseId: string, moduleId: string, topicData: any) => axios.post(`${API_URL}/topics/${courseId}/${moduleId}`, topicData);
export const updateTopic = (courseId: string, moduleId: string, topicId: string, topicData: any) => axios.put(`${API_URL}/topics/${courseId}/${moduleId}/${topicId}`, topicData);
export const deleteTopic = (courseId: string, moduleId: string, topicId: string) => axios.delete(`${API_URL}/topics/${courseId}/${moduleId}/${topicId}`);

export const createContent = (courseId: string, moduleId: string, topicId: string, contentData: any) => axios.post(`${API_URL}/content/${courseId}/${moduleId}/${topicId}`, contentData);
export const updateContent = (courseId: string, moduleId: string, topicId: string, contentId: string, contentData: any) => axios.put(`${API_URL}/content/${courseId}/${moduleId}/${topicId}/${contentId}`, contentData);
export const deleteContent = (courseId: string, moduleId: string, topicId: string, contentId: string) => axios.delete(`${API_URL}/content/${courseId}/${moduleId}/${topicId}/${contentId}`);

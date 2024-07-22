
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

export const fetchCourses = () => axios.get(`${API_URL}/courses`);
export const createCourse = (courseData: any) => axios.post(`${API_URL}/courses`, courseData);
export const updateCourse = (id: string, courseData: any) => axios.put(`${API_URL}/courses/${id}`, courseData);
export const deleteCourse = (id: string) => axios.delete(`${API_URL}/courses/${id}`);

export const createModule = (courseId: string, moduleData: any) => axios.post(`${API_URL}/courses/${courseId}/modules`, moduleData);
export const updateModule = (courseId: string, moduleId: string, moduleData: any) => axios.put(`${API_URL}/courses/${courseId}/modules/${moduleId}`, moduleData);
export const deleteModule = (courseId: string, moduleId: string) => axios.delete(`${API_URL}/courses/${courseId}/modules/${moduleId}`);

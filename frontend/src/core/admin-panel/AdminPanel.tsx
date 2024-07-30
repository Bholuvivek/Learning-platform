import React, { useEffect, useState } from 'react';
import { fetchCourses, createCourse, updateCourse, deleteCourse, createModule, updateModule, deleteModule, createTopic, updateTopic, deleteTopic, createContent, updateContent, deleteContent } from '../../services/api';

import { Box, Button, Typography, Paper} from '@mui/material';
import ContentForm from './component/ContentForm';
import CourseForm from './component/CourseForm';
import ModuleForm from './component/ModuleForm';
import TopicForm from './component/TopicForm';

const AdminPanel: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [selectedModule, setSelectedModule] = useState<any | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<any | null>(null);

  useEffect(() => {
    fetchCourses().then((response: { data: React.SetStateAction<any[]>; }) => setCourses(response.data));
  }, []);

  const handleCreateCourse = async (courseData: any) => {
    const response = await createCourse(courseData);
    setCourses([...courses, response.data]);
  };

  const handleUpdateCourse = async (courseId: string, courseData: any) => {
    const response = await updateCourse(courseId, courseData);
    setCourses(courses.map(course => course._id === courseId ? response.data : course));
  };

  const handleDeleteCourse = async (courseId: string) => {
    await deleteCourse(courseId);
    setCourses(courses.filter(course => course._id !== courseId));
  };

  const handleCreateModule = async (moduleData: any) => {
    if (selectedCourse) {
      const response = await createModule(selectedCourse._id, moduleData);
      setSelectedCourse(response.data);
      setCourses(courses.map(course => course._id === selectedCourse._id ? response.data : course));
    }
  };

  const handleUpdateModule = async (moduleId: string, moduleData: any) => {
    if (selectedCourse) {
      const response = await updateModule(selectedCourse._id, moduleId, moduleData);
      setSelectedCourse(response.data);
      setCourses(courses.map(course => course._id === selectedCourse._id ? response.data : course));
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    if (selectedCourse) {
      const response = await deleteModule(selectedCourse._id, moduleId);
      setSelectedCourse(response.data);
      setCourses(courses.map(course => course._id === selectedCourse._id ? response.data : course));
    }
  };

  const handleCreateTopic = async (topicData: any) => {
    if (selectedCourse && selectedModule) {
      const response = await createTopic(selectedCourse._id, selectedModule._id, topicData);
      setSelectedModule(response.data);
      setCourses(courses.map(course => course._id === selectedCourse._id ? response.data : course));
    }
  };

  const handleUpdateTopic = async (topicId: string, topicData: any) => {
    if (selectedCourse && selectedModule) {
      const response = await updateTopic(selectedCourse._id, selectedModule._id, topicId, topicData);
      setSelectedModule(response.data);
      setCourses(courses.map(course => course._id === selectedCourse._id ? response.data : course));
    }
  };

  const handleDeleteTopic = async (topicId: string) => {
    if (selectedCourse && selectedModule) {
      const response = await deleteTopic(selectedCourse._id, selectedModule._id, topicId);
      setSelectedModule(response.data);
      setCourses(courses.map(course => course._id === selectedCourse._id ? response.data : course));
    }
  };

  const handleCreateContent = async (contentData: any) => {
    if (selectedCourse && selectedModule && selectedTopic) {
      const response = await createContent(selectedCourse._id, selectedModule._id, selectedTopic._id, contentData);
      setSelectedTopic(response.data);
      setCourses(courses.map(course => course._id === selectedCourse._id ? response.data : course));
    }
  };

  const handleUpdateContent = async (contentId: string, contentData: any) => {
    if (selectedCourse && selectedModule && selectedTopic) {
      const response = await updateContent(selectedCourse._id, selectedModule._id, selectedTopic._id, contentId, contentData);
      setSelectedTopic(response.data);
      setCourses(courses.map(course => course._id === selectedCourse._id ? response.data : course));
    }
  };

  const handleDeleteContent = async (contentId: string) => {
    if (selectedCourse && selectedModule && selectedTopic) {
      const response = await deleteContent(selectedCourse._id, selectedModule._id, selectedTopic._id, contentId);
      setSelectedTopic(response.data);
      setCourses(courses.map(course => course._id === selectedCourse._id ? response.data : course));
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Admin Panel</Typography>
      <CourseForm onSubmit={handleCreateCourse} />
      {courses.map(course => (
        <Paper key={course._id} elevation={3} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>{course.title}</Typography>
          <Button onClick={() => setSelectedCourse(course)}>Edit Course</Button>
          <Button onClick={() => handleDeleteCourse(course._id)}>Delete Course</Button>
          {selectedCourse && selectedCourse._id === course._id && (
            <Box>
              <ModuleForm onSubmit={handleCreateModule} />
              {course.modules.map((module: any) => (
                <Paper key={module._id} elevation={2} sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6" color="secondary">{module.title}</Typography>
                  <Button onClick={() => setSelectedModule(module)}>Edit Module</Button>
                  <Button onClick={() => handleDeleteModule(module._id)}>Delete Module</Button>
                  {selectedModule && selectedModule._id === module._id && (
                    <Box>
                      <TopicForm onSubmit={handleCreateTopic} />
                      {module.topics.map((topic: any) => (
                        <Paper key={topic._id} elevation={1} sx={{ p: 2, mb: 1 }}>
                          <Typography variant="h6" color="textSecondary">{topic.title}</Typography>
<Button onClick={() => setSelectedTopic(topic)}>Edit Topic</Button>
<Button onClick={() => handleDeleteTopic(topic._id)}>Delete Topic</Button>
{selectedTopic && selectedTopic._id === topic._id && (
<ContentForm onSubmit={handleCreateContent} />
)}
</Paper>
))}
</Box>
)}
</Paper>
))}
</Box>
)}
</Paper>
))}
</Box>
);
};

export default AdminPanel;

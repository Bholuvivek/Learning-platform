// src/components/AdminPanel.tsx
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CourseForm from './component/CourseForm';
import ModuleForm from './component/ModuleForm';
import { fetchCourses, deleteCourse, deleteModule  } from '../../services/api';
import { Course,Module } from '../types';

const AdminPanel: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showModuleForm, setShowModuleForm] = useState(false);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await fetchCourses();
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    loadCourses();
  }, []);

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setShowModuleForm(false);
  };

  const handleModuleClick = (module: Module) => {
    setSelectedModule(module);
    setShowModuleForm(true);
  };

  const handleCourseFormClose = () => {
    setShowCourseForm(false);
    setSelectedCourse(null);
  };

  const handleModuleFormClose = () => {
    setShowModuleForm(false);
    setSelectedModule(null);
  };

  const handleCreateCourse = () => {
    setShowCourseForm(true);
    setSelectedCourse(null);
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await deleteCourse(courseId);
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleDeleteModule = async (courseId: string, moduleId: string) => {
    try {
      await deleteModule(courseId, moduleId);
      setCourses(courses.map(course => {
        if (course._id === courseId) {
          return {
            ...course,
            modules: course.modules.filter(module => module._id !== moduleId),
          };
        }
        return course;
      }));
    } catch (error) {
      console.error('Error deleting module:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>
      <Button onClick={handleCreateCourse} variant="contained" color="primary">
        Create Course
      </Button>
      <Grid container spacing={2} mt={2}>
        {courses.map(course => (
          <Grid item xs={12} sm={6} md={4} key={course._id}>
            <Box border={1} padding={2} borderRadius={2}>
              <Typography variant="h6">{course.title}</Typography>
              <Button onClick={() => handleCourseClick(course)} variant="outlined" color="secondary">
                Manage Modules
              </Button>
              <Button onClick={() => handleDeleteCourse(course._id)} variant="outlined" color="error">
                Delete Course
              </Button>
              <Box mt={2}>
                {course.modules.map(module => (
                  <Box key={module._id} border={1} padding={2} borderRadius={2} mt={2}>
                    <Typography variant="subtitle1">{module.title}</Typography>
                    <Button onClick={() => handleModuleClick(module)} variant="outlined" color="secondary">
                      Edit Module
                    </Button>
                    <Button onClick={() => handleDeleteModule(course._id, module._id)} variant="outlined" color="error">
                      Delete Module
                    </Button>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Course Form Dialog */}
      <Dialog open={showCourseForm} onClose={handleCourseFormClose}>
        <DialogTitle>{selectedCourse ? 'Edit Course' : 'Create Course'}</DialogTitle>
        <DialogContent>
          <CourseForm course={selectedCourse!} onClose={handleCourseFormClose} onSuccess={() => {
            handleCourseFormClose();
            // Refetch courses or update state
            fetchCourses().then(response => setCourses(response.data));
          }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCourseFormClose} color="secondary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Module Form Dialog */}
      {selectedCourse && (
        <Dialog open={showModuleForm} onClose={handleModuleFormClose}>
          <DialogTitle>{selectedModule ? 'Edit Module' : 'Create Module'}</DialogTitle>
          <DialogContent>
            <ModuleForm courseId={selectedCourse._id} module={selectedModule!} onClose={handleModuleFormClose} onSuccess={() => {
              handleModuleFormClose();
              // Refetch courses or update state
              fetchCourses().then(response => setCourses(response.data));
            }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModuleFormClose} color="secondary">Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default AdminPanel;

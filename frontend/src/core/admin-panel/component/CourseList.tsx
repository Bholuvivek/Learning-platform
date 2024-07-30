import React, { useState, useEffect } from 'react';
import { fetchCourses, createCourse, updateCourse, deleteCourse } from './api';
import CourseForm from './CourseForm';

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);

  useEffect(() => {
    fetchCourses().then((response) => setCourses(response.data));
  }, []);

  const handleCreate = (courseData: any) => {
    createCourse(courseData).then((response) => setCourses([...courses, response.data]));
  };

  const handleUpdate = (id: string, courseData: any) => {
    updateCourse(id, courseData).then((response) => {
      const updatedCourses = courses.map((course) => (course._id === id ? response.data : course));
      setCourses(updatedCourses);
    });
  };

  const handleDelete = (id: string) => {
    deleteCourse(id).then(() => {
      const filteredCourses = courses.filter((course) => course._id !== id);
      setCourses(filteredCourses);
    });
  };

  return (
    <div>
      <h2>Courses</h2>
      <CourseForm onSubmit={handleCreate} />
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            {course.title}
            <button onClick={() => setEditingCourse(course)}>Edit</button>
            <button onClick={() => handleDelete(course._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editingCourse && <CourseForm course={editingCourse} onSubmit={(data) => handleUpdate(editingCourse._id, data)} />}
    </div>
  );
};

export default CourseList;

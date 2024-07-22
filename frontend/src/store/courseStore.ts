// src/courseStore.ts
import { CourseTypeDataProps } from './types';
import { createStore } from 'zustand-x';

export interface CourseStore {
  courses: CourseTypeDataProps[];
  currentCourseId: number;
  setCurrentCourseId: (id: number) => void;
  downloadedVideos: Record<string, string>;
  downloadVideo: (videoId: string, url: string) => void;
  fetchCourses: () => Promise<void>;
}

export const courseStore = createStore('course')<CourseStore>(
  {
    courses: [],
    currentCourseId:Date.now(),
    downloadedVideos: {},
    setCurrentCourseId: () => {}, 
    downloadVideo: () => {}, 
    fetchCourses: async () => {},
  },
  {
    devtools: { enabled: true },
    persist: {
      enabled: true,
      name: 'CourseStore',
      getStorage: () => window.localStorage,
    },
  }
).extendActions((set) => ({
  setCurrentCourseId: (id: number) => {
    set.state({ currentCourseId: id });
  },
  downloadVideo: (videoId: string, url: string) => {
    set.state((state) => ({
      downloadedVideos: { ...state.downloadedVideos, [videoId]: url },
    }));
  },
  fetchCourses: async () => {
    const response = await fetch('../../../public/courses.json');
    const data: CourseTypeDataProps[] = await response.json();
    set.state({ courses: data });
  },
}));

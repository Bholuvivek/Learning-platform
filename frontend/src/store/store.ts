
import { createStore } from 'zustand-x';

interface Video {
  id: number;
  title: string;
  url: string;
}

interface Module {
  id: number;
  title: string;
  videos: Video[];
}

interface Course {
  id: number;
  title: string;
  modules: Module[];
}

interface LearningState {
  courses: Course[];
  currentCourseId: number | null;
  setCurrentCourseId: (id: number | null) => void;
  downloadedVideos: Record<string, string>;
  downloadVideo: (videoId: string, url: string) => void;
  fetchCourses: () => Promise<void>;
}

export const useLearningStore = createStore<LearningState>((set) => ({
  courses: [],
  currentCourseId: null,
  setCurrentCourseId: (id) => set({ currentCourseId: id }),
  downloadedVideos: {},
  downloadVideo: (videoId, url) => set((state) => ({
    downloadedVideos: { ...state.downloadedVideos, [videoId]: url },
  })),
  fetchCourses: async () => {
    const response = await fetch('/data/courses.json');
    const data: Course[] = await response.json();
    set({ courses: data });
  },
}));

import { createStore } from 'zustand-x';

interface Blog {
  id: number;
  title: string;
  content: string;
  image: string | null;
  createdAt: string;
  likes: number;
  author: {
    username: string;
    avatar?: string;
  };
}

export interface AuthStore {
  userDetails?: {
    username: string;
    password: string;
    avatar?: string;
  };
  isLogged: boolean;
  blogs: Blog[];
}

export const authStore = createStore('auth')<AuthStore>(
  {
    isLogged: false,
    userDetails: undefined,
    blogs: [],
  },
  {
    devtools: { enabled: true },
    persist: {
      enabled: true,
      name: 'Zustand-X',
      getStorage: () => window.localStorage,
    },
  }
).extendActions((set) => ({
  setTokens: (username: string, password: string, avatar: string) => {
    if (username === '' || password === '') {
      throw new Error('Username and password not provided');
    }
    set.state((state) => ({
      ...state,
      userDetails: { username, password, avatar },
      isLogged: true,
    }));
  },
  removeToken: () => {
    set.state((state) => ({
      ...state,
      userDetails: undefined,
      isLogged: false,
    }));
  },
  addBlog: (blog: Blog) => {
    set.state((state) => ({
      ...state,
      blogs: [...state.blogs, blog],
    }));
  },
  removeBlog: (id: number) => {
    set.state((state) => ({
      ...state,
      blogs: state.blogs.filter((blog) => blog.id !== id),
    }));
  },
  updateBlog: (updatedBlog: Blog) => {
    set.state((state) => ({
      ...state,
      blogs: state.blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      ),
    }));
  },
  likeBlog: (id: number) => {
    set.state((state) => ({
      ...state,
      blogs: state.blogs.map((blog) =>
        blog.id === id ? { ...blog, likes: (blog.likes || 0) + 1 } : blog
      ),
    }));
  },
}));

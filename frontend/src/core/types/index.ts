
export interface Video {
    title: string;
    url: string;
  }
  
  export interface Module {
    _id: string;
    title: string;
    videos: Video[];
  }
  
  export interface Course {
    _id: string;
    title: string;
    imageUrl: string;
    modules: Module[];
  }
  
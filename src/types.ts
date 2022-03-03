export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';

export interface OGImage {
  fileType: FileType;
  text: string;
  theme: Theme;
  md: boolean;
  fontSize: string;
}

export interface Event {
  name: string;
  once: boolean;
}

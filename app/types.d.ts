export interface LoginFormData {
  username: string;
  password: string;
}

export interface Course {
  id: number;
  theme: string;
  readingTime: string;
  hasTests: boolean;
  textBlocks: TextBlock[];
  tests: Test[];
}

export interface TextBlock {
  id: number;
  name: string;
  text: string;
}

export interface Test {
  id: number;
  question: string;
  answers: Answer[];
}

export interface Answer {
  id: number;
  text: string;
  right: boolean;
}

export interface User {
  id: number;
  username: string;
}

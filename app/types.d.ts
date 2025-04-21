export interface Course {
  id: number;
  theme: string;
  reading_time: string;
  has_tests: boolean;
  text_blocks: TextBlock[];
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

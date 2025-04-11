export interface Course {
  theme: string;
  reading_time: string;
  has_tests: boolean;
  text_blocks: TextBlock[];
  tests: Test[];
}

export interface TextBlock {
  name: string;
  text: string;
}

export interface Test {
  question: string;
  answers: string[];
  right_answer: string;
}

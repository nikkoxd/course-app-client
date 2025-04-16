import { useState } from "react";
import { NavLink } from "react-router";
import type { Answer, Course, Test, TextBlock } from "~/types";

export default function AddCourse() {
  const [theme, setTheme] = useState("");
  const [readingTime, setReadingTime] = useState("");
  const [textBlocks, setTextBlocks] = useState<TextBlock[]>([]);
  const [tests, setTests] = useState<Test[]>([]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    fetch("http://localhost:3000/courses").then((response) => {
      response.json().then((data: Course[]) => {
        const course: Course = {
          id: data.length + 1,
          theme: theme,
          reading_time: readingTime,
          has_tests: tests.length > 0,
          text_blocks: textBlocks,
          tests: tests
        }

        fetch("http://localhost:3000/courses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(course),
        }).then((response) => {
          if (response.ok) {
            console.log("Course added");
          } else {
            console.log("Error adding course");
          }
        });
      })
    })

  }

  function onTextBlockNameChange(event: React.FormEvent<HTMLInputElement>, textBlock: TextBlock) {
    const value = event.currentTarget.value;

    setTextBlocks(textBlocks.map((block) => {
      if (block.id === textBlock.id) {
        return { ...block, name: value };
      }
      return block;
    }));
  }

  function onTextBlockTextChange(event: React.FormEvent<HTMLTextAreaElement>, textBlock: TextBlock) {
    const value = event.currentTarget.value;

    setTextBlocks(textBlocks.map((block) => {
      if (block.id === textBlock.id) {
        return { ...block, text: value };
      }
      return block;
    }));
  }

  function onTestQuestionChange(event: React.FormEvent<HTMLInputElement>, testToChange: Test) {
    event.preventDefault();
    const value = event.currentTarget.value;

    setTests(tests.map((test) => {
      if (test.id === testToChange.id) {
        return { ...test, question: value };
      }
      return test;
    }));
  }

  function addAnswer(testToAdd: Test) {
    setTests(tests.map((test) => {
      if (test.id === testToAdd.id) {
        return { ...test, answers: [...test.answers, { text: "", right: false }] };
      }
      return test;
    }))
  }

  function onTestAnswerChange(event: React.FormEvent<HTMLInputElement>, testToChange: Test, answerToChange: Answer) {
    const value = event.currentTarget.value;

    setTests(tests.map((test) => {
      if (test.id === testToChange.id) {
        return {
          ...test, answers: test.answers.map((answer) => {
            if (answer.text === answerToChange.text) {
              return { ...answer, text: value };
            }
            return answer;
          })
        }
      }
      return test;
    }))
  }

  return (
    <main className="container mx-auto my-12">
      <NavLink to="/">Go back</NavLink>
      <div className="mt-6">
        <h1>Add course</h1>
        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-4">
          <input
            type="text"
            name="theme"
            placeholder="Theme"
            className="px-4 py-2 rounded-lg border-1 border-black"
            value={theme}
            onChange={(event) => setTheme(event.currentTarget.value)}
          />
          <input
            type="text"
            name="reading-time"
            placeholder="Reading time"
            className="px-4 py-2 rounded-lg border-1 border-black"
            value={readingTime}
            onChange={(event) => setReadingTime(event.currentTarget.value)}
          />
          <div>
            <h2>Text blocks</h2>
            {textBlocks.map((textBlock) => (
              <div key={textBlock.id} className="flex flex-col gap-2 my-4">
                <div className="flex gap-2 w-full">
                  <input
                    type="text"
                    value={textBlock.name}
                    onChange={(event) => (onTextBlockNameChange(event, textBlock))}
                    name={`text-block-name-${textBlock.id}`}
                    placeholder="Name"
                    className="px-4 py-2 grow rounded-lg border-1 border-black"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg cursor-pointer bg-red-600 text-white"
                    onClick={() => setTextBlocks(textBlocks.filter((block) => block.id !== textBlock.id))}
                  >
                    Remove text block
                  </button>
                </div>
                <textarea
                  value={textBlock.text}
                  onChange={(event) => (onTextBlockTextChange(event, textBlock))}
                  name={`text-block-text-${textBlock.id}`}
                  placeholder="Text"
                  className="px-4 py-2 rounded-lg border-1 border-black"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => setTextBlocks([...textBlocks, { id: textBlocks.length + 1, name: "", text: "" }])}
              className="nth-[2]:mt-4 px-4 py-2 rounded-lg cursor-pointer bg-blue-600 text-white"
            >
              Add text block
            </button>
          </div>
          <div>
            <h2>Tests</h2>
            {tests.map((test) => (
              <div key={test.id} className="flex flex-col gap-2 my-4">
                <div className="flex gap-2 w-full">
                  <input
                    type="text"
                    value={test.question}
                    onChange={(event) => (onTestQuestionChange(event, test))}
                    name={`test-${test.id}-question`}
                    placeholder="Question"
                    className="px-4 py-2 grow rounded-lg border-1 border-black"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg cursor-pointer bg-red-600 text-white"
                    onClick={() => setTests(tests.filter((unfilteredTest) => unfilteredTest.id !== test.id))}
                  >
                    Remove test
                  </button>
                </div>
                {test.answers.map((answer) => (
                  <div className="flex gap-2 w-full items-center">
                    <input
                      type="text"
                      name={`test-${test.id}-answer-${answer.text}-text`}
                      value={answer.text}
                      className="px-4 py-2 grow rounded-lg border-1 border-black"
                      placeholder="Answer"
                      onChange={(event) => onTestAnswerChange(event, test, answer)}
                    />
                    <input
                      type="checkbox"
                      name={`test-${test.id}-answer-${answer.text}-right`}
                      checked={answer.right}
                      onChange={() => setTests(tests.map((test) => {
                        if (test.id === test.id) {
                          return {
                            ...test, answers: test.answers.map((mappedAnswer) => {
                              if (mappedAnswer.text === answer.text) {
                                return { ...mappedAnswer, right: !mappedAnswer.right };
                              }
                              return mappedAnswer;
                            })
                          };
                        }
                        return test;
                      }))}
                    />
                    <label html-for={`test-${test.id}-answer-${answer.text}-right`} className="ml-2">Is right?</label>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addAnswer(test)}
                  className="nth-[2]:mt-4 px-4 py-2 rounded-lg cursor-pointer bg-blue-600 text-white"
                >
                  Add answer
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setTests([...tests, { id: tests.length + 1, question: "", answers: [] }])}
              className="nth-[2]:mt-4 px-4 py-2 rounded-lg cursor-pointer bg-blue-600 text-white"
            >
              Add test
            </button>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg cursor-pointer bg-green-600 text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

import { useReducer } from "react";
import { NavLink } from "react-router";
import type { Answer, Course, Test, TextBlock } from "~/types";

type Action =
  | { type: "SET_THEME", theme: string }
  | { type: "SET_READING_TIME", reading_time: string }
  | { type: "ADD_TEXT_BLOCK" }
  | { type: "REMOVE_TEXT_BLOCK", text_block_id: number }
  | { type: "UPDATE_TEXT_BLOCK", text_block: TextBlock }
  | { type: "ADD_TEST" }
  | { type: "REMOVE_TEST", test_id: number }
  | { type: "UPDATE_TEST", test: Test }
  | { type: "ADD_ANSWER", test_id: number }
  | { type: "REMOVE_ANSWER", test_id: number, answer: Answer }
  | { type: "UPDATE_ANSWER", test_id: number, answer: Answer };

export default function AddCourse() {
  const [state, dispatch] = useReducer(reducer, {
    id: 0,
    theme: "",
    reading_time: "",
    has_tests: false,
    text_blocks: [],
    tests: [],
  })

  function reducer(state: Course, action: Action): Course {
    switch (action.type) {
      case "SET_THEME":
        return { ...state, theme: action.theme };
      case "SET_READING_TIME":
        return { ...state, reading_time: action.reading_time };
      case "ADD_TEXT_BLOCK":
        return {
          ...state, text_blocks: [
            ...state.text_blocks, {
              id: state.text_blocks.length + 1,
              name: "",
              text: "",
            }
          ]
        }
      case "REMOVE_TEXT_BLOCK":
        return { ...state, text_blocks: state.text_blocks.filter((block) => block.id !== action.text_block_id) };
      case "UPDATE_TEXT_BLOCK":
        return {
          ...state, text_blocks: state.text_blocks.map((block) => {
            if (block.id === action.text_block.id) {
              return action.text_block;
            }
            return block;
          })
        };
      case "ADD_TEST":
        return {
          ...state, tests: [
            ...state.tests, {
              id: state.tests.length + 1,
              question: "",
              answers: [],
            }
          ]
        }
      case "REMOVE_TEST":
        return { ...state, tests: state.tests.filter((test) => test.id !== action.test_id) };
      case "UPDATE_TEST":
        return {
          ...state, tests: state.tests.map((test) => {
            if (test.id === action.test.id) {
              return action.test;
            };
            return test;
          })
        }
      case "ADD_ANSWER":
        return {
          ...state, tests: state.tests.map((test) => {
            if (test.id === action.test_id) {
              return {
                ...test,
                answers: [...test.answers, {
                  id: test.answers.length + 1,
                  text: "",
                  right: false,
                }],
              };
            }
            return test;
          })
        };
      case "REMOVE_ANSWER":
        return {
          ...state, tests: state.tests.map((test) => {
            if (test.id === action.test_id) {
              return {
                ...test, answers: test.answers.filter((answer) => answer !== action.answer)
              };
            }
            return test;
          })
        }
      case "UPDATE_ANSWER":
        return {
          ...state, tests: state.tests.map((test) => {
            if (test.id === action.test_id) {
              return {
                ...test, answers: test.answers.map((answer) => {
                  if (answer.id === action.answer.id) {
                    return action.answer;
                  }
                  return answer;
                })
              }
            }
            return test;
          })
        }
      default:
        return state;
    }
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    fetch("http://localhost:3000/courses").then((response) => {
      response.json().then((data: Course[]) => {
        const course = state;
        course.id = data.length + 1;

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
            value={state.theme}
            onChange={(event) => dispatch({ type: "SET_THEME", theme: event.currentTarget.value })}
          />
          <input
            type="text"
            name="reading-time"
            placeholder="Reading time"
            className="px-4 py-2 rounded-lg border-1 border-black"
            value={state.reading_time}
            onChange={(event) => dispatch({ type: "SET_READING_TIME", reading_time: event.currentTarget.value })}
          />
          <div>
            <h2>Text blocks</h2>
            {state.text_blocks.map((textBlock) => (
              <div key={textBlock.id} className="flex flex-col gap-2 my-4">
                <div className="flex gap-2 w-full">
                  <input
                    type="text"
                    value={textBlock.name}
                    onChange={(event) => (dispatch({ type: "UPDATE_TEXT_BLOCK", text_block: { ...textBlock, name: event.currentTarget.value } }))}
                    name={`text-block-name-${textBlock.id}`}
                    placeholder="Name"
                    className="px-4 py-2 grow rounded-lg border-1 border-black"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg cursor-pointer bg-red-600 text-white"
                    onClick={() => (dispatch({ type: "REMOVE_TEXT_BLOCK", text_block_id: textBlock.id }))}
                  >
                    Remove text block
                  </button>
                </div>
                <textarea
                  value={textBlock.text}
                  onChange={(event) => (dispatch({ type: "UPDATE_TEXT_BLOCK", text_block: { ...textBlock, text: event.currentTarget.value } }))}
                  name={`text-block-text-${textBlock.id}`}
                  placeholder="Text"
                  className="px-4 py-2 rounded-lg border-1 border-black"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => (dispatch({ type: "ADD_TEXT_BLOCK" }))}
              className="nth-[2]:mt-4 px-4 py-2 rounded-lg cursor-pointer bg-blue-600 text-white"
            >
              Add text block
            </button>
          </div>
          <div>
            <h2>Tests</h2>
            {state.tests.map((test) => (
              <div key={test.id} className="flex flex-col gap-2 my-4">
                <div className="flex gap-2 w-full">
                  <input
                    type="text"
                    value={test.question}
                    onChange={(event) => (dispatch({ type: "UPDATE_TEST", test: { ...test, question: event.currentTarget.value } }))}
                    name={`test-${test.id}-question`}
                    placeholder="Question"
                    className="px-4 py-2 grow rounded-lg border-1 border-black"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg cursor-pointer bg-red-600 text-white"
                    onClick={() => (dispatch({ type: "REMOVE_TEST", test_id: test.id }))}
                  >
                    Remove test
                  </button>
                </div>
                {test.answers.map((answer) => (
                  <div key={answer.id} className="flex gap-2 w-full items-center">
                    <input
                      type="text"
                      name={`test-${test.id}-answer-${answer.text}-text`}
                      value={answer.text}
                      className="px-4 py-2 grow rounded-lg border-1 border-black"
                      placeholder="Answer"
                      onChange={(event) => (dispatch({ type: "UPDATE_ANSWER", test_id: test.id, answer: { ...answer, text: event.currentTarget.value } }))}
                    />
                    <input
                      type="checkbox"
                      name={`test-${test.id}-answer-${answer.text}-right`}
                      checked={answer.right}
                      onChange={(event) => (dispatch({ type: "UPDATE_ANSWER", test_id: test.id, answer: { ...answer, right: event.currentTarget.checked } }))}
                    />
                    <label html-for={`test-${test.id}-answer-${answer.text}-right`} className="ml-2">Is right?</label>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => (dispatch({ type: "ADD_ANSWER", test_id: test.id }))}
                  className="nth-[2]:mt-4 px-4 py-2 rounded-lg cursor-pointer bg-blue-600 text-white"
                >
                  Add answer
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => (dispatch({ type: "ADD_TEST" }))}
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

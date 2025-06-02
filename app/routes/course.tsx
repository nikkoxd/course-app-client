import type { Course } from "~/types";
import type { Route } from "./+types/course";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const courses = await fetch(`${process.env.API_URL}/api/courses`);
  const coursesResponse = await courses.json() as Course[];

  console.log(coursesResponse);

  const course = coursesResponse.find((course) => course.id == Number(params.courseId));

  return { course: course };
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Course({ loaderData }: Route.ComponentProps) {
  console.log(loaderData);
  if (!loaderData.course) return;

  let [rightPercentage, setRightPercentage] = useState(0);
  let [submitted, setSubmitted] = useState(false);

  function processSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const totalQuestions = loaderData.course!.tests.length;
    let rightAnswers = 0;

    const formData = new FormData(event.currentTarget);
    formData.forEach((value, key) => {
      const answers = loaderData.course!.tests.find((test) => test.id === Number(key))?.answers
      const isRight = answers?.find((answer) => answer.text === value)?.right;

      if (isRight) {
        rightAnswers++;
      }
    });

    setRightPercentage((rightAnswers / totalQuestions) * 100);
    setSubmitted(true);
  }

  return (
    <main className="container mx-auto my-12">
      <div className="mt-6">
        <h1>{loaderData.course.theme}</h1>
        <Separator className="mt-4" />
        {loaderData.course.textBlocks.map((textBlock) => (
          <div key={textBlock.name} className="mt-4">
            <h2>{textBlock.name}</h2>
            <p>{textBlock.text}</p>
            <Separator className="mt-4" />
          </div>
        ))}
      </div>
      {loaderData.course.tests.length > 0 ?
        <div className="mt-6">
          <h1>Course test</h1>
          <Separator className="mt-4" />
          <form onSubmit={processSubmit}>
            {loaderData.course.tests.map((test) => (
              <div key={test.question} className="mt-4">
                <h2>{test.question}</h2>
                <div className="flex flex-col gap-2 mt-4">
                  {test.answers.map((answer) => (
                    <label key={answer.text} className="flex gap-2">
                      <input type="radio" id={`question-${test.id}`} name={test.id.toString()} value={answer.text} />
                      {answer.text}
                    </label>
                  ))}
                </div>
                <Separator className="mt-4" />
              </div>
            ))}
            <div className="flex items-center gap-6 mt-6">
              <Button type="submit">Submit</Button>
              {submitted && <p>Right answers: {rightPercentage}%</p>}
            </div>
          </form>
        </div>
        : <></>}
    </main>
  )
}

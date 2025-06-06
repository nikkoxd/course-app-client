import Search from "~/components/search";
import type { Route } from "./+types/home";
import type { Course } from "~/types";
import { useState } from "react";
import { NavLink } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Courses or something" },
  ];
}

export async function clientLoader() {
  const courses = await fetch(`${process.env.API_URL}/api/courses`);
  console.log(courses);
  return courses.json();
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [courses, setCourses] = useState(loaderData as Course[]);

  async function filterCourses(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const themeQuery = formData.get("theme-query");
    const timeQuery = formData.get("time-query");
    const hasTests = formData.get("has-tests");

    const response = await fetch(`${process.env.API_URL}/api/courses?theme=${themeQuery}&readingTime=${timeQuery}&hasTests=${hasTests}`);
    const courses = await response.json();

    setCourses(courses);
  }

  return (
    <main className="container mx-auto my-12 flex flex-col gap-6">
      <Search onSearch={filterCourses} />
      {courses.map((course) => (
        <NavLink to={`/courses/${course.id}`}>
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.theme}</CardTitle>
              <CardDescription>
                {course.readingTime}
                {course.hasTests ? ", with a test" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {course.textBlocks[0].text}
            </CardContent>
          </Card>
        </NavLink>
      ))}
      <div>
        <Button asChild>
          <NavLink to="/add-course">
            Add course
          </NavLink>
        </Button>
      </div>
    </main >
  );
}

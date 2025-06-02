import Search from "~/components/search";
import type { Route } from "./+types/home";
import type { Course } from "~/types";
import CourseItem from "~/components/courseItem";
import { useState } from "react";
import { NavLink } from "react-router";

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

  function filterCourses(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const themeQuery = formData.get("theme-query");
    const timeQuery = formData.get("time-query");
    const hasTests = formData.get("has-tests");

    const courses = loaderData as Course[];

    const filteredByTheme = courses.filter((course) => {
      return course.theme.toLowerCase().includes(themeQuery!.toString().toLowerCase());
    })
    const filteredByTime = filteredByTheme.filter((course) => {
      return course.readingTime.toLowerCase().includes(timeQuery!.toString().toLowerCase());
    })
    const filteredByHasTests = filteredByTime.filter((course) => {
      return course.hasTests === Boolean(hasTests);
    })

    setCourses(filteredByHasTests);
  }

  return (
    <main className="container mx-auto my-12">
      <Search filterResults={filterCourses} />
      <div className="mt-12 p-2 border-b-1 border-black grid grid-cols-3 gap-12">
        <p>Theme</p>
        <p>Reading time</p>
        <p>Has tests?</p>
      </div>
      <div>
        {courses.map((course) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </div>
      <div className="mt-6">
        <NavLink to="/add-course" className="px-4 py-2 rounded-lg bg-green-600 text-white">Add course</NavLink>
      </div>
    </main>
  );
}

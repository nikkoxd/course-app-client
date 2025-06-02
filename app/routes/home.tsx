import Search from "~/components/search";
import type { Route } from "./+types/home";
import type { Course } from "~/types";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Button } from "~/components/ui/button";

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
  const navigate = useNavigate();

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

  function handleRowClick(course: Course) {
    navigate(`/courses/${course.id}`);
  }

  return (
    <main className="container mx-auto my-12 flex flex-col gap-6">
      <h1>Courses</h1>
      <Search filterResults={filterCourses} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Theme</TableHead>
              <TableHead>Reading time</TableHead>
              <TableHead>Has tests</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id} onClick={() => handleRowClick(course)} className="cursor-pointer">
                <TableCell>{course.theme}</TableCell>
                <TableCell>{course.readingTime}</TableCell>
                <TableCell>{course.hasTests ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <Button asChild>
          <NavLink to="/add-course">
            Add course
          </NavLink>
        </Button>
      </div>
    </main>
  );
}

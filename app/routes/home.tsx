import Search from "~/components/search";
import type { Route } from "./+types/home";
import type { Course } from "~/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader() {
  const courses = await fetch("http://localhost:3000/courses");
  return courses.json();
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const courses = loaderData as Course[];

  return (
    <main className="container mx-auto my-12">
      <Search />
      {courses.map((course) => (
        <div key={course.theme}>
          <p>{course.theme}</p>
        </div>
      ))}
    </main>
  );
}

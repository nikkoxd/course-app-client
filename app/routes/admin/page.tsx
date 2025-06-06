import { redirect, useNavigate } from "react-router";
import type { Route } from "./+types/page";
import type { Course } from "~/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";

export async function clientLoader({
  params
}: Route.ClientLoaderArgs) {
  const response = await fetch(`${process.env.API_URL}/admin/data/`, {
    method: "GET",
    credentials: "include",
  });

  if (response.status === 401) {
    return redirect("/admin/login");
  }

  const data: Course[] = await response.json();
  return data;
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function AdminPage({
  loaderData
}: Route.ComponentProps) {
  const navigate = useNavigate();

  function handleRowClick(course: Course) {
    navigate(`/courses/${course.id}`);
  }

  return (
    <main className="container mx-auto my-12 flex flex-col gap-6">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Theme</TableHead>
              <TableHead>Reading time</TableHead>
              <TableHead>Has a test</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loaderData.map((course) => (
              <TableRow key={course.id} onClick={() => handleRowClick(course)} className="cursor-pointer">
                <TableCell>{course.theme}</TableCell>
                <TableCell>{course.readingTime}</TableCell>
                <TableCell>{course.hasTests ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}

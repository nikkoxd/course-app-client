import { NavLink } from "react-router";
import type { Course } from "~/types";

export default function CourseItem({ course }: { course: Course }) {
  return (
    <NavLink to={ `/courses/${course.id}`} className="p-2 border-b-1 border-black grid grid-cols-3 gap-12">
      <p>{course.theme}</p>
      <p>{course.readingTime}</p>
      <p>{course.hasTests ? "Yes" : "No"}</p>
    </NavLink>
  )
}

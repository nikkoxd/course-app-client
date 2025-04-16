import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("courses/:courseId", "routes/course.tsx"),
  route("add-course", "routes/addCourse.tsx"),
] satisfies RouteConfig;

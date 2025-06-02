import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("courses/:courseId", "routes/course.tsx"),
  route("add-course", "routes/addCourse.tsx"),

  route("admin", "routes/admin/page.tsx"),
  route("admin/login", "routes/admin/login.tsx"),
] satisfies RouteConfig;

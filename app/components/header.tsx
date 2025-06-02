import { NavLink } from "react-router"
import { Button } from "./ui/button"

export default function Header() {
  return (
    <header className="container mx-auto my-12 flex justify-between">
      <NavLink to="/">
        <h1>Courses</h1>
      </NavLink>
      <Button asChild>
        <NavLink to="/admin/login">Login</NavLink>
      </Button>
    </header>
  )
}

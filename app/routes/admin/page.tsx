import { redirect, type LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  let loggedIn = false;
  if (!loggedIn) return redirect("/admin/login");
}

export default function AdminPage() {
  return (
    <main className="container mx-auto my-12">
      <h1>bob</h1>
    </main>
  )
}

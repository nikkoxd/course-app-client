import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import type { LoginFormData } from "~/types";

export default function AdminLogin() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch(`${process.env.API_URL}/admin/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then(response => {
      document.cookie += response.headers.getSetCookie();
    })
  }

  return (
    <main className="absolute top-0 z-[-1] w-full h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <h2>Login</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onInput={(e) => setFormData({ ...formData, username: e.currentTarget.value })}
              />
              <Input
                type="password"
                name="password"
                placeholder="Pasword"
                value={formData.password}
                onInput={(e) => setFormData({ ...formData, password: e.currentTarget.value })}
              />
            </div>

            <Button type="submit">Login</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}

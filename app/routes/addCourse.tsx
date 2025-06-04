import { useForm } from "react-hook-form";
import TestArray from "~/components/testArray";
import TextBlockArray from "~/components/textBlockArray";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import type { Course } from "~/types";

export default function AddCourse() {
  const form = useForm<Course>({
    defaultValues: {
      theme: "",
      readingTime: "",
      hasTests: false,
      textBlocks: [],
      tests: [],
    }
  })

  function onSubmit(values: Course) {
    fetch(`${process.env.API_URL}/api/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((response) => {
      if (response.ok) {
        console.log("Course added");
      } else {
        console.log("Error adding course");
      }
    })
  };

  return (
    <main className="container mx-auto my-12">
      <h1>Add course</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col mt-6 gap-4"
        >
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Theme</FormLabel>
                <FormControl>
                  <Input placeholder="Some theme" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="readingTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reading time</FormLabel>
                <FormControl>
                  <Input placeholder="1 hour" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <TextBlockArray form={form} />
          <TestArray form={form} />
          <Button
            type="submit"
          >
            Add course
          </Button>
        </form>
      </Form>
    </main >
  )
}

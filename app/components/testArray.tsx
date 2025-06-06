import { useFieldArray, type UseFormReturn } from "react-hook-form";
import type { Course } from "~/types";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import AnswerArray from "./answerArray";

export default function TestArray({ form }: {
  form: UseFormReturn<Course>
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tests"
  })

  return (
    <>
      {fields.map((field, index) => (
        <Card key={field.id}>
          <CardHeader>
            <CardTitle>Question {index + 1}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name={`tests.${index}.question`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input placeholder="Bob?" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <AnswerArray index={index} form={form} />
          </CardContent>
          <CardFooter>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                if (form.getValues().tests.length === 1) {
                  form.setValue("hasTests", false);
                }
                remove(index)
              }}
            >
              Remove
            </Button>
          </CardFooter>
        </Card>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          if (form.getValues().tests.length === 0) {
            form.setValue("hasTests", true);
          }
          append({
            id: form.getValues().textBlocks.length,
            question: "",
            answers: [],
          })
        }}
      >
        Add question
      </Button>
    </>
  )
}

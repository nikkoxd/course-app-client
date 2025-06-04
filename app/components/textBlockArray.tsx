import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import type { Course } from "~/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";

export default function TextBlockArray({ form }: {
  form: UseFormReturn<Course>
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "textBlocks"
  });

  return (
    <>
      {fields.map((field, index) => (
        <Card key={field.id}>
          <CardHeader>
            <CardTitle>Text block {index + 1}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name={`textBlocks.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Text Block Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`textBlocks.${index}.text`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text</FormLabel>
                  <FormControl>
                    <Input placeholder="Lorem Ipsum..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="button"
              variant="destructive"
              onClick={() => remove(index)}
            >
              Remove
            </Button>
          </CardFooter>
        </Card>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => append({ id: form.getValues().textBlocks.length, name: "", text: "" })}
      >
        Add text block
      </Button>
    </>
  )
}

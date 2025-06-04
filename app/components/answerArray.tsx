import { useFieldArray, type UseFormReturn } from "react-hook-form";
import type { Course } from "~/types";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function AnswerArray({ index, form }: {
  index: number;
  form: UseFormReturn<Course>
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `tests.${index}.answers`
  })

  return (
    <>
      {fields.map((field, answerIndex) => (
        <div key={field.id} className="flex items-end gap-2">
          <FormField
            control={form.control}
            name={`tests.${index}.answers.${answerIndex}.text`}
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel>Answer {answerIndex + 1}</FormLabel>
                <FormControl>
                  <Input placeholder="Bob?" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`tests.${index}.answers.${answerIndex}.right`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Is right?</FormLabel>
                <Select onValueChange={(value) => {field.onChange(value === "true")}} value={field.value.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Is right?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="true">True</SelectItem>
                    <SelectItem value="false">False</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="destructive"
            onClick={() => remove(answerIndex)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => append({
          id: form.getValues().textBlocks.length,
          text: "",
          right: false,
        })}
      >
        Add answer
      </Button>
    </>
  )
}

import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export default function Search({ filterResults }: {
  filterResults: (event: React.FormEvent<HTMLFormElement>) => void
}) {
  return (
    <form className="flex gap-2 items-center" onSubmit={filterResults}>
      <Input type="text" name="theme-query" placeholder="Filter by theme" />
      <Input type="text" name="time-query" placeholder="Filter by reading time" />
      <Checkbox defaultChecked name="has-tests" />
      <Label htmlFor="has-tests">Has tests?</Label>
      <Button type="submit">
        Search
      </Button>
    </form>
  )
}

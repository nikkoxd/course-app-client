export default function Search({ filterResults } : {
  filterResults: (event: React.FormEvent<HTMLFormElement>) => void 
}) {
  return (
    <form className="flex gap-2 items-center" onSubmit={filterResults}>
      <input type="text" name="theme-query" placeholder="Filter by theme" className="px-2 py-1 border-1 border-black rounded" />
      <input type="text" name="time-query" placeholder="Filter by reading time" className="px-2 py-1 border-1 border-black rounded" />
      <label htmlFor="has-tests">Has tests?</label>
      <input type="checkbox" defaultChecked name="has-tests" />
      <input type="submit" value="Search" className="cursor-pointer px-2 py-1 rounded bg-blue-600 text-white" />
    </form>
  )
}

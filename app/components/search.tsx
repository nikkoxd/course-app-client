export default function Search() {
  return (
    <form className="flex gap-2">
      <input type="text" className="px-2 py-1 border-1 border-black rounded" />
      <input type="submit" value="Search" className="px-2 py-1 rounded bg-black text-white" />
    </form>
  )
}

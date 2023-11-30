export default function SearchForm() {
  return (
    <form className="px-3">
      <label htmlFor="sidebar-search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <img
            alt=""
            src="/svg/search-outline.svg"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
          />
        </div>
        <input
          type="text"
          name="search"
          id="sidebar-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Search messages or contact"
        />
      </div>
    </form>
  );
}

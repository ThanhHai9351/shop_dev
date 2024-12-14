import { Popover, Transition } from "@headlessui/react";
import { FC, Fragment, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface SortProps {
  setSortDir: (value: string) => void;
  setSortBy: (value: string) => void;
  sortBy: string
  sortDir:string
}

const CollectionSorter: FC<SortProps> = ({ sortBy,sortDir,setSortDir, setSortBy }) => {
  const sortOptions = [
    { key: 1, value: "All", sortBy: "", sortDir: "" },
    { key: 2, value: "Alphabetically A-Z", sortBy: "name", sortDir: "asc" },
    { key: 3, value: "Alphabetically Z-A", sortBy: "name", sortDir: "desc" },
    { key: 4, value: "Increase Price", sortBy: "price", sortDir: "asc" },
    { key: 5, value: "Decrease Price", sortBy: "price", sortDir: "desc" },
  ];
  
  const [activeSortKey, setActiveSortKey] = useState(1);

  return (
    <section className='hidden lg:block m-2'>
      <div className='container pb-10'>
        <div className='flex items-center justify-end gap-6'>
          <div>
            <p className='text-sm text-neutral-500 dark:text-neutral-300'>Sort by:</p>
          </div>
          <div className='flex items-center gap-3'>
            <Popover as='div' className='relative inline-block w-full'>
              <Popover.Button className='flex w-full items-center justify-between gap-2 rounded border border-primary/15 px-5 py-4 dark:border-white/15 lg:min-w-60'>
                <span>{sortOptions.find((option) => (option.sortBy === sortBy && option.sortDir === sortDir))?.value}</span>
                <MdKeyboardArrowDown />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Popover.Panel className='absolute bottom-9 left-0 mt-2 w-40 origin-top-right divide-y rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-neutral-900'>
                  <div className='flex flex-col'>
                    {sortOptions.map((option) => (
                      <button
                        key={option.key}
                        type='button'
                        onClick={() => {
                          setActiveSortKey(option.key);
                          setSortBy(option.sortBy);
                          setSortDir(option.sortDir);
                        }}
                        className='w-full px-3 py-1 text-left text-sm focus:outline-none'
                      >
                        {option.value}
                      </button>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionSorter;

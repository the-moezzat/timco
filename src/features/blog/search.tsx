import { X } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';

export default function Search() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const [filter, setFilter] = useState(searchParams.get('filter') ?? '');

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setSearchParams({ search: e.target.value, filter });
    queryClient.invalidateQueries('blog');
  }

  function handleClearSearch() {
    setSearch('');
    setSearchParams({});
    queryClient.invalidateQueries('blog');
  }

  function handleFilter(value: string) {
    setFilter(value);
    setSearchParams({ filter: value, search });
    queryClient.invalidateQueries('blog');
  }

  return (
    <div className="relative flex items-center gap-2">
      <Select
        onValueChange={handleFilter}
        defaultValue={searchParams.get('filter') ?? ''}
      >
        <SelectTrigger className="w-[180px] text-base  max-sm:text-sm">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent className="text-base">
          <SelectItem value="" className=" max-sm:text-sm">
            All
          </SelectItem>
          <SelectItem value="growth" className=" max-sm:text-sm">
            Growth
          </SelectItem>
          <SelectItem value="projects" className=" max-sm:text-sm">
            Projects
          </SelectItem>
          <SelectItem value="daily" className=" max-sm:text-sm">
            Daily
          </SelectItem>
        </SelectContent>
      </Select>

      <Input
        placeholder="search for a component"
        className="text-base"
        value={search}
        onChange={handleSearch}
      />
      {search.length > 0 && (
        <span className="absolute right-0 top-1/2 -translate-y-1/2">
          <Button
            size={'icon'}
            variant={'ghost'}
            className="hover:bg-transparent border-0 shadow-none hover:text-gray-9"
            onClick={handleClearSearch}
          >
            <X />
          </Button>
        </span>
      )}
    </div>
  );
}

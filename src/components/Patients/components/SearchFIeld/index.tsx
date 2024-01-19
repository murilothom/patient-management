import { MagnifyingGlass } from "phosphor-react";
import { SearchFieldContainer } from "./styles";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { PatientsContext } from "../../../../contexts/PatientsContext";
import { memo } from 'react'
import { useDebounce } from "use-debounce";


export function SearchFormComponent() {
  const [query, setQuery] = useState<string>('');
  const {
    handleParams
  } = useContextSelector(
    PatientsContext,
    (context) => context,
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const [queryValue] = useDebounce(query, 1000);

  useEffect(() => {
    handleParams({ query: queryValue });
  }, [handleParams, queryValue]);

  return (
    <SearchFieldContainer onClick={() => inputRef.current?.focus()}>
      <div>
        <MagnifyingGlass weight="bold" size={17} color="#136CDC" />
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Pesquisar"
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} 
      />
    </SearchFieldContainer>
  )
}

export const SearchForm = memo(SearchFormComponent);

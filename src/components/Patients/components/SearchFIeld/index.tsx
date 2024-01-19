import { MagnifyingGlass } from "phosphor-react";
import { SearchFieldContainer } from "./styles";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { PatientsContext } from "../../../../contexts/PatientsContext";
import { useDebounce } from "use-debounce";

export function SearchField() {
  const [query, setQuery] = useState<string>('');
  const handleParams = useContextSelector(
    PatientsContext,
    (context) => context.handleParams,
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const [queryValue] = useDebounce(query, 1000);
  const [firstFetch, setFirstFetch] = useState(false);

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value.trim());
    setFirstFetch(true);
  }

  useEffect(() => {
    if (!firstFetch) { return }
    handleParams({ query: queryValue });
  }, [handleParams, queryValue, firstFetch]);

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
        onChange={handleSearch} 
      />
    </SearchFieldContainer>
  )
}

import { MagnifyingGlass } from "phosphor-react";
import { SearchFieldContainer } from "./styles";
import { useRef } from "react";

export function SearchField() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <SearchFieldContainer onClick={() => inputRef.current?.focus()}>
      <div>
        <MagnifyingGlass weight="bold" size={17} color="#136CDC" />
      </div>
      <input ref={inputRef} type="text" placeholder="Pesquisar" />
    </SearchFieldContainer>
  )
}

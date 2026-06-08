import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { DEFAULT_SEARCH_TERM } from "../../utils/constants";

export function SearchBar({ expanded = false, onToggle, className = "" }) {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const finalTerm = term.trim() || DEFAULT_SEARCH_TERM;
    navigate(`/buscar?q=${encodeURIComponent(finalTerm)}`);
  };

  return (
    <form
      className={`search-bar ${expanded ? "is-expanded" : ""} ${className}`.trim()}
      onSubmit={handleSubmit}
      role="search"
    >
      <button
        type="button"
        className="icon-button"
        onClick={onToggle}
        aria-label="Abrir buscador"
      >
        <Icon name="search" />
      </button>
      <input
        type="search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Buscar productos"
      />
      <button type="submit" className="secondary-button">
        Buscar
      </button>
    </form>
  );
}


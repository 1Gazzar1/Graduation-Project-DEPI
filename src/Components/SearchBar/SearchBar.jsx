import { useEffect, useRef } from "react";

function SearchBar({ labelText, searchVal, onChange }) {
    const inputRef = useRef();

    useEffect(() => {
        const focusOnKeyDown = (e) => {
            if (e.key === "/") {
				
                e.preventDefault();
                inputRef.current.focus();
            }
        };

        window.addEventListener("keydown", focusOnKeyDown);

		// remove eventListener after De-Mounting
        return () => window.removeEventListener("keydown", focusOnKeyDown);
    }, []);
    return (
        <>
            <label htmlFor="title">{labelText}</label>
            <input
                ref={inputRef}
                onChange={(e) => onChange(e)}
                value={searchVal}
                id="title"
                type="text"
            />
        </>
    );
}

export default SearchBar;
//(e) => {
//     setSearch(e.target.value);
// }

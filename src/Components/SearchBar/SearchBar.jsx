function SearchBar({labelText,searchVal,onChange,ref}) {
	return (
		<>
			<label htmlFor="title">{labelText}</label>
			<input
				ref={ref}
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
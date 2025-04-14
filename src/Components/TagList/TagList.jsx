import styles from "./Tag.module.css";
 
function TagList({tags,deleteTag,addTag,tagName,onChange}) {

	function submit(e) {
		e.preventDefault(); // so page wouldn't reload 
		if (tagName.trim() === "" || tags.some(s => s === tagName)) return;
		
		addTag(); 

		// i don't know how this one works 
		onChange({ target: { value: "" } }); // Reset the input by simulating an empty input change
	}
	
	return (
		<div className={styles.tagsContianer}>
			<form onSubmit={(e) => submit(e)}>
				<input
					value={tagName}
					onChange={(e) => onChange(e)}
					type="text"
				/>
			</form>
			<div className={styles.tags}>
				{tags.map((text,i) =>
					<Tag key={i} text={text} onDelete={() => deleteTag(i)} />
				)}
			</div>
		</div>
	);
}

function Tag({ text , onDelete }) {


	return (
		<div className={styles.tag}>
			<p>{text}</p>
			<button onClick={onDelete}>
			<svg height="14" width="14" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
			</svg>
			</button>
		</div>
	);
}
export default TagList;
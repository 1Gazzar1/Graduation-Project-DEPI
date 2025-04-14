import { useContext, useEffect, useRef} from 'react'
import Card from '../Components/Card/Card.jsx'
import '../Styles/Home.css';
import Pagination from '../Components/Pagination/Pagination.jsx';
import TagList from '../Components/TagList/TagList.jsx';
import { MovieContext } from '../Context/MovieContext/MovieContextHook.jsx';

function Home() {
	const {	sortOptions,changeSortOptions,tagLists,
			deleteTag,addTag,changeTagName,filterSettings,
			changeFilterSettings,shownMovies,page,
			getNextPage,getPrevPage,loading} = useContext(MovieContext);
	
	const textRef = useRef();
	useEffect(() => {
		const handleFocus = (e) => {
			if (e.key === '/'){
				e.preventDefault()
				textRef.current.focus()
			}
		} 

		window.addEventListener('keydown',handleFocus)
		
		return () => {
			window.removeEventListener('keydown',handleFocus)

		}
	},[])
		
	
	return (
	  <>
 
		<label>Sort By :</label>
		<select data-name = "sortBy" value={sortOptions.sortBy}
			onChange={(e) => changeSortOptions(e)}>
			<option value={'vote_count'}>Vote Count</option>
			<option value={'vote_average'}>Rating</option>
			<option value={'release_date'}>Release Date</option>
		</select>
		<select data-name = "asc" value={sortOptions.asc}
			onChange={(e) => changeSortOptions(e)}>
			<option value='0'>Dsc</option>
			<option value='1'>Asc</option>
		</select>
		{tagLists.map((_,index) => 
			<TagList 
			key={index}
			tags={tagLists[index].tags}
			deleteTag={(tagIndex) => deleteTag(index,tagIndex)}
			addTag={() => addTag(index)}
			tagName={tagLists[index].tagName}
			onChange={(e) => changeTagName(index,e)}
			/>
		)}
		
		<div className='filterSettings'>
		  <label htmlFor='title'>Title</label>
		  <input ref={textRef} onChange={changeFilterSettings}
			value={filterSettings.title}
			id='title' type='text'/>

		  <label htmlFor="voteCount">Vote Count</label>
		  <input onChange={changeFilterSettings}
			value={filterSettings.voteCount}
			id="voteCount" type="range" min="250" max="10000"/> {/*vote count*/}
		  <label htmlFor="voteCount">{filterSettings.voteCount}</label>

		  <label htmlFor="rating">Rating</label>
		  <input onChange={changeFilterSettings}
			value={filterSettings.rating}
			id="rating"
			type="range" min="6" max="9" step='0.1' /> {/*rating*/}
		  <label htmlFor="rating">{filterSettings.rating}</label>

		  <label htmlFor="releaseDate">Release Date</label>
		  <input onChange={changeFilterSettings}
			value={filterSettings.releaseDate}
			id="releaseDate"
			type="range" min="1950" max="2025"/> {/*release date */}
		  <label htmlFor="releaseDate">{filterSettings.releaseDate}</label>
		</div>



		<div className='cardList'>
		  {shownMovies.map( (movie) => <Card
										key={movie.id}
										movie = {movie}/>
		  )}

		</div>
		  <Pagination
		  page = {page}
		  nextPage={getNextPage}
		  prevPage={getPrevPage} />

	  	
	  	
		</>
	)
  }


export default Home;
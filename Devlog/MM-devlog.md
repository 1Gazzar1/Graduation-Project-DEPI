# MoovieMood

### Overview

this is going to be a small project where i can search movie by name and filter them using certain properties like `Vote_Count` , `Popularity` , etc...

future note : i'm deciding to add more features😭😭  

this is the [GitHub repo](https://github.com/1Gazzar1/MovieMood)

---

## Day 1 

I have a JSON file with movie data that i got from the free [[TMDB_API]] , the file contains over 14000 movies , all of them are over a certain `vote_count` , so the movies are unknown and i have made the lost rating is ==6==   

~~npm take so fucking long i will start the functionality in plain js~~

this is how we load JSON data in JavaScript  :
```js
let movies ;

const loadMovies = async () => {

    const response = await fetch('newer_movies.json')

    const json = await response.json()

    movies = json

    return json

}
```
- we have to treat it like an HTTP request and use `fetch` 
- that's because JavaScript is used with browsers and it has to be safe 


these will be the settings i want to filter the movies with : 
```js 
const settings = {
    title : "he he he ha",
    vote_count : 10 ,
    vote_average : 6 ,
    cast: [] ,
    release_date : 1950 ,
    genres : []    
}
```

this is a function to see if any of the movie's cast specified by the user are in a a movie's cast

i made it like this to be efficient : 
```js 
function movieHasCast(movieCast,userCast) {

    if (userCast.length === 0) return true

    const castSet = new Set(movieCast)

    for (let i = 0; i < userCast.length; i++) {

        if (castSet.has(userCast[i])) {

            return true

        }      

    }

    return false

}
```

i also made an exact replica but for ==movie genres==

--- 
this is the function used to filter through all the movies : 
```js 
const filterMovies = (movies,settings) => {

    ({title,vote_count,vote_average,cast,popularity,release_date,genres} = settings)

    const regex = new RegExp(title)

    return movies.filter(m =>  m.title.match(regex) &&

                        m.vote_count >= vote_count &&

                        m.vote_average >= vote_average &&


                       +m.release_date.split('-')[0] >= release_date &&

                        movieHasCast(m.cast,cast) &&

                        movieHasGenres(m.genres,genres))    

}
```


finally after npm finished i can start working on react : 

this is the card component that will hold all the movies in the project 
```jsx
import styles from './Card.module.css'


import { getMovieImg } from '../../Services/movie_searcher';

function Card({movie}) {



    return (

                <div className={styles.card}>

                    <img className={styles.poster} alt="moviePhoto" src={getMovieImg(movie.poster_path)}></img>

                    <h3 className={styles.title}>{movie.title}</h3>

                    <p className={styles.releaseDate}>{movie.release_date.split('-')[0]}</p>

                </div>

    );

}

  

export default Card;
```

~~i totally didn't steal this from a previous project~~ 

now this is the pagination component to switch between pages : 
```jsx 
import styles from '../Pagination/Pagination.module.css'

function Pagination({prevPage,nextPage,page}) {

    return (<div className={styles.container}>

  

            <button className={styles.arrow} onClick={prevPage}>⬅️</button>

            <h3>{page}</h3>

            <button className={styles.arrow} onClick={nextPage}>➡️</button>

    </div>);

}

  

export default Pagination;
```

i had to lift the state so i can use the functions correctly 

now we are here for the **big boy** the APP component :

let's take it part by part :
- these are the state hooks we'll need : 
  ```jsx
  const [allMovies, setAllMovies] = useState([])

  const [shownMovies, setShownMovies] = useState([])

  const [page,setPage] = useState(1);

  const [filterSettings,setFilterSettings] = useState({

    title : "",

    voteCount : 0,

    rating : 6 ,

    releaseDate : 1950,

    cast : [],

    genres : []

  })
```
- the all movies hook will be initialized and never changed and we'll do that by using a use effect hook that will only trigger on mount and not every render it will access the JSON file :
```jsx
useEffect( () => {

    const loadstuff = async () => {

      setAllMovies(await loadMovies('/src/assets/newer_new_movies.json'))

    }
    loadstuff()

  },[])
```
- the shown movies will be the movies that are currently shown on the screen 
- the page hook to handle pagination 
- and the filter settings for the method i made up top 


now these here the methods for the pagination component : 
```jsx 
const getPrevPage = () => {
    setPage(p => p-1 > 0 ? p-1 : 1)
  }

  const getNextPage = () => {
    setPage(p => p+1)
  }
```

i pass them to the component like this : 
```jsx 
  <Pagination

        page = {page}

        nextPage={getNextPage}

        prevPage={getPrevPage} />

      </>
```


--- 

now we need to display the movies we'll use a simple map function to display shown Movies : 
```jsx 
<div className='cardList'>

        {shownMovies.map( (movie) => <Card

                                      key={movie.id}

                                      movie = {movie}/>

        )}
```

> the key so react knows which element is which 
[[react key]]

--- 

now we need a way to take input from the use and filter the movies , it looks a little ugly but here it is  :
```jsx 
<div className='filterSettings'>

        <label htmlFor="voteCount">Vote Count</label>

        <input onChange={changeFilterSettings}

          value={filterSettings.voteCount}

          id="voteCount" type="range" min="10" max="10000"/> {/*vote count*/}

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
```

now we need to keep track of the settings so we'll make the onchange functions to this : 
```jsx 
const changeFilterSettings = (e) => {

    const element = e.target.id

    const value = e.target.value

    setFilterSettings(fs => ({...fs , [element] : value}))

  }
```

> ==very important== :  the `[]` can be used in object objects to change the attribute's name dynamically  


--- 

now all that is left is to make the movies change when the user changes the settings and apply the pagination , we can do that with this `useEffect` hook : 
```jsx 
useEffect(() => {

    const start = (page-1) * 20 ;  

    const end = start + 20 ;  

    setShownMovies(filterMovies(allMovies,filterSettings).slice(start,end))

  

  },[filterSettings,page,allMovies])
```

it might be only 5 lines of code , but it's very important 
- it has to change on page change so the pagination works 
- it has to change on `allMovies` so when we first load the movies it triggers and initializes the shown movies 
- it has to change on filter settings so we filter the movies 

> also the order is important , we don't change the all movies 
> we change the shown movies and the all movies always stays the same 

## Day 2 

today i added a tag system so i can take input from user and filter movies based on genres & cast members 

~~_i will reuse this in a new project_~~

well this is the Tag component that i came up with 

 >this is the final version thought so the state is already lifted    

```jsx
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
```

i don't know what to say , it's a basic tag , it just has a : 
- `button` to delete the tag 
- `<p>` to show the content of the tag
which we pass them as parameters 

--- 
then this is the main component of the Tags , it's a Tag List to store all the Tags : 
```jsx

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
```

now this is a little more complicated : 
1. it has a `form` with an `input` to take user input and submit it when clicking enter 
2. it has a `div` that shows all the tags inputted by the user by using the Tag Component
3. it has some props given by the parent component which are : 
	1. `tags` which are a list of strings to be displayed 
	2. `addTag` / `onChange` / `deleteTag` which are callback functions , they're self explanatory
	3. `tagName` to keep track of the input changing it's name which is changed by the `onChange`
4. it has an `onSubmit` function that triggers when clicking enter , it prevents the page from reloading and triggers the `addTag` function

>note that all these props where hooks when designing , but i made them props when lifting the state to the parent component

now where gonna see how everything is connected together in the parent component which is the App / Home component

we'll add a `useState` to the component to track changes but how are we going to implement that ? 
- we'll need two `TagList` s to keep track and take input from user , one will be for the movie's Genre , the other will be for cast members
- we'll need to keep track of the `tagName` and `tags` through out the app life time 

we'll have to do it so it will be a list of objects and each objects has the props for each list tag 
```jsx
const [tagLists,setTagLists] = useState(
      [{tags : [],tagName : ""}, // cast
       {tags : [],tagName : ""}  // genres
      ]
    );
```

now using this methods changing the data can be a little tricky , i know it's a little hard to read 

```jsx
function deleteTag(index , tagIndex) {
        // console.log(index,tagIndex)
        setTagLists((prev) =>
                    prev.map((obj,i) =>
                    index === i ? {...obj , tags : obj.tags.filter((t,i) => i !== tagIndex)} : obj )
        )
    }

    function addTag(index) {
        setTagLists((prev) =>
            prev.map((obj,i) =>
                index === i ? {...obj , tags : [...obj.tags ,obj.tagName]} : obj ) )
    }

    function changeTagName(index,e) {
        setTagLists(prev =>
            prev.map((obj,i) => index === i ?
        {...obj,tagName : e.target.value }: obj )
        )
    }
```

each one of those needs an `index` to know which of the `TagList`s are being accessed (genre or cast) 

so we'll loop through `prev` until we get the one with the right `index` using `map` , then we'll use `object destructuring` to add / change / delete Tags 

**There's a problem here though** :
when we add a tag the `filtersettings` doesn't update, why ? 
because based on the `changeFiltersetting` function , it only changes when we change the 3 slider inputs 
i couldn't figure out a way to dynamically change `filterSettings` with the 3 sliders & the Tags in one function . 
**the solution** : 
i added a `useEffect` hook to track when the cast / genres are changed , then it will update the `filterSettings` 

i know it's not the best solution but i couldn't figure anything else out 

```jsx
// when any of tags changes update the settings

    useEffect(() => {
        setFilterSettings(fs => ({...fs,cast : tagLists[0].tags , genres : tagLists[1].tags}))
    },[tagLists[0].tags,tagLists[1].tags])
```


then we finally display the `TagList`s at the return portion and pass the props : 
```jsx
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
```
the props given are self explanatory **but** ... 

there is one key problem i faced here ... 
for example the `deleteTag` function , to delete a tag it needs to know two things 
1. the `TagList` index to know which list to delete from , which is easy to do we give it the index while displaying it here the `index` parameter 
	 deleteTag={(tagIndex) => deleteTag(index,tagIndex)}
2. it needs to know which `Tag` to delete from the `TagList` , which is given by the `tagIndex` , but how do we get that index ? 

this is the solution/explanation i came up with , I'm not very sure that it's true  : 
1. we have to take that index from the `TagList` while iterating through Tags 
```jsx
{tags.map((text,i) =>
                    <Tag key={i} text={text} onDelete={() => deleteTag(i)} />
                )}
```
2. then we need to pass it like this `() => deleteTag(i)` , where i is the `tagIndex` 
3. then we need to catch it in the parent component like this : `deleteTag={(tagIndex) => deleteTag(index,tagIndex)}` in the input part 

**this is the first time i had to deal with something like this** , so it was quite confusing (i will ask chat gpt about that later)

now we're done with that feature 

---
after finishing this feature i just installed the [[react-router-dom]] library and set everything up by wrapping the App component like this :
```jsx
<BrowserRouter>
	<Routes>
		<Route path="/" element={<Home/>} />
	</Routes>
</BrowserRouter>
```

that was the day 

---

## Day 3 

it's wasn't that complicated comapared to before 
i added navigating today and made a new Page called `MovieDetails` 
```jsx
function MovieDetails() {

    const params = useParams();
    const [movie,setMovie] = useState();
    const [loading,setLoading] = useState(false)

    useEffect( () => {

        const loadstuff = async () => {

            setLoading(true)

            const movie = await getMovieById(params.id)
            setMovie(movie)
  
            setLoading(false)
        }
        loadstuff()
      },[params])

    return (
        <>
        {loading && "LOADING" }
        {!loading && movie &&
        <div className="movieContainer">
  
            <div className="movieImg">
                <h1 className="ml-20" >{movie.title}</h1>
                <h3 className="ml-20" >{movie.release_date}</h3>
                <img src={getMovieImg(movie.poster_path)} />
            </div>
            <div className="movieDetails">
                <h3 className="mb-20">Rating : {movie.vote_average}</h3>
                <div>
                    <h3 className="mb-20">Overview : </h3>
                    <p className="ml-20">{movie.overview}</p>
                </div>
                <div>
                    <h3 className="mb-20">Genres :</h3>
                    <ul className="mb-20 ml-40">
                        {movie.genres.map((g) => <li> {g}</li> )}
                    </ul>
                </div>
  
                <div>
                    <h3 className="mb-20">Main Cast Members :</h3>
                    <ul className="mb-20 ml-40">
                        {movie.cast.map((c) => <li>{c}</li> )}
                    </ul>
                </div>
            </div>
        </div> }
        </>
    );    

}
```

it's a simple component/page , it takes the page `params` (i learned how it works today) and searches for the movie with the same id then it displays that movies data using the `useEffect` and `useState` hooks 

and also i improved some CSS Styling (god damn i hate CSS) 

that's it for the day 



## Day 4

i was documenting the past 2 days for about 2 hours 💀💀💀 
> documentation takes **forever** 😭

and i added the sorting feature , it's easier than expected (other than sorting in js doesn't make sense)

first i made the function that sorts movies : 
```jsx
export function sortMovies(movies,sortBy,asc) {

    if (asc === '1') {

        return sortBy === 'release_date' ? movies.sort((a,b) => a[sortBy].split('-')[0] - b[sortBy].split('-')[0]) :

            movies.sort((a,b) => a[sortBy] - b[sortBy]) 
    }

    return sortBy === 'release_date' ? movies.sort((a,b) =>  b[sortBy].split('-')[0] - a[sortBy].split('-')[0] ) :

        movies.sort((a,b) =>  b[sortBy] - a[sortBy])            
}
```

> remember a-b -> Ascending / b-a -> Descending 

then we need to use `useState` to track changes for sorting options taken from the user : 
```jsx
    const [sortOptions,setSortOptions] = useState({sortBy : 'vote_count' , asc : '0' })
```

i decided to make it an object instead of 2 hooks 

then this is some basic html for the UI and we link it to the state 
```jsx
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
```

>be careful of snake case 🗿🗿 

then we make the `onChange` function to change the state dynamically 
```jsx
function changeSortOptions(e) {

        const element = e.target.dataset['name']

        let value = e.target.value ;

        setSortOptions(prev => ({...prev,[element] : value }))

    }
```

and the final touch to bring everything together is to change the previous `useEffect` hook to also trigger on change sorting Options 

```jsx
  

    useEffect(() => {

      const start = (page-1) * 20 ;

      const end = start + 20 ;

      console.log(sortOptions.sortBy,typeof sortOptions.asc)

      let mvs = filterMovies(allMovies,filterSettings);

      mvs = sortMovies(mvs,sortOptions.sortBy,sortOptions.asc)

      mvs = mvs.slice(start,end)

  

      setShownMovies(mvs)

    },[sortOptions,filterSettings,page,allMovies])
```

> also don't forget to use `sortMovies()` function 

that's the day , it was mostly documenting 

---
## Day 5
today i learned how to use the `useContext` hook 
#### why did i use a context hook ? 
- previously we were initializing `allMovies` every time we change pages , whenever we click to go to `MovieDetails` or go back to `Home` it re initializes the movies , which is taking performance 
- when going back from `MovieDetails` to home we lose all the sorting options , the sliders and the title 

well we fix that by making a context hook as a parent that will hold all the necessary props and info , so it doesn't forget

that means all the state hooks that were used in Home are going to the context hook (think of it like lifting the state but easier)

i wrote this ([[React Context Hook]]) while learning about that 

anyways i think that's it for this project 
maybe some animation or something but that's it for functionality 

this is the final code for the context hook , Home and MovieDetails 

#### Context Hook
```jsx
import {useEffect, createContext, useState } from "react";

import { filterMovies,sortMovies, loadMovies } from "../Services/movie_searcher";

export const MovieContext = createContext();
  
export function MovieProvider({children}) {
    const [allMovies, setAllMovies] = useState([])
    const [shownMovies, setShownMovies] = useState([])
    const [sortOptions,setSortOptions] = useState({sortBy : 'vote_count' , asc : '0' })
    const [page,setPage] = useState(1);
    const [tagLists,setTagLists] = useState(
      [{tags : [],tagName : ""}, // cast
       {tags : [],tagName : ""}  // genres
      ]
    );
    const [filterSettings,setFilterSettings] = useState({
      title : "",
      voteCount : 0,
      rating : 6 ,
      releaseDate : 1950,
      cast : [],
      genres : []
    })
    useEffect( () => {
      const loadstuff = async () => {
        setAllMovies(await loadMovies())
      }

      loadstuff()

    },[])

  
  

    useEffect(() => {

      const start = (page-1) * 20 ;

      const end = start + 20 ;

      let mvs = filterMovies(allMovies,filterSettings);

      mvs = sortMovies(mvs,sortOptions.sortBy,sortOptions.asc)

      mvs = mvs.slice(start,end)

  

      setShownMovies(mvs)

    },[sortOptions,filterSettings,page,allMovies])

    // when any of tags changes update the settings
    useEffect(() => {
        setFilterSettings(fs => ({...fs,cast : tagLists[0].tags , genres : tagLists[1].tags}))

    },[tagLists[0].tags,tagLists[1].tags])

  

    const getPrevPage = () => {

      setPage(p => p-1 > 0 ? p-1 : 1)

    }

  

    const getNextPage = () => {

      setPage(p => p+1)

    }

    const changeFilterSettings = (e) => {

      const element = e.target.id

      const value = e.target.value

      setFilterSettings(fs => ({...fs , [element] : value}))

    }

  

    function deleteTag(index , tagIndex) {

        setTagLists((prev) =>

                    prev.map((obj,i) =>

                    index === i ? {...obj , tags : obj.tags.filter((t,i) => i !== tagIndex)} : obj )

        )

    }

    function addTag(index) {

        setTagLists((prev) =>

            prev.map((obj,i) =>

                index === i ? {...obj , tags : [...obj.tags ,obj.tagName]} : obj ) )

    }

    function changeTagName(index,e) {

        setTagLists(prev =>

            prev.map((obj,i) => index === i ?

        {...obj,tagName : e.target.value }: obj )

        )

    }

    function changeSortOptions(e) {

        const element = e.target.dataset['name']

        let value = e.target.value ;

        setSortOptions(prev => ({...prev,[element] : value }))

    }

  

    return (
        <MovieContext.Provider value={{
            allMovies,
            shownMovies,
            filterSettings,
            tagLists,
            page,
            deleteTag,
            addTag,
            changeSortOptions,
            sortOptions,
            setPage,
            changeFilterSettings,
            getNextPage,
            getPrevPage,
            changeTagName
        }}>
            {children}
        </MovieContext.Provider>
      );
}
```

#### Home 
```jsx
import { useContext} from 'react'

import Card from '../Components/Card/Card.jsx'

import '../Styles/Home.css';

import Pagination from '../Components/Pagination/Pagination.jsx';

import TagList from '../Components/TagList/TagList.jsx';

import { MovieContext } from '../Context/MovieContext.jsx';

  

function Home() {

    const { sortOptions,changeSortOptions,tagLists,

            deleteTag,addTag,changeTagName,filterSettings,

            changeFilterSettings,shownMovies,page,

            getNextPage,getPrevPage} = useContext(MovieContext);

    console.log({   sortOptions,changeSortOptions,tagLists,

        deleteTag,addTag,changeTagName,filterSettings,

        changeFilterSettings,shownMovies,page,

        getNextPage,getPrevPage})

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
          <input onChange={changeFilterSettings}
            value={filterSettings.title}
            id='title' type='text'/>
          <label htmlFor="voteCount">Vote Count</label>
          <input onChange={changeFilterSettings}
            value={filterSettings.voteCount}
            id="voteCount" type="range" min="10" max="10000"/> {/*vote count*/}
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
            type="ange" min="1950" max="2025"/> {/*release date */}
          <label htmlFor="releaseDate"{filterSettings.releaseDate}</label>
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
```

#### Movie Details
```jsx
import { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { getMovieById } from "../Services/movie_searcher";

import '../Styles/MovieDetails.css'

import { getMovieImg } from "../Services/movie_searcher";

import { MovieContext } from "../Context/MovieContext";

  

function MovieDetails() {

    const params = useParams();

    const [movie,setMovie] = useState();

    const [loading,setLoading] = useState(false)

    const {allMovies} = useContext(MovieContext);

  

    useEffect( () => {

        const loadstuff = async () => {

            setLoading(true)

  

            const movie = await getMovieById(allMovies,params.id)

            console.log(allMovies)

            setMovie(movie)

  

            setLoading(false)

        }

        loadstuff()

      },[params])

  
  

    return (

        <>

        {loading && "LOADING" }

        {!loading && movie &&

        <div className="movieContainer">

  

            <div className="movieImg">

                <h1 className="ml-20" >{movie.title}</h1>

                <h3 className="ml-20" >{movie.release_date}</h3>

                <img src={getMovieImg(movie.poster_path)} />

            </div>

            <div className="movieDetails">

                <h3 className="mb-20">Rating : {movie.vote_average}</h3>

                <h3 className="mb-20">Vote Count : {movie.vote_count}</h3>

                <div>

                    <h3 className="mb-20">Overview : </h3>

                    <p className="ml-20">{movie.overview}</p>

                </div>

                <div>

                    <h3 className="mb-20">Genres :</h3>

                    <ul className="mb-20 ml-40">

                        {movie.genres.map((g) => <li> {g}</li> )}

                    </ul>

                </div>

  

                <div>

                    <h3 className="mb-20">Main Cast Members :</h3>

                    <ul className="mb-20 ml-40">

                        {movie.cast.map((c) => <li>{c}</li> )}

                    </ul>

                </div>

            </div>

        </div> }

        </>

    );    

}

  

export default MovieDetails;
```



---
## Day 6 

well sadly this day i decided (sadly) that i want to deploy this app , upload it on github and add to my portfolio 

well , now i need to fix some stuff , add polish and add little QOL features when as i go 

--- 
i made a feature so when the user click `/` it goes to the search title (focus the text input)

so to do that using react 
- we'll use the `useRef` hook to ref the text input 
- we'll use the `useEffect` hook to initialize an `EventListener` that will listen for a `keydown` event
- then if the key is `/` we focus the input 

```jsx
const textRef = useRef();
    useEffect(() => {
        const handleFocus = (e) => {
            if (e.key === '/'){
                e.preventDefault()
                textRef.current.focus()
            }
        }
  
        window.addEventListener('keydown',handleFocus)
        return () => {							       window.removeEventListener('keydown',handleFocus)
  
        }
    })
```

>the `e.preventDefault()` here so it doesn't do the default action which is typing the letter `/`

>don't forget to remove the `EventListener` at the end of the `useEffect` so it removes it when the component unmounts

---
i also made an error page it's as simple as this 
```jsx
<Route path="*" element={<Error />} />
```
and this is the error page context : 
```jsx
function Error() {
    return (
        <div className='Error'>
            <h1>404</h1>
            <h1>Bro , this place Doesn't Exist </h1>
            <h1>❔❔❕❔❔</h1>

        </div>
    );
}
```

this was easier than expected 

--- 
i also made some optimizations (it feels really good making optimizations)

this is basically the main `useEffect` hook : 
it is used for
- updating movies when the 
	- sorting options change
	- filter settings change
- also for pagination 
```jsx
  useEffect(() => {

    const start = (page - 1) * moviesPerPage;
    const end = start + moviesPerPage;
    let mvs = filterMovies(allMovies, filterSettings);
    mvs = sortMovies(mvs, sortOptions.sortBy, sortOptions.asc);

    setAllShownMovies(mvs)

    mvs = mvs.slice(start, end);

    setShownMovies(mvs);
  }, [sortOptions, filterSettings, page, allMovies]);
```

the problem here that every time the user switches pages this hook would trigger 
and filter and sort `allMovies` , which is very unnecessary 

#### how do we fix that ? 
i will make a `useState` hook called `allShownMovies` that will hold all the movies after being filtered and sorted , and then will will slice this array to get `shownMovies` 

to do that we'll have to split the `useEffect` hook : 
```jsx
useEffect(() => {

    let mvs = filterMovies(allMovies, filterSettings);
    mvs = sortMovies(mvs, sortOptions.sortBy, sortOptions.asc);
    setAllShownMovies(mvs)
  
  },[sortOptions, filterSettings,allMovies ])

  useEffect(() => {
    const start = (page - 1) * moviesPerPage;
    const end = start + moviesPerPage;
    setShownMovies(allShownMovies.slice(start,end));

  }, [allShownMovies,page]);
```

so the first hook would be responsible for filtering and sorting the movies when any of the settings change 

>note : i think `useMemo` could work because it's a 'heavy calculation' but i would need to learn it first 🗿🗿

the second hook would be responsible for navigating between pages much faster 

> i think a disadvantage of this solution is it takes 1 more state re-render but it's probably worth it 

 **actually this optimization allowed me to do this** : 
```jsx
const getNextPage = () => {

    const n = Math.ceil(filterMovies(allMovies,filterSettings).length / moviesPerPage); //maximim number of pages

    setPage((p) => (p + 1 > n ? p : p + 1));
  };
```

it allowed me to change it so the user can't get the next page forever and nothing is stopping him 

why wasn't that possible before ? 

because i could never access what the length of the shown movies is , because it would be sliced to 20 movies first , so it's always 20 

but now `allShownMovies` don't is the full length of shown movies 

--- 
i also made a neat spinner with CSS `keyframes` but it's not working right 
i will continue tomorrow

## Day 7 

I learned [[How Websites Load]] and through that i was able to correctly show my spinner load animation 

this is the `index.html` 
```jsx
<h2 class="text">Loading 9000 Movies ... 🗿</h2>
<div class="spinner"></div>
<div id="root"></div>
```

>the `#root` is basically the react App component

then when all the CSS , JavaScript and react loads 

we remove the elements in `main.jsx` in vanilla JavaScript fashion 
```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>,
)
  
const text = document.querySelector('.text')
const spinner = document.querySelector('.spinner')
  
text.remove()
spinner.remove()
```

i uploaded the project to [[GitHub]] and cleaned the project from unwanted files 

i made the sliders and inputs section and also cards look much much better 

the styling always takes way too much time 😭😭


## Day 8 

I making a feature where the user can favorite a movie and save the movie to local storage so it will be remembered after , this is possible through a context hook which will store , add , remove favorites 
this the code for it :
1. the `favorites` state hook that will store movies in state , it's initialized from `localstorage` and if it's empty then it's a list 
```jsx
const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem("favorites")) || []
    );
```
2. some simple logic functions to add/remove/check the favorites 
```jsx
function isFavorite(id) {
        return favorites.some((m) => m.id === id);
    }
function addFavorite(movie) {
	setFavorites((f) => [...f, movie]);
}
function removeFavorite(id) {
	setFavorites((f) => f.filter((m) => m.id !== id));
    }
```
3. a `useEffect` hook to update `localstorage` whenever favorites change
```jsx
useEffect(() => {
	localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites]);
```
4. then you just pass the favorites and functions into the `value` in the context provider check [[react-router-dom]]

---

i also changed the `Card` Component to add a button to add/remove favorites , this is the current `Card` component : 
```jsx
<div className={styles.card}>
            <Link to={`movie/${movie.id}`} className={styles.poster}>
                <img
                    className={styles.poster}
                    alt="moviePhoto"
                    src={getMovieImg(movie.poster_path)}
                    loading="lazy"
                ></img>
            </Link>
            <h3 className={styles.title}>{movie.title}</h3>
            <p className={styles.releaseDate}>
                {movie.release_date.split("-")[0]}
            </p>
            <button
                onClick={() =>
                    isFavorite(movie.id)
                        ? removeFavorite(movie.id)
                        : addFavorite(movie)
                }
                className={`${styles.heart} ${
                    isFavorite(movie.id) ? styles.active : ""
                }`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                </svg>
            </button>
        </div>
```

the `onClick` function checks if the movie is favorited or not then add/remove it from favorites accordingly 

--- 
i added a button in `MovieDetails` so users can favorite/unfavorite the movie inside said page 

i literally copy pasted the button and changed the positioning and styling a bit (which takes forever)


---
MORE STYLING 😤😤😤

and i made sure things are responsive 

---
i made the favorites page it was really simple , it's basically the easy part of the home page it just this : 
```jsx
<div className="cardList">
            {favorites.map((m) => (
                <Card key={m.id} movie={m} />
            ))}
            </div>
```
and using the favorites context hook 
```jsx
const { favorites } = useContext(FavoriteContext);
```

i also used the same logic for the search bar and added it to the favorites page (the one with the `/` goes to the search bar)

> i should probably make it it's own component 

i also used a similar method to filter movies like Home 
```jsx
const { favorites } = useContext(FavoriteContext);
    const [ shownFavorites, setShownFavorites ]= useState([]);
    const [search, setSearch] = useState("");
    const textRef = useRef();
  
    useEffect(() => {
        setShownFavorites(
            filterMovies(favorites, {
                title: search,
                voteCount: 10,
                rating: 6,
                cast: [],
                releaseDate: 1950,
                genres: [],
            })
        );
    }, [search,favorites]);
```
this so i can filter through favorite movies using a text input 

--- 
i also added a function to redirect to `yts.mx` to download the movie 

i commented it and replaced it with IMDB

--- 
i used a python script to get the data for the autocomplete feature 
```python
import json
with open("final_movies_v4.json") as file :
    data = json.load(file)
genres = set()
cast = set()
for movie in data :
    for genre in movie.get("genres") :
        if genre in genres :
            continue
        else :
            genres.add(genre)
    for castMember in movie.get("cast") :
        if castMember in cast :
            continue
        else :
            cast.add(castMember)

with open("cast.txt","w",encoding="utf-8") as file :

    file.write("[ \n")

    for castMember in list(cast) :

        file.write(f'"{castMember}", \n')

    file.write("] \n")

with open("genres.txt","w") as file :

    file.write("[ \n")

    for genre in list(genres) :

        file.write(f'"{genre}", \n')

    file.write("] \n")
```

the cast members were just a casual 18k + 😤😤😤😤😤😤😤😤😤😤😤😤😤😤😤😤😤😤😤😤😤😤


OK , let's break it down , what is the auto complete feature ? 
- it's basically a huge list of all possible choices
- then it filters things based on what the user inputs 

let's do this 
1. we'll add a div that will contain the auto Complete list 
```jsx
<div className={styles.autoComplete}>
                {shownList.map((i,index) => <p key={index}>{i}</p>)}
            </div>
```
2. then we will make a filter function that will filter the ==full== list of possible choices given to the component and store the filtered in state 
```jsx
function filterList(tagName) {
        if (tagName.trim() === "") return
        const regex = new RegExp(tagName,"i")
        setShownList(autoCompleteList.filter(i => i.match(regex)).slice(0,10))
    }
```

> regex here could be a possible issue as it's slow but it's fine for now 

3. when do we need to trigger this function ? ... when the user types aka when the `onChange` event happens 
```jsx
<input
	value={tagName}
	onChange={(e) => {
		filterList(e.target.value)
		onChange(e)}}
	type="text"
/>
```

> don't pass the `tagName` as it's the previous value that will be updated to `e.target.value`

4. now we're down with filtering , now we need to add the tag if the user clicks on the auto complete , so we'll need to add an `onClick` to each `<p>`
```jsx
{shownList.map((i,index) => <p key={index} onClick={(e) => handlePtagClick(e)}>{i}</p>)}
```

5. then we'll implement the function to add the value of the `<p>` to the tags
```jsx
function handlePtagClick(e) {
        const value = e.target.textContent
        if (tags.some(t => t===value)) return
        addTag(value)
        setShownList([])
        onChange({ target: { value: "" } }); // Reset the input by simulating an empty input change
    }
```
6. it may seem that we are done , but there's a problem : the `addTag` doesn't take a value , this is the current `addTag` :
```jsx
function addTag(index) {
    setTagLists((prev) =>
      prev.map((obj, i) =>
        index === i ? { ...obj, tags: [...obj.tags, obj.tagName] } : obj
      )
    );
  }
```
the problem here that the `addTag` doesn't take a value , it always updates the tag list from state , so we'll need to modify it so it can take a value 
```jsx
function addTag(index,value) {
    setTagLists((prev) =>
      prev.map((obj, i) =>
        index === i ? { ...obj, tags: [...obj.tags, value ?? obj.tagName] } : obj
      )
    );
  }
```
now it can take a value , and if the value isn't given (`unidentified`) it will update from state 

7. now we just need to update this accordingly in the Home component (where the context is used)
```jsx
<label>Cast</label>
<TagList
	tags={tagLists[0].tags}
	deleteTag={(tagIndex) => deleteTag(0, tagIndex)}
	addTag={(value) => addTag(0, value)}
	tagName={tagLists[0].tagName}
	onChange={(e) => changeTagName(0, e)}
	autoCompleteList={castMembers}
/>
```
here we'll pass the `value` which was given from the `TagList`


I know it's very confusing but think of it like this 

```jsx
function addTag_TagList(value) {

	function addTag_Context(index,value){
		// logic 
	}
	addTag_Context(index,value)
}
```

like a closure 


--- 

## Day 9 

i took a small [[Framer-Motion]] course , i probably should have started the project with that to animate everything else , but it's okay 

I want to make a dropdown menu to navigate through pages (home, favorites, credits)

i want it to look like a movie film VHS or something (🔥 idea)

and it's going to be a component so it's reusable through all pages 

--- 
ok this is the component i came up with 
it doesn't need explaining as it's self explanatory 
```jsx
import { Link } from "react-router-dom";

import styles from "./DropdownMenu.module.css";

import { motion } from "framer-motion";

import { useState, useRef } from "react";

function DropdownMenu() {

    const [clicked, setClicked] = useState(false);

    const filmRef = useRef();

    const MotionLink = motion(Link);

    return (

        <>

            <motion.div

                onClick={() => setClicked(!clicked)}

                ref={filmRef}

                className={styles.container}

                initial={{

                    y: "-90%",

                }}

                animate={clicked ? "dropdown" : "initial"}

                variants={{

                    dropdown: {

                        y: "-10%",

                    },

                }}

                transition={{ type: "spring", stiffness: 200, damping: 15 }}

  

            >

                <nav className={styles.film}>

                    <MotionLink to={'/'}

                        whileHover={{

                            scale: 1.1,

                            rotate: "2.5deg",

                        }}

                        className={styles.link}

                    >

                        Home

                    </MotionLink>

                    <MotionLink to={'/favorites'}

                        whileHover={{

                            scale: 1.1,

                            rotate: "-2.5deg",

                        }}

                        className={styles.link}

                    >

                        Favorites

                    </MotionLink >

                    <MotionLink to={'/credits'}

                        whileHover={{

                            scale: 1.1,

                            rotate: "2.5deg",

                        }}

                        className={styles.link}

                    >

                        Credits

                    </MotionLink>

                </nav>

            </motion.div>

        </>

    );

}

  

export default DropdownMenu;
```

this took way longer than i wanted because : 
1. i HATE CSS 
2. first time dealing with [[Framer-Motion]]

--- 
anyways i also figured out you can animate entire pages , as they are just normal component 

we'll need the `<AnimatePresense>` to wrap everything up with it 

```jsx
<AnimatePresence mode="wait">
<DropdownMenu />
<Routes>
	<Route path="/" element={<Home />} />
	<Route
		path="/movie/:id"
		element={<MovieDetails />}
	/>
	<Route path="favorites" element={<Favorites />} />
	<Route path="*" element={<Error />} />
</Routes>
</AnimatePresence>
```

so `AnimatePresense` is basically for dealing with component exiting the DOM 


>a cool trick is to have `<DropdownMenu>` in the `App` , and not in every component as it won't reset and will complete it's animation
---

and you have to add these to each page so it looks like sliding 
```jsx
<motion.div
initial = {{
	x : -20 ,
	opacity : 0
}}
animate = {{
	x : 0 ,
	opacity : 1
}}
exit={{
	x : -20 ,
	opacity : 0
}}
transition={{duration : 0.4 , type : 'spring'}}
>
```

and alternate between negative and positive for different pages 

--- 
then i spent forever trying to animate a star rating thing and it doesn't look good and fuck it i'm done for today 

tomorrow is probably the last day , i will just learn about `useMemo` and stuff and ship it
also the credit page


## Day 10 

hopefully the last day 

today i learned about `useMemo` and found a place in my code that could use it , so it's refactoring time

this is in the `MovieContext`
```jsx
const [allMovies, setAllMovies] = useState([]);
  const [shownMovies, setShownMovies] = useState([]);
  const [allShownMovies,setAllShownMovies] = useState([]);
  const [sortOptions, setSortOptions] = useState({
    sortBy: "vote_count",
    asc: "0",
  });
  const [page, setPage] = useState(1);

  const [filterSettings, setFilterSettings] = useState({
    title: "",
    voteCount: 0,
    rating: 6,
    releaseDate: 1950,
    cast: [],
    genres: [],
  });

  const moviesPerPage = 20;


  useEffect(() => {
    let mvs = filterMovies(allMovies, filterSettings);
    mvs = sortMovies(mvs, sortOptions.sortBy, sortOptions.asc);
    setAllShownMovies(mvs)
  },[sortOptions, filterSettings,allMovies ])

  useEffect(() => {
    const start = (page - 1) * moviesPerPage;
    const end = start + moviesPerPage;
    setShownMovies(allShownMovies.slice(start,end));
  }, [allShownMovies,page]);
```

searching for "Heavy Calculations" , well filtering through 9k movies and then sorting the rest , yeah that's pretty **Heavy**

in the first `useEffect` when any of `sortOptions, filterSettings,allMovies` change it causes allshownmovies to re-render which triggers the second `useEffect` which causes another re-render 

so changing any of these causes 3 re-renders


now this is an improvement : 

first we remove these 
```jsx
const [shownMovies, setShownMovies] = useState([]);
const [allShownMovies,setAllShownMovies] = useState([]);
```

then we change these : 

```jsx
const allShownMovies = useMemo(() => {
    let mvs = filterMovies(allMovies, filterSettings);
    mvs = sortMovies(mvs, sortOptions.sortBy, sortOptions.asc);
    return mvs;

  },[sortOptions, filterSettings,allMovies ])
  const shownMovies = useMemo(() => {
    const start = (page - 1) * moviesPerPage;
    const end = start + moviesPerPage;
    return allShownMovies.slice(start,end);
  }, [allShownMovies,page]);
```

now I'm sure that the first one is necessary because it's a heavy calculation 

I'm not sure about the second `useMemo` but it saves 1 re-renders so 🤷🤷

---

now when changing any of `sortOptions, filterSettings,allMovies` (which causes 1 re-render) the first useMemo triggers (doesn't cause rerenders) then the second one triggers (doesn't cause re-renders)

IMPROVEMENT : 
- we got rid of 2 `useState` hooks (cleaner code)
- took down re-renders from 3 to 1 when changing any of the settings 

--- 
i also added this for fun 
in movie details if you type the word "pirate" you get an alert that says you area a pirate 

this is so dumb lol 
```jsx
useEffect(() => {

        const handler = (e) => {

            const key = e.key.toLowerCase();

            setSecretKey((prevKeys) => {

                const updated = [...prevKeys, key].slice(-6); // keep last 6 keys

                if (updated.join("") === "pirate") {

                    alert("you are a pirate");

                    setPirate(true)

                }

                return updated;

            });

        };

        window.addEventListener("keydown", handler);

        return () => window.removeEventListener("keydown", handler);
    }, []); 
```

i also made the credits page to credit [[TMDB_API]] for the free api usage 

which is very simple. 

i don't think my code needs `useCallBack`


## Day 11 (bonus day)

fixed a bug with `animatePresense` (it can't render multiple routes at once) , it need to wrap the whole application 

also motion() is deprecated use `motion.create()`

---
i made the loading animation spinner responsive 


---


also i'm making the [[MoovieMood-README]] 


---
okay deploying in [[Vercel]] was freaking easy stuff 



## TODOs : 
- [x] ADD tag elements for cast and genres 
- [x] also implement the title search bar  
- [x] also add a page you can get to by clicking on a movie , it will show the movies details
- [x] add sorting to the movies
- [x] _better styling_ 💀
- [x] finish the documentation😭😭
- [x] make a note about [[react-router-dom]]
- [x] **maybe** ... **maybe** ... try a testing library like [[Jest]]  or animation like [[Framer-Motion]] to experiment with animation and styling 
- [x] make a context hook so you only have to load all the movies once in the whole user session and not every time the page changes from movie details to home (**much** better performance)
- [x] make a context hook so when i go back from `MovieDetails` to `Home` it remembers the options so it still shows the same movies , it will store all the options including the sliders , tags and sorting 
- [x] learn about `useMemo` & `useCallBack`
- [x] add a feature when writing in cast / genres to suggest what you're writing (i have no idea how that works )

### i decided to deploy the project
so for that i will need to make some things 
- [x] upload it to [[GitHub]] 
- [x] make it look better (especially the sliders and inputs)
- [x] make some better performance (in progress)
- [x] find a better way to access the movies instead of a 13mb  JSON file 
- [x] learn the deploy process in site like [[Vercel]] or [[netlify]]
- [x] make a error page 
- [x] add a feature when clicking '/' it goes to the search 
- [x] make it so when there is no more movies to show , you can't get the next page (pagination)
- [x] make a loading spinner while the page loads for the initial time
- [x] make a feature so you can favorite movies and show them in a another pages (probably by making another context hook) 
- [x] so make a favorites page 
- [ ] ~~add a cool animation / transition for the rating in `MovieDetails`~~ 
- [x] add to `MovieDetails` a button to show if it's favorited or not 
- [x] add a `yts.mx` to the movie in `MovieDetails`
- [x] add a page to credit [[TMDB_API]]? 
- [x] make some kind of drop down to navigate to favorites page or credits 
- [x] i should probably make the search bar it's own component instead of copy pasting 
- [x] find a way to store the cast members in a good way 
- [x] make a good README 







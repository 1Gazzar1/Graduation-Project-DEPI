import { useContext } from "react";
import Card from "../Components/Card/Card.jsx";
import "../Styles/Home.css";
import Pagination from "../Components/Pagination/Pagination.jsx";
import TagList from "../Components/TagList/TagList.jsx";
import { MovieContext } from "../Context/MovieContext/MovieContextHook.jsx";
import SearchBar from "../Components/SearchBar/SearchBar.jsx";
import { motion as Motion } from "framer-motion";

function Home() {
    const {
        autoCompleteCastMembers,
        autoCompleteMovieGenres,
        sortOptions,
        changeSortOptions,
        tagLists,
        deleteTag,
        addTag,
        changeTagName,
        filterSettings,
        changeFilterSettings,
        shownMovies,
        page,
        getNextPage,
        getPrevPage,
    } = useContext(MovieContext);

    return (
        <Motion.div
            initial={{
                x: -20,
                opacity: 0,
            }}
            animate={{
                x: 0,
                opacity: 1,
            }}
            exit={{
                x: -20,
                opacity: 0,
            }}
            transition={{ duration: 0.4, type: "ease" }}
        >
            <div className="filtersContainer">
                <div className="filterSettings">
                    <div>
                        <SearchBar
                            labelText={"Title"}
                            onChange={changeFilterSettings}
                            searchVal={filterSettings.title}
                        />
                    </div>
                    <div>
                        <label htmlFor="voteCount">Vote Count</label>
                        <input
                            onChange={changeFilterSettings}
                            value={filterSettings.voteCount}
                            id="voteCount"
                            type="range"
                            min="250"
                            max="10000"
                        />{" "}
                        {/*vote count*/}
                        <label htmlFor="voteCount">
                            {filterSettings.voteCount}
                        </label>
                    </div>
                    <div>
                        <label htmlFor="rating">Rating</label>
                        <input
                            onChange={changeFilterSettings}
                            value={filterSettings.rating}
                            id="rating"
                            type="range"
                            min="6"
                            max="9"
                            step="0.1"
                        />{" "}
                        {/*rating*/}
                        <label htmlFor="rating">{filterSettings.rating}</label>
                    </div>
                    <div>
                        <label htmlFor="releaseDate">Release Date</label>
                        <input
                            onChange={changeFilterSettings}
                            value={filterSettings.releaseDate}
                            id="releaseDate"
                            type="range"
                            min="1950"
                            max="2025"
                        />{" "}
                        {/*release date */}
                        <label htmlFor="releaseDate">
                            {filterSettings.releaseDate}
                        </label>
                    </div>
                    <div>
                        <label>Cast</label>
                        <TagList
                            tags={tagLists[0].tags}
                            deleteTag={(tagIndex) => deleteTag(0, tagIndex)}
                            addTag={(value) => addTag(0, value)}
                            tagName={tagLists[0].tagName}
                            onChange={(e) => changeTagName(0, e)}
                            autoCompleteList={autoCompleteCastMembers}
                        />
                    </div>
                    <div>
                        <label>Genres</label>
                        <TagList
                            tags={tagLists[1].tags}
                            deleteTag={(tagIndex) => deleteTag(1, tagIndex)}
                            addTag={(value) => addTag(1, value)}
                            tagName={tagLists[1].tagName}
                            onChange={(e) => changeTagName(1, e)}
                            autoCompleteList={autoCompleteMovieGenres}
                        />
                    </div>
                </div>
                <div className="filterControls">
                    <label>Sort By :</label>
                    <select
                        data-name="sortBy"
                        value={sortOptions.sortBy}
                        onChange={(e) => changeSortOptions(e)}
                    >
                        <option value={"vote_count"}>Vote Count</option>
                        <option value={"vote_average"}>Rating</option>
                        <option value={"release_date"}>Release Date</option>
                    </select>
                    <select
                        data-name="asc"
                        value={sortOptions.asc}
                        onChange={(e) => changeSortOptions(e)}
                    >
                        <option value="0">Dsc</option>
                        <option value="1">Asc</option>
                    </select>
                </div>
            </div>

            <div className="cardList">
                {shownMovies.map((movie) => (
                    <Card key={movie.id} movie={movie} />
                ))}
            </div>
            <Pagination
                page={page}
                nextPage={getNextPage}
                prevPage={getPrevPage}
            />
        </Motion.div>
    );
}

export default Home;

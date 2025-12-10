import { useEffect, useState, useMemo } from "react";
import {
    filterMovies,
    sortMovies,
    loadMovies,
    gatherCastMember,
    gatherMovieGenres,
} from "../../Services/movie_searcher";
import { MovieContext } from "./MovieContextHook";

export function MovieProvider({ children }) {
    const [allMovies, setAllMovies] = useState([]);
    const [sortOptions, setSortOptions] = useState({
        sortBy: "release_date",
        asc: "0",
    });
    const [page, setPage] = useState(1);
    const [tagLists, setTagLists] = useState([
        { tags: [], tagName: "" }, // cast
        { tags: [], tagName: "" }, // genres
    ]);
    const [filterSettings, setFilterSettings] = useState({
        title: "",
        voteCount: 0,
        rating: 6,
        releaseDate: 1950,
        cast: [],
        genres: [],
    });
    const [loading, setLoading] = useState(true);
    // these are for the autoComplete Tags
    const [autoCompleteCastMembers, setAutoCompleteCastMembers] = useState([]);
    const [autoCompleteMovieGenres] = useState(gatherMovieGenres());

    const moviesPerPage = 20;

    useEffect(() => {
        const loadstuff = async () => {
            const allLoadedMovies = await loadMovies();
            // load the movies then pass it to allMovies and the autoComplete list.
            setAllMovies(allLoadedMovies);
            setAutoCompleteCastMembers(gatherCastMember(allLoadedMovies));
            setLoading(false);
        };
        loadstuff();
    }, []);

    const allShownMovies = useMemo(() => {
        let mvs = filterMovies(allMovies, filterSettings);
        mvs = sortMovies(mvs, sortOptions.sortBy, sortOptions.asc);
        return mvs;
    }, [sortOptions, filterSettings, allMovies]);

    const shownMovies = useMemo(() => {
        const start = (page - 1) * moviesPerPage;
        const end = start + moviesPerPage;

        return allShownMovies.slice(start, end);
    }, [allShownMovies, page]);

    // when any of tags changes update the settings
    // this way feels dumb but i don't think it's that bad
    useEffect(() => {
        setFilterSettings((fs) => ({
            ...fs,
            cast: tagLists[0].tags,
            genres: tagLists[1].tags,
        }));
    }, [tagLists[0].tags, tagLists[1].tags]);

    const getPrevPage = () => {
        setPage((p) => (p - 1 > 0 ? p - 1 : 1));
    };

    const getNextPage = () => {
        const n = Math.ceil(
            filterMovies(allMovies, filterSettings).length / moviesPerPage,
        ); //maximim number of pages
        setPage((p) => (p + 1 > n ? p : p + 1));
    };
    const changeFilterSettings = (e) => {
        const element = e.target.id;
        const value = e.target.value;
        setFilterSettings((fs) => ({ ...fs, [element]: value }));
    };

    function deleteTag(index, tagIndex) {
        setTagLists((prev) =>
            prev.map((obj, i) =>
                index === i
                    ? {
                          ...obj,
                          tags: obj.tags.filter((t, i) => i !== tagIndex),
                      }
                    : obj,
            ),
        );
    }
    function addTag(index, value) {
        setTagLists((prev) =>
            prev.map((obj, i) =>
                index === i
                    ? { ...obj, tags: [...obj.tags, value ?? obj.tagName] }
                    : obj,
            ),
        );
    }
    function changeTagName(index, e) {
        setTagLists((prev) =>
            prev.map((obj, i) =>
                index === i ? { ...obj, tagName: e.target.value } : obj,
            ),
        );
    }
    function changeSortOptions(e) {
        const element = e.target.dataset["name"];
        let value = e.target.value;

        setSortOptions((prev) => ({ ...prev, [element]: value }));
    }

    return (
        <MovieContext.Provider
            value={{
                allMovies,
                autoCompleteCastMembers,
                autoCompleteMovieGenres,
                shownMovies,
                filterSettings,
                tagLists,
                page,
                sortOptions,
                loading,
                deleteTag,
                addTag,
                changeSortOptions,
                setPage,
                changeFilterSettings,
                getNextPage,
                getPrevPage,
                changeTagName,
            }}
        >
            {children}
        </MovieContext.Provider>
    );
}

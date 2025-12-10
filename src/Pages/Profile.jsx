import { useContext, useMemo } from "react";
import { LibraryContext } from "../Context/LibraryContext/LibraryContextHook";
import ProfileCard from "../Components/ProfileCard/ProfileCard";
import "../Styles/Profile.css";
import { PieChartWithCustomizedLabel } from "../Components/PieChart/PieChartWithCustomizedLabel";
import CustomBarChart from "../Components/BarChart/CustomBarChart";
import {
    getAvgRating,
    getMostNWatchedActors,
    getMostNWatchedGenres,
    getTotalMovies,
    getWatchedMoviesPerMonth,
} from "../util/ProfileUtils";
import StarIcon from "../Components/icons/StarIcon";
import FilmIcon from "../Components/icons/FilmIcon";
import FireIcon from "../Components/icons/FireIcon";
import CalenderIcon from "../Components/icons/CalenderIcon";
import ChartIcon from "../Components/icons/CharIcon";
import NoMovies from "../Components/NoMovies/NoMovies";
import { motion as Motion } from "framer-motion";

function Profile() {
    const { movies, getMovieWatchedAt } = useContext(LibraryContext);
    const COLORS = ["#8884d8", "#7a76c2", "#5e5b96", "#535285"];

    const numberOfMovies = getTotalMovies(movies);

    const watchedGenres = useMemo(
        () => getMostNWatchedGenres(movies, 4),
        [movies],
    );
    const watchedActors = useMemo(
        () => getMostNWatchedActors(movies, 5),
        [movies],
    );
    const watchedMovies = useMemo(
        () => getWatchedMoviesPerMonth(movies, 6, getMovieWatchedAt),
        [movies],
    );

    const profileCardsTop = [
        {
            title: (
                <>
                    <FilmIcon />
                    <span>Watched Movies</span>
                </>
            ),
            content: numberOfMovies,
            footer: "Rookie Numbers 🗿",
        },
        {
            title: (
                <>
                    <StarIcon />
                    <span>Average Rating</span>
                </>
            ),
            content: getAvgRating(movies),
            footer: `Based on ${numberOfMovies}`,
        },
        {
            title: (
                <>
                    <FireIcon />
                    <span>Favorite Genre</span>
                </>
            ),
            content: watchedGenres[0]?.name || "",
            footer: `Based on ${watchedGenres[0]?.value || ""} Movies`,
        },
    ];

    const profileCharts = [
        {
            title: (
                <>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                    >
                        <path d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z" />
                    </svg>
                    <b>No. Movies</b>
                </>
            ),
            content: <CustomBarChart data={watchedMovies} />,
        },
        {
            title: (
                <>
                    <CalenderIcon />
                    <b>Favorite Genres</b>
                </>
            ),
            content: (
                <PieChartWithCustomizedLabel
                    colors={COLORS}
                    data={watchedGenres}
                />
            ),
        },
    ];

    return (
        <Motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "ease", duration: 0.6 }}
        >
            {movies && movies.length > 0 ? (
                <>
                    <div className="profilePageStatement">
                        <h1>Your Movie Stats</h1>
                        <p style={{ color: "#b5b5b5" }}>
                            yes, you watch trash sometimes.
                        </p>
                    </div>

                    <div className="profileCardContainer">
                        {profileCardsTop.map((card, i) => (
                            <ProfileCard
                                key={i}
                                title={card.title}
                                content={card.content}
                                footer={card.footer}
                            />
                        ))}
                    </div>

                    <div className="profileCardContainer">
                        {profileCharts.map((card, i) => (
                            <ProfileCard key={i} title={card.title}>
                                {card.content}
                            </ProfileCard>
                        ))}
                    </div>

                    <div className="profileCardContainer">
                        <ProfileCard
                            title={
                                <>
                                    <ChartIcon />
                                    <b>Most Watched Actors</b>
                                </>
                            }
                        >
                            <CustomBarChart data={watchedActors} />
                        </ProfileCard>
                    </div>
                </>
            ) : (
                <NoMovies />
            )}
        </Motion.div>
    );
}

export default Profile;

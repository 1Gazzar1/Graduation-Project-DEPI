import requests
import json
import time
import os 

movieArray = []
apiKey = os.getenv('TMDB_API_KEY')

if not apiKey : 
    print("api key not valid")
    exit()

startTime = time.time()
wait_time = 0.3

def fetchMovies(movieArray,apiKey,releaseDate_gte = '1950-01-01',releaseDate_lte = '1970-01-01',
                sort_by= 'vote_average.desc',vote_average_gte = 6,
                vote_count_gte = 100 , page = 1 ) : 
    url = f"https://api.themoviedb.org/3/discover/movie?api_key={apiKey}&primary_release_date.lte={releaseDate_lte}&primary_release_date.gte={releaseDate_gte}&sort_by={sort_by}&vote_average.gte={vote_average_gte}&vote_count.gte={vote_count_gte}&page={page}"
    response = requests.get(url)
    
    if (response.status_code < 300) : 
        data = json.loads(response.content)
        for oldMovieFormat in data['results'] : 
            movie = formatMovie(oldMovieFormat)
            movieArray.append(movie)

def fetchNumofPages(apiKey,releaseDate_gte = '1950-01-01',releaseDate_lte = '1970-01-01',
                vote_average_gte = 6,sort_by= 'vote_average.desc',
                vote_count_gte = 100 , page = 1 ) : 
    url = f"https://api.themoviedb.org/3/discover/movie?api_key={apiKey}&primary_release_date.lte={releaseDate_lte}&primary_release_date.gte={releaseDate_gte}&sort_by={sort_by}&vote_average.gte={vote_average_gte}&vote_count.gte={vote_count_gte}&page={page}"
    
    response = requests.get(url)
    
    if (response.status_code < 300) : 
        data = json.loads(response.content)
        return data['total_pages']


def formatMovie(oldMovieFormat): 
    return {
            "id": oldMovieFormat['id'],
            "release_date": oldMovieFormat['release_date'],
            "title": oldMovieFormat['title'],
            "vote_average": oldMovieFormat['vote_average'],
            "vote_count": oldMovieFormat['vote_count'],
            "genre_ids": oldMovieFormat['genre_ids'],
            "poster_path": oldMovieFormat['poster_path'],
            "overview": oldMovieFormat['overview'],
            }

    



decades = [
    ('1960-01-01', '1969-12-31'),
    ('1970-01-01', '1979-12-31'),
    ('1980-01-01', '1989-12-31'),
    ('1990-01-01', '1999-12-31'),
    ('2000-01-01', '2009-12-31'),
    ('2010-01-01', '2019-12-31'),
    ('2020-01-01', '2025-12-31')
]

for start , end in decades : 
    numofPages = fetchNumofPages(apiKey,start,end)

    if type(numofPages) != int : continue

    for i in range(numofPages):
        print(f"Fetching Movies from : {start} , Page : {i+1} Out of {numofPages}")
        fetchMovies(movieArray,apiKey,start,end,page=i+1,vote_count_gte=250)
        time.sleep(wait_time)

print(f'initial fetching took {(time.time() - startTime)/60} mins')
print("---------starting to replace cast and genres---------")

genres = {
    28:"Action",

    12: "Adventure",

    16: "Animation",

    35: "Comedy",

    80: "Crime",

    99: "Documentary",

    18: "Drama",

    10751: "Family",

    14: "Fantasy",

    36: "History",

    27: "Horror",

    10402: "Music",

    9648: "Mystery",

    10749: "Romance",

    878: "Science Fiction",

    10770: "TV Movie",

    53: "Thriller",

    10752: "War",

    37: "Western",
}


def fetchCastByMovieId(apiKey,id) : 
    url = f"https://api.themoviedb.org/3/movie/{id}/credits?api_key={apiKey}"
    response = requests.get(url)

    data = response.json()

    castMembers = []

    cast_list = data.get('cast', [])

    for member in cast_list[:5]:
        castMembers.append(member.get('name', 'Unknown'))
    
    
    return castMembers

def mapGenres(genreIds):
    return [ genres.get(id, "Unknown") for id in genreIds ]





for i,movie in enumerate(movieArray) : 
    print(f'Processing movie {i+1}/{len(movieArray)}: {movie.get("title", "Unknown Title")}')

    movie_id = movie.get('id')

    # add the cast members to the movie dict
    if movie_id:
        movie["cast"] = fetchCastByMovieId(apiKey, movie_id)

        # add 'genres' property and remove 'genre_ids'
        movie["genres"] = mapGenres( movie["genre_ids"])
        movie.pop('genre_ids')

    time.sleep(wait_time)

with open("movies.json","w",encoding='utf-8') as file : 
    json.dump(movieArray,file, indent=0)
        
print('Saved movies to movies.json')

endTime = time.time()

print(f"all fetching took {(endTime - startTime) / 60 } mins")
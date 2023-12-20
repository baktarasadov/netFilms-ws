export interface IFavorite {
    favoriteName: string;
    movies: IMovie[]

}

interface IMovie {
    id: string;
    img: string;
    title: string;
}
import ImgStyleUtil from "../utils/ImgStyleUtil";
import { useHttp } from "../hooks/http.hook";

const MarvelService = () => {

    const {isLoading, error, request, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=1749c57c3246fa898e1ac80bf89b34b7';

    const imgStyleUtil = new ImgStyleUtil();

    // getResource = async (url) => {
    //     let res = await fetch(url);
    
    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //     }
    
    //     return await res.json();
    // }

    const getAllCharacters = async (limit = 18, offset = 0) => {
        const res = await request(`${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0])
    }

    const _getImgStyle = (path) => {
        return  path === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" 
                ? {"objectFit":"unset"} 
                : {"objectFit":"cover"};
    }

    const _transformCharacter = (item) => {
        return {
            id: item.id,
            name: item.name,
            descr: item.description,
            thumb: `${item.thumbnail.path}.${item.thumbnail.extension}`,
            homePage: item.resourceURI,
            wiki: item.urls[1].url,
            imgStyle: _getImgStyle(item.thumbnail.path),
            comics: item.comics.items
        }
    }

    return {isLoading, error, getAllCharacters, getCharacter, clearError}
}

export default MarvelService;
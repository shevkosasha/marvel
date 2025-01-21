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

    const getAllComics = async (limit = 18, offset = 0) => {
		const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=${limit}&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformComics);
	};

	const getComics = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};

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

    const _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
			// optional chaining operator
			price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",
		};
	};

    return {isLoading, error, getAllCharacters, getCharacter, getAllComics, getComics, clearError}
}

export default MarvelService;
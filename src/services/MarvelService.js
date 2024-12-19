import ImgStyleUtil from "../utils/ImgStyleUtil";

class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    // ЗДЕСЬ БУДЕТ ВАШ КЛЮЧ, ЭТОТ КЛЮЧ МОЖЕТ НЕ РАБОТАТЬ
    _apiKey = 'apikey=1749c57c3246fa898e1ac80bf89b34b7';

    imgStyleUtil = new ImgStyleUtil();

    getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getAllCharacters = async (limit = 18, offset = 0) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=${limit}&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0])
    }

    _getImgStyle = (path) => {
        return  path === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" 
                ? {"objectFit":"unset"} 
                : {"objectFit":"cover"};
    }

    _transformCharacter = (item) => {
        return {
            id: item.id,
            name: item.name,
            descr: item.description,
            thumb: `${item.thumbnail.path}.${item.thumbnail.extension}`,
            homePage: item.resourceURI,
            wiki: item.urls[1].url,
            imgStyle: this._getImgStyle(item.thumbnail.path),
            comics: item.comics.items
        }
    }
}

export default MarvelService;
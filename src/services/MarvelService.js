

class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    // ЗДЕСЬ БУДЕТ ВАШ КЛЮЧ, ЭТОТ КЛЮЧ МОЖЕТ НЕ РАБОТАТЬ
    _apiKey = 'apikey=1749c57c3246fa898e1ac80bf89b34b7';

    getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getAllCharacters = async (offset = 0) => {
        const res = await this.getResource(`${this._apiBase}characters?offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (item) => {
        return {
            id: item.id,
            name: item.name,
            descr: item.description,
            thumb: item.thumbnail.path + '.' + item.thumbnail.extension,
            homePage: item.resourceURI,
            wiki: item.urls[1].url,
            comics: item.comics.items
        }
    }
}

export default MarvelService;
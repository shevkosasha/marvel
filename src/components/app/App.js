import { useState, useEffect } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';
import ComicsList from "../comicsList/ComicsList";


const App = () => {

    const [characterId, setCharacterId] = useState(null);
    const [comicsId, setComicsId] = useState(null);

    const onCharacterSelect = (id) => setCharacterId(id)
    const onComicsSelect = (id) => setComicsId(id)

    useEffect( () => {
        console.log(comicsId);
    }, [comicsId]);

    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/* <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onGetInfo={onCharacterSelect}/>
                    </ErrorBoundary>     
                    <ErrorBoundary>
                        <CharInfo characterId={characterId}/>
                    </ErrorBoundary>
                </div> */}
                {/* <img className="bg-decoration" src={decoration} alt="vision"/> */}

                <ErrorBoundary>
                    <ComicsList onGetInfo={onComicsSelect}/>
                </ErrorBoundary>
            </main>
        </div>
    )
}

export default App;
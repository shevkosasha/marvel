import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

import MarvelService from '../../services/MarvelService';

const marvelService = new MarvelService();

const App = () => {

    const [characterId, setCharacterId] = useState(null);

    const onCharacterSelect = (id) => setCharacterId(id)

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <ErrorBoundary>
                    <RandomChar marvelService={marvelService}/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onGetInfo={onCharacterSelect} marvelService={marvelService}/>
                    </ErrorBoundary>     
                    <ErrorBoundary>
                        <CharInfo characterId={characterId} marvelService={marvelService}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;
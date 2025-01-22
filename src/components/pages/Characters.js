import { useState } from "react";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import RandomChar from "../randomChar/RandomChar";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';

export const Characters = () => {

    const [characterId, setCharacterId] = useState(null);
    const onCharacterSelect = (id) => setCharacterId(id)

    return (
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onGetInfo={onCharacterSelect}/>
                </ErrorBoundary>     
                <ErrorBoundary>
                    <CharInfo characterId={characterId}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}
import React, { useEffect, useState } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';
import ErrorMsg from '../errorMsg/errorMsg';

import MarvelService from '../../services/MarvelService';

const RandomChar = () => {

    let [character, setCharacter] = useState({});

    const {isLoading, error, getCharacter, clearError} = MarvelService();

    useEffect( () => {
        updateCharacter();
        const timerId = setInterval(updateCharacter, 60000);
        return () => clearInterval(timerId);
    }, []);

    const updateCharacter = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(setCharacter)
    }

    return (
        <div className="randomchar">
            {isLoading ? <Spinner/>  
                : error ? <ErrorMsg/> 
                : <RandomCharacterView character={character}/>}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateCharacter}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const RandomCharacterView = ({character}) => {
    
    const {name, descr, thumb, homePage, wiki, imgStyle} = character;
    
    return (
        <div className="randomchar__block">
            <img src={thumb} alt="Random character" className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{descr}
                </p>
                <div className="randomchar__btns">
                    <a href={homePage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;
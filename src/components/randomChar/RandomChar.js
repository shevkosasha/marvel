import React, { useEffect, useState } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';
import ErrorMsg from '../errorMsg/errorMsg';

const RandomChar = (props) => {

    let [character, setCharacter] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);

    useEffect( () => {
        getCharacter();
        const timerId = setInterval(getCharacter, 60000);
        return () => clearInterval(timerId);
    }, []);

    const setLoadingState = (state) => setLoading(state);

    const getCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        setLoadingState(true);
        props.marvelService
            .getCharacter(id)
            .then((char) => {
                setLoadingState(false);
                setCharacter(char);
            })
            .catch((err) => setError(true));
    }

    return (
        <div className="randomchar">
            {isLoading ? <Spinner/>  
                : isError ? <ErrorMsg/> 
                : <RandomCharacterView character={character}/>}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={getCharacter}>
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
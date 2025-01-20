import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './charInfo.scss';
import Spinner from '../spinner/Spinner';
import ErrorMsg from '../errorMsg/errorMsg';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';

const CharInfo = (props) => {

    const {characterId} = props;

    let [character, setCharacter] = useState({})
    const {isLoading, error, getCharacter, clearError} = MarvelService();

    useEffect( () => {
        getCharacterInfo();
    }, [characterId]);

    const getCharacterInfo = () => {
        if (!characterId) {
            return;
        }
        clearError();
        getCharacter(characterId)
            .then(setCharacter)
    }

    return (
        <div className="char__info" >
            {!characterId ? <Skeleton/> 
                : isLoading ?  <Spinner/>
                : error ? <ErrorMsg/> 
                : <CharacterInfoView character={character}/>}
        </div>
    )
}

const CharacterInfoView = ({character}) => {

    const {name, descr, thumb, homePage, wiki, imgStyle, comics} = character;

    const comicsList = !Array.isArray(comics) ? [] : comics.map((item, index) => {
        return (
            <li className="char__comics-item" key={index}>
                {item.name}
            </li>
        )
    })

    return (
        <>
            <div className="char__basics">
                <img src={thumb} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homePage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{descr}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsList.length > 0 ? comicsList : "No comics found for the character"}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    characterId: PropTypes.number,
    onGetInfo: PropTypes.func,
}

export default CharInfo;
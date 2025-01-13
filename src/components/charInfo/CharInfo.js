import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './charInfo.scss';
import Spinner from '../spinner/Spinner';
import ErrorMsg from '../errorMsg/errorMsg';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {

    const {characterId} = props;

    let [character, setCharacter] = useState({})
    const [isLoading, setLoading] = useState(false)
    const [isError, setError] = useState(false)

    useEffect( () => {
        getCharacter();
    }, [characterId]);

    const getCharacter = () => {
        if (!characterId) {
            return;
        }
        setLoading(true);
        props.marvelService
            .getCharacter(characterId)
            .then((char) => {
                setLoading(false)
                setCharacter(char);
            })
            .catch((err) => setError(true));
    }

    return (
        <div className="char__info" >
            {!characterId ? <Skeleton/> 
                : isLoading ?  <Spinner/>
                : isError ? <ErrorMsg/> 
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
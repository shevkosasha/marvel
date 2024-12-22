import { Component } from 'react';
import PropTypes from 'prop-types';
import './charInfo.scss';
import Spinner from '../spinner/Spinner';
import ErrorMsg from '../errorMsg/errorMsg';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component {

    componentDidUpdate(prevProps){
        if (prevProps === this.props) {
            return;
        }
        this.getCharacter();
    }

    state = {
        character: {
            name: null,
            descr: null,
            thumb: null,
            homePage: null,
            wiki: null,
            comics: []
        },
        isLoaded: false,
        isError: false,
    }

    onError = () => {
        this.setState({
            isError: true, 
            isLoaded:false
        });
    }

    onLoad = () => {
        this.setState({
            isLoaded:false
        });
    }

    setCharacter = (characters) => {
        this.setState({
            character: characters,
            isLoaded:true
        });
    }

    getCharacter = () => {
        const id = this.props.characterId;
        if (!id) {
            return;
        }
        this.onLoad();
        this.props.marvelService
            .getCharacter(id)
            .then(this.setCharacter)
            .catch(this.onError);
    }

    render(){
        const {isLoaded, isError, character} = this.state;
        const {characterId} = this.props;
        
        return (
            <div className="char__info">
                {!characterId ? <Skeleton/> 
                 : isLoaded ? <CharacterInfoView character={character}/> 
                 : isError ? <ErrorMsg/> 
                 : <Spinner/>}
            </div>
        )
    }
}

const CharacterInfoView = ({character}) => {

    const {name, descr, thumb, homePage, wiki, imgStyle, comics} = character;

    const comicsList = comics.map((item, index) => {
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
                {comics.length > 0 ? comicsList : "No comics found for the character"}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    characterId: PropTypes.number,
    onGetInfo: PropTypes.func,
}

export default CharInfo;
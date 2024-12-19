import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import React from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMsg from '../errorMsg/errorMsg';

class RandomChar extends React.Component {

    componentDidMount(){
        this.getCharacter()
        this.timerId = setInterval(this.getCharacter, 60000)
    }

    componentWillUnmount(){
        clearInterval(this.timerId);
    }

    state = {
        character: {
            name: null,
            descr: null,
            thumb: null,
            homePage: null,
            wiki: null
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

    setCharacter = (character) => {
        this.setState({
            character: character,
            isLoaded:true
        });
    }

    getCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.onLoad();
        this.props.marvelService
            .getCharacter(id)
            .then(this.setCharacter)
            .catch(this.onError);
    }

    render(){

        const {character, isLoaded, isError} = this.state;

        return (
            <div className="randomchar">
                {isLoaded 
                    ? <RandomCharacterView character={character}/> 
                    : isError ? <ErrorMsg/> : <Spinner/>}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.getCharacter}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
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
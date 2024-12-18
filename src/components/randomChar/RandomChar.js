import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import React from 'react';
import MarvelService from '../../services/MarvelService';

class RandomChar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            char: {
                name: null,
                descr: null,
                thumb: null,
                homePage: null,
                wiki: null
            },
            isLoaded: false,
        }

        this.getCharacter();
    }

    marvelService = new MarvelService();

    getCharacter = () => {
        this.marvelService
            .getAllCharacters()
            .then(characters => {
                const index = Math.floor(Math.random() * characters.length);
                this.setState({char: characters[index], isLoaded: true});
            })
            .catch(this.onError);
    }

    render(){

        const {char: {name, descr, thumb, homePage, wiki}} = this.state;
        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    <img src={thumb} alt="Random character" className="randomchar__img"/>
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
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
    
}

export default RandomChar;
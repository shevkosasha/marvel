import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

import MarvelService from '../../services/MarvelService';

class App extends Component {

    state = {
        characterId: null,
    }

    marvelService = new MarvelService();

    setCharacter = (id) => {
        this.setState({
            characterId: id,
        });
    }

    render(){
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
                        <RandomChar marvelService={this.marvelService}/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList onGetInfo={this.setCharacter} marvelService={this.marvelService}/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharInfo characterId={this.state.characterId} marvelService={this.marvelService}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;
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
        chosenCharacterId: null,
    }

    marvelService = new MarvelService();

    setChosenCharacter = (id) => {
        this.setState({
            chosenCharacterId: id,
        });
    }



    render(){
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar marvelService={this.marvelService}/>
                    <div className="char__content">
                        <CharList onGetInfo={this.setChosenCharacter} marvelService={this.marvelService}/>
                        <ErrorBoundary>
                            <CharInfo chosenCharacterId={this.state.chosenCharacterId} marvelService={this.marvelService}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;
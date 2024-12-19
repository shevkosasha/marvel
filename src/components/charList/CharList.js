import React from 'react';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMsg from '../errorMsg/errorMsg';

class CharList extends React.Component {

    state = {
        characters: [],
        isLoaded: false,
        isError: false,
        offset: 0,
        limit: 20,
    }

    componentDidMount(){
        this.getCharacters();
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

    setCharacters = (newCharacters) => {
        const {characters, offset, limit} = this.state;
        this.setState({
            characters: [...characters, ...newCharacters],
            isLoaded: true,
            offset: offset + limit,
        });
    }

    getCharacters = () => {
        this.onLoad();
        this.props.marvelService
            .getAllCharacters(this.state.offset)
            .then(this.setCharacters)
            .catch(this.onError);
    }

    getCharacterInfo = (id) => {
        this.props.onGetInfo(id)
    }

    render(){
        console.log(this.state.characters);

        const {characters, isLoaded, isError} = this.state;
        
        return (
            <div className="char__list">
                {isLoaded ? <ListItemsView characters={characters} onItemClick={this.getCharacterInfo}/> : isError ? <ErrorMsg/> : <Spinner/>}
                <button className="button button__main button__long" onClick={this.getCharacters}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const ListItemsView = ({characters, onItemClick}) => {

    const listItems = characters.map(item => {
        const {id, name, thumb, imgStyle} = item;
        return (
                <li className="char__item" key={id} onClick={() => onItemClick(id)}>
                    <img src={thumb} alt={name} style={imgStyle}/>
                    <div className="char__name">{name}</div>
                </li>
        )
    })
    
    return (
        <ul className="char__grid">
            {listItems}
        </ul>
    )
}

export default CharList;
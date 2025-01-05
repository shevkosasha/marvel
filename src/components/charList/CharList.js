import React, { Component } from 'react';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMsg from '../errorMsg/errorMsg';

class CharList extends React.Component {

    state = {
        characters: [],
        isInitialLoading: true,
        isLoaded: false,
        isError: false,
        offset: 0,
        limit: 9,
    }

    componentDidMount(){
        this.getCharacters();
        this.setState({
            isInitialLoading: false, 
        });
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
            .getAllCharacters(this.state.limit, this.state.offset)
            .then(this.setCharacters)
            .catch(this.onError);
    }

    getCharacterInfo = (id) => {
        this.props.onGetInfo(id)
    }

    render(){
        const {characters, isLoaded, isInitialLoading, isError} = this.state;
        
        return (
            <div className="char__list">
                {(!isInitialLoading) 
                    ? <ListItemsView characters={characters} onItemClick={this.getCharacterInfo} /> 
                    : isError ? <ErrorMsg/> : null}
                {isLoaded ? null : <Spinner/>}
                <LoadMoreBtn onClick={this.getCharacters} disabled={!isLoaded}/>
            </div>
        )
    }
}

const LoadMoreBtn = ({onClick, disabled}) => {
    return (
        <button className="button button__main button__long" onClick={onClick} disabled={disabled}>
            <div className="inner">load more</div>
        </button>
    )
}

class ListItemsView extends Component {
    refs = null;

    setRef = (ref) => {
        const refsArr = !Array.isArray(this.refs) ? [] : [...this.refs];
        if (ref){
            refsArr.push(ref);
            this.refs = [...refsArr];
        }
    }

    state = {
        activeItemId: null,
    }

    setActive = (id) => {
        this.setState({
            activeItemId: id,
        });
    }

    handleClick(id, i, onClickFunc){
        id = id === this.state.activeItemId ? null : id;
        onClickFunc(id);
        this.setActive(id);
        // this.setFocus(i);
    }

    setFocus = (i) => {
        this.refs[i].focus();
    }

    render(){
        const {characters, onItemClick} = this.props;

        const listItems = characters.map((item, i) => {
            const {id, name, thumb, imgStyle} = item;
            const className = id === this.state.activeItemId ? "char__item_selected" : "char__item";

            return (
                <li className={className} key={id} ref={this.setRef} onClick={() => this.handleClick(id, i, onItemClick)}>
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
}

// const ListItemsView ({characters, onItemClick}) => {

//     const listItems = characters.map(item => {
//         const {id, name, thumb, imgStyle} = item;
//         return (
//                 <li className="char__item" key={id} onClick={() => onItemClick(id)}>
//                     <img src={thumb} alt={name} style={imgStyle}/>
//                     <div className="char__name">{name}</div>
//                 </li>
//         )
//     })
    
//     return (
//         <ul className="char__grid">
//             {listItems}
//         </ul>
//     )
// }

export default CharList;
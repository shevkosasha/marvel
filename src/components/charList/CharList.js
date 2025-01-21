import {useState, useEffect, useRef} from 'react';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMsg from '../errorMsg/errorMsg';
import MarvelService from '../../services/MarvelService';
import { LoadMoreBtn } from '../LoadMoreButton/LoadMoreButton';

const CharList = (props) => {

    const [characters, setCharacters] = useState([]);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(9);
    const {isLoading, error, getAllCharacters, clearError} = MarvelService();

    useEffect( () => {
       getCharacters();
       setIsInitialLoading(false);
    }, []);

    const getCharacters = () => {
        clearError();
            getAllCharacters(limit, offset)
            .then((newCharacters) => {
                setCharacters([...characters, ...newCharacters])
                setOffset(offset => offset + limit)
            })
    }

    const getCharacterInfo = (id) => props.onGetInfo(id)

    return (
        <div className="char__list">
            {(!isInitialLoading) 
                ? <ListItemsView characters={characters} onItemClick={getCharacterInfo} /> 
                : error ? <ErrorMsg/> : null}
            {!isLoading ? null : <Spinner/>}
            <LoadMoreBtn onClick={getCharacters} disabled={isLoading}/>
        </div>
    )
}

const ListItemsView = ({characters, onItemClick}) => {

    let refs = useRef([]); 
    const [activeId, setActiveId] = useState(null);

    const handleClick = (id, i, onClickFunc) => {
        id = id === activeId ? null : id;
        onClickFunc(id);
        setActiveId(id);
        setFocus(i);
    }

    const handleKeyUp = (e, id, i, onClickFunc) => {
        if (e.key == ' ' || e.key === "Enter"){
            handleClick(id, i, onClickFunc)
        }
    }

    const setRef = (ref) => {
        const refsArr = !Array.isArray(refs) ? [] : [...refs];
        if (ref){
            refsArr.push(ref);
            refs = [...refsArr];
        }
    }

    const setFocus = (i) => refs[i].focus();

    const listItems = characters.map((item, i) => {
        const {id, name, thumb, imgStyle} = item;
        const className = id === activeId ? "char__item_selected" : "char__item";

        return (
            <li className={className} tabIndex={0} key={id} ref={setRef} onClick={() => handleClick(id, i, onItemClick)} onKeyUp={(e) => handleKeyUp(e, id, i, onItemClick)}>
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

// const LoadMoreBtn = ({onClick, disabled}) => {
//     return (
//         <button className="button button__main button__long" onClick={onClick} disabled={disabled}>
//             <div className="inner">load more</div>
//         </button>
//     )
// }

export default CharList;
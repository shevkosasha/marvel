import {useState, useEffect, useRef} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMsg from '../errorMsg/errorMsg';
import MarvelService from '../../services/MarvelService';

import './comicsList.scss';
import { LoadMoreBtn } from '../LoadMoreButton/LoadMoreButton';

const ComicsList = (props) => {

    const [comics, setComics] = useState([]);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(8);
    const {isLoading, error, getAllComics, clearError} = MarvelService();

    useEffect( () => {
        onRequest();
        setIsInitialLoading(false);
    }, []);

    const onRequest = () => {
        clearError();
        getAllComics(limit, offset)
            .then((newComics) => {
                setComics([...comics, ...newComics])
                setOffset(offset => offset + limit)
            })
    }

    const getComicsInfo = (id) => props.onGetInfo(id)

    console.log('comics list render');
    

    return (
        <div className="comics__list">
            {(!isInitialLoading) 
                ? <ListItemsView comics={comics} onItemClick={getComicsInfo} /> 
                : error ? <ErrorMsg/> : null}
            {!isLoading ? null : <Spinner/>}
            <LoadMoreBtn onClick={onRequest} disabled={isLoading}/>
        </div>
    )
}

const ListItemsView = ({comics, onItemClick}) => {

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

    console.log('comics list view render');


    const listItems = comics.map((item, i) => {
        const {id, thumbnail, title, price} = item;
        const className = id === activeId ? "comics__item_selected" : "comics__item";

        return (
            <li className="comics__item" key={i}  ref={setRef} onClick={() => handleClick(id, i, onItemClick)} onKeyUp={(e) => handleKeyUp(e, id, i, onItemClick)}>
                <a href="#">
                    <img src={thumbnail} alt={title} className="comics__item-img"/>
                    <div className="comics__item-name">{title}</div>
                    <div className="comics__item-price">{price}</div>
                </a>
            </li>
        )
    })
    
    return (
        <ul className="comics__grid">
            {listItems}
        </ul>
    )
}

export default ComicsList;
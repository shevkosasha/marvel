import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ErrorMsg from '../errorMsg/errorMsg';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import './singleComic.scss';

const SingleComic = (props) => {
    
    let [comic, setComic] = useState({})
    const {isLoading, error, getComic, clearError} = MarvelService();

    useEffect( () => {
        getComicInfo();
    }, []);

    const getComicInfo = () => {
        if (!props.comicId) {
            return;
        }
        clearError();
        getComic(props.comicId)
            .then(setComic)
    }

    return (
        <div className="single-comic">
            {isLoading ? <Spinner/>  
                : error ? <ErrorMsg/> 
                : <ComicView comic={comic}/>}
        </div>
    )
}

const ComicView = ({comic}) => {
    console.log(comic);
    
    const {title, description, pageCount, thumbnail, language, price} = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComic;
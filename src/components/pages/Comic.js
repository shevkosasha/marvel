import { useParams } from 'react-router-dom';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import SingleComic from '../singleComic/SingleComic';
import { useEffect } from 'react';

const Comic = () => {

    const {comicId} = useParams();
    
    return (
        <ErrorBoundary>
            <SingleComic comicId={comicId}/>
        </ErrorBoundary>
    )
}

export default Comic;
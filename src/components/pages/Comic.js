import { useLocation, useParams, useNavigate } from 'react-router-dom';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import SingleComic from '../singleComic/SingleComic';
import { useEffect } from 'react';

const Comic = () => {

    const {comicId} = useParams();
    const location = useLocation();
    // const data = location.state;
    console.log(location);
    console.log(window.history);

    const navigate = useNavigate();
    window.onpopstate = () => {
        // window.history.back()
        navigate('/',{state:{id:location.state?.charId}});
        // location.state.charId = null;
        // navigate(`/?id=${location.state.charId}`);
    }
    
    return (
        <ErrorBoundary>
            <SingleComic comicId={comicId}/>
        </ErrorBoundary>
    )
}

export default Comic;
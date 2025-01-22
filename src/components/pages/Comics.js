import { useState } from "react";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

export const Comics = () => {
    
    const [comicsId, setComicsId] = useState(null);
    const onComicsSelect = (id) => setComicsId(id)

    return (
        <>
            <AppBanner />
            <ErrorBoundary>
                <ComicsList onGetInfo={onComicsSelect}/>
            </ErrorBoundary>
        </>
    )
}
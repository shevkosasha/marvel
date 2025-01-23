import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import { Characters, Comics, Page404, Comic } from "../pages";

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<Characters/>} />
                        <Route path="/comics" element={<Comics/>} />
                        <Route path="/comics/:comicId" element={<Comic/>} />
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;
import { Route, BrowserRouter as Router, Routes, Switch } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import { Characters, Comics } from "../pages";

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                        <Route exact path="/">
                            <Characters/>
                        </Route>
                        <Route exact path="/comics">
                            <Comics/>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App;
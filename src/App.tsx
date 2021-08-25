import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { useLocalStorage } from "hooks/useLocalStorage";
import { Config, ConfigPage, defaultConfig } from "pages/ConfigPage";
import { HomePage } from "pages/HomePage";
import { SurveyPage } from "pages/SurveyPage";

import { CssBaseline, Typography } from "@material-ui/core";

const App = () => {
  const [config, setConfig] = useLocalStorage<Config>("config", defaultConfig);

  return (
    <CssBaseline>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage config={config} />
          </Route>

          <Route exact path="/survey">
            <SurveyPage config={config} />
          </Route>

          <Route exact path="/config">
            <ConfigPage config={config} setConfig={setConfig} />
          </Route>
        </Switch>
      </Router>
      <div style={{ position: "absolute", bottom: "5px", right: "5px" }}>
        <Typography variant="caption" component="p">
          "Clipboard Emoji", by{" "}
          <a href="https://twemoji.twitter.com/">Twemoji</a>, licensed under{" "}
          <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY 4.0.</a>
        </Typography>
      </div>
    </CssBaseline>
  );
};

export default App;

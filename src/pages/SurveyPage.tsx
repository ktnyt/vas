import { Fragment, useState } from "react";

import { SurveyEnd } from "organisms/SurveyEnd";
import { SurveyForm } from "organisms/SurveyForm";
import { SurveyStart } from "organisms/SurveyStart";
import { SurveyWait } from "organisms/SurveyWait";

import {
  AppBar,
  Container,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";

import { Config } from "./ConfigPage";

export interface SurveyPageProps {
  config: Config;
}

interface State {
  results: number[][];
  repeat: number;
  mode: "start" | "form" | "wait" | "end";
}

export const SurveyPage = ({ config }: SurveyPageProps) => {
  const [id, setId] = useState(0);
  const [state, setState] = useState<State>({
    results: [],
    repeat: 0,
    mode: "start",
  });

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" style={{ flexGrow: 1 }}>
            VAS回答
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth={state.mode === "form" ? "md" : "xs"}
        style={{ marginTop: "16px" }}
      >
        <Paper style={{ padding: "16px", borderRadius: 0 }}>
          {state.mode === "start" && (
            <SurveyStart
              onStart={(id) => {
                setId(id);
                setState((prev) => ({ ...prev, mode: "form" }));
              }}
            />
          )}

          {state.mode === "form" && (
            <SurveyForm
              config={config}
              onComplete={(result) => {
                setState(({ results, repeat }) => ({
                  results: [...results, result],
                  repeat: repeat + 1,
                  mode: "wait",
                }));
              }}
            />
          )}

          {state.mode === "wait" && (
            <SurveyWait
              last={state.repeat === config.repeats}
              onContinue={() => {
                setState((prev) => ({
                  ...prev,
                  mode: state.repeat === config.repeats ? "end" : "form",
                }));
              }}
            />
          )}

          {state.mode === "end" && (
            <SurveyEnd config={config} id={id} results={state.results} />
          )}
        </Paper>
      </Container>
    </Fragment>
  );
};

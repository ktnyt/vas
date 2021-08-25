import { Fragment } from "react";
import { useHistory } from "react-router-dom";

import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";

import { Config } from "./ConfigPage";

export interface HomePageProps {
  config: Config;
}

export const HomePage = ({ config }: HomePageProps) => {
  const history = useHistory();

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" edge="start">
            <Home />
          </IconButton>

          <Typography variant="h5" style={{ flexGrow: 1 }}>
            VASアプリ
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xs" style={{ marginTop: "16px" }}>
        <Paper style={{ padding: "16px", borderRadius: 0 }}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Typography variant="h6">VAS管理画面</Typography>
            </Grid>

            <Grid item>
              <Button
                variant="outlined"
                color="default"
                fullWidth
                onClick={() => history.push("/config")}
              >
                設定を編集
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => history.push("/survey")}
                disabled={
                  config.name === "" ||
                  config.repeats === 0 ||
                  config.items.length === 0
                }
              >
                サーベイを実施
              </Button>

              <Typography variant="caption">
                VASの評価項目が設定されていないとサーベイを実施することはできません。
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Fragment>
  );
};

import { useState } from "react";
import { useHistory } from "react-router-dom";

import { Config } from "pages/ConfigPage";

import {
  Button,
  Container,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export interface SurveyEndProps {
  config: Config;
  id: number;
  results: number[][];
}

export const SurveyEnd = ({
  config,
  id,
  results: resultValues,
}: SurveyEndProps) => {
  const results = resultValues.map((values) =>
    values.map((value, index) => ({
      name: config.items[index].name,
      value,
    }))
  );

  const history = useHistory();

  const [saved, setSaved] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h5">結果の確認</Typography>
      </Grid>

      <Grid item>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              href={`data:application/json,${encodeURIComponent(
                JSON.stringify({ id, results }, null, 2)
              )}`}
              download={`${config.name}-${id}.json`.replace(/\s/, "_")}
              onClick={() => setSaved(true)}
            >
              結果を保存
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpen(true)}
              disabled={!saved}
            >
              ホームに戻る
            </Button>

            <Dialog open={open}>
              <DialogTitle>ホームに戻る</DialogTitle>

              <DialogContent>
                <DialogContentText>
                  保存していない結果は消えてしまいます。本当にホームに戻りますか？
                </DialogContentText>
              </DialogContent>

              <DialogActions>
                <Button color="primary" onClick={() => setOpen(false)}>
                  やめる
                </Button>
                <Button color="secondary" onClick={() => history.push("/")}>
                  ホームに戻る
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Grid>

      {results.map((entries, index) => (
        <Grid item key={index}>
          <Container>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Typography variant="h6">ラウンド{index + 1}</Typography>
              </Grid>
              {entries.map(({ name, value }, index) => (
                <Grid item key={index}>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typography variant="body1">{name}</Typography>
                    </Grid>

                    <Grid item>
                      <Typography variant="body1">{value}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Grid>
      ))}
    </Grid>
  );
};

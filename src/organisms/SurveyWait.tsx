import { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";

export interface SurveyWaitProps {
  last: boolean;
  onContinue: () => void;
}

export const SurveyWait = ({ last, onContinue }: SurveyWaitProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Typography variant="h5">お疲れさまでした</Typography>
      </Grid>

      <Grid item>
        <Typography variant="body1">
          ご回答ありがとうございました。指示があるまでそのままお待ち下さい。
        </Typography>
      </Grid>

      <Grid item>
        <Grid container justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            次に進む
          </Button>

          <Dialog open={open}>
            <DialogTitle>{last ? "終了する" : "次に進む"}</DialogTitle>

            <DialogContent>
              <DialogContentText>
                監督者の指示なく進めないでください。
              </DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button color="secondary" onClick={() => setOpen(false)}>
                やめる
              </Button>
              <Button color="primary" onClick={onContinue}>
                進む
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Grid>
  );
};

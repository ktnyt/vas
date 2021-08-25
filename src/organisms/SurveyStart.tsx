import { useState } from "react";

import { convertToNumber } from "utils/number";

import {
  Button,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";

export interface SurveyStartProps {
  onStart: (id: number) => void;
}

export const SurveyStart = ({ onStart }: SurveyStartProps) => {
  const [id, setId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Typography variant="h5">実験参加者番号入力</Typography>
      </Grid>

      <Grid item>
        <TextField
          label="実験参加者番号"
          fullWidth
          onChange={(event) => setId(convertToNumber(event.target.value))}
        />
      </Grid>

      <Grid item>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
              disabled={id === null}
            >
              開始する
            </Button>
          </Grid>
        </Grid>

        <Dialog open={open}>
          <DialogTitle>サーベイを開始</DialogTitle>

          <DialogContent>
            <DialogContentText>
              実験参加者番号は「{id}」です。
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button color="secondary" onClick={() => setOpen(false)}>
              戻る
            </Button>
            <Button color="primary" onClick={() => id !== null && onStart(id)}>
              開始
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

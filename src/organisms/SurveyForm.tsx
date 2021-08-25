import { useState } from "react";

import {
  Button,
  Container,
  Grid,
  MobileStepper,
  Slider,
  Typography,
} from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";

import { Config } from "../pages/ConfigPage";

export interface SurveyFormProps {
  config: Config;
  onComplete: (values: number[]) => void;
}

const asNumber = (value: number | number[]): number => {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
};

export const SurveyForm = ({ config, onComplete }: SurveyFormProps) => {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(config.items.map(() => 50));

  return (
    <Grid container spacing={8} direction="column">
      <Grid item>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <Typography variant="h5">{config.items[step].name}</Typography>
          </Grid>

          <Grid item>
            <Typography variant="subtitle1">
              {config.items[step].info}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Container maxWidth="sm">
          <Slider
            track={false}
            value={values[step]}
            onChange={(_, next) =>
              setValues((prev) =>
                prev.map((value, i) => (step === i ? asNumber(next) : value))
              )
            }
            marks={[
              { value: 0, label: config.items[step].minLabel },
              { value: 100, label: config.items[step].maxLabel },
            ]}
          />
        </Container>
      </Grid>

      <Grid item>
        <MobileStepper
          position="static"
          variant="text"
          steps={config.items.length}
          activeStep={step}
          nextButton={
            <Button
              size="small"
              onClick={() => setStep((prev) => prev + 1)}
              disabled={step === config.items.length - 1}
            >
              次へ
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={() => setStep((prev) => prev - 1)}
              disabled={step === 0}
            >
              <KeyboardArrowLeft />
              戻る
            </Button>
          }
          style={{ backgroundColor: "transparent" }}
        />
      </Grid>

      <Grid item>
        <Grid container justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={() => onComplete(values)}
            disabled={step !== config.items.length - 1}
          >
            回答を終了
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

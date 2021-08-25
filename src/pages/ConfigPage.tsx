import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useHistory } from "react-router-dom";

import {
  AppBar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";

interface ConfigItem {
  name: string;
  info: string;
  minLabel: string;
  maxLabel: string;
}

const defaultConfigItem = {
  name: "",
  info: "",
  minLabel: "",
  maxLabel: "",
};

interface ConfigItemProps {
  index: number;
  item: ConfigItem;
  onChangeConfig: (config: ConfigItem) => void;
}

const ConfigItemForm = ({
  index,
  item: init = defaultConfigItem,
  onChangeConfig,
}: ConfigItemProps) => {
  const savedHandler = useRef(onChangeConfig);

  useEffect(() => {
    savedHandler.current = onChangeConfig;
  }, [onChangeConfig]);

  const [config, setConfig] = useState<ConfigItem>(init);
  useEffect(() => {
    savedHandler.current(config);
  }, [config]);

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Typography variant="h6">項目{index}</Typography>
      </Grid>

      <Grid item>
        <TextField
          label="項目の名前"
          fullWidth
          required
          defaultValue={config.name}
          onChange={(event) =>
            setConfig((state) => ({ ...state, name: event.target.value }))
          }
        />
      </Grid>

      <Grid item>
        <TextField
          label="項目の説明"
          fullWidth
          required
          defaultValue={config.info}
          onChange={(event) =>
            setConfig((state) => ({ ...state, info: event.target.value }))
          }
        />
      </Grid>

      <Grid item>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="最小値のラベル"
              fullWidth
              required
              defaultValue={config.minLabel}
              onChange={(event) =>
                setConfig((state) => ({
                  ...state,
                  minLabel: event.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="最大値のラベル"
              fullWidth
              required
              defaultValue={config.maxLabel}
              onChange={(event) =>
                setConfig((state) => ({
                  ...state,
                  maxLabel: event.target.value,
                }))
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export interface Config {
  name: string;
  repeats: number;
  items: ConfigItem[];
}

export const defaultConfig = {
  name: "",
  repeats: 1,
  items: [],
};

export interface ConfigPageProps {
  config: Config;
  setConfig: Dispatch<SetStateAction<Config>>;
}

export const ConfigPage = ({ config, setConfig }: ConfigPageProps) => {
  const history = useHistory();

  const setName = (name: string) => setConfig((prev) => ({ ...prev, name }));

  const setRepeats = (repeats: number) =>
    setConfig((prev) => ({ ...prev, repeats }));

  const setItem = (next: ConfigItem, index: number) =>
    setConfig(({ items, ...prev }) => ({
      ...prev,
      items: items.map((item, i) => (index === i ? next : item)),
    }));

  const addItem = () =>
    setConfig(({ items, ...prev }) => ({
      ...prev,
      items: [...items, defaultConfigItem],
    }));

  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => history.push("/")}
          >
            <Home />
          </IconButton>

          <Typography variant="h5">VAS設定</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" style={{ marginTop: "16px" }}>
        <Paper style={{ padding: "16px", borderRadius: 0 }}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="h6">基本設定</Typography>
                </Grid>

                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setOpen(true)}
                      >
                        設定を消去
                      </Button>

                      <Dialog open={open}>
                        <DialogTitle>設定を消去</DialogTitle>

                        <DialogContent>
                          <DialogContentText>
                            設定を消去すると元に戻せません。本当に消去しますか？
                          </DialogContentText>
                        </DialogContent>

                        <DialogActions>
                          <Button
                            color="primary"
                            onClick={() => setOpen(false)}
                          >
                            やめる
                          </Button>
                          <Button
                            color="secondary"
                            onClick={() => {
                              setConfig(defaultConfig);
                              setOpen(false);
                            }}
                          >
                            消去する
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Grid>

                    <Grid item>
                      <Button
                        variant="outlined"
                        color="primary"
                        component="label"
                      >
                        設定を復元
                        <input
                          type="file"
                          hidden
                          accept="application/json"
                          onChange={(event) => {
                            if (event.target.files) {
                              const file = event.target.files[0];
                              file
                                .text()
                                .then((text) =>
                                  setConfig(JSON.parse(text) as Config)
                                );
                            }
                          }}
                        />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <TextField
                label="実験名"
                fullWidth
                required
                value={config.name}
                onChange={(event) => setName(event.target.value)}
              />
            </Grid>

            <Grid item>
              <TextField
                label="繰り返し回数"
                fullWidth
                required
                value={config.repeats}
                onChange={(event) => setRepeats(Number(event.target.value))}
              />
            </Grid>

            {config.items.map((item, index) => (
              <Grid item key={index}>
                <ConfigItemForm
                  index={index + 1}
                  item={item}
                  onChangeConfig={(next) => setItem(next, index)}
                />
              </Grid>
            ))}

            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        href={`data:application/json,${encodeURIComponent(
                          JSON.stringify(config, null, 2)
                        )}`}
                        download={
                          config.name === ""
                            ? "config.json"
                            : `${config.name.replace(/\s/, "_")}.json`
                        }
                      >
                        設定を保存
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Button variant="contained" color="default" onClick={addItem}>
                    項目を追加
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Fragment>
  );
};

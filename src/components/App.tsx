import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { ReactElement } from "react";

import { Box, Spinner } from "@twilio-paste/core";

import Login from "./login/login";
import AppContainer from "./AppContainer";
import { actionCreators, AppState } from "../store";

function App(): ReactElement {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { login } = bindActionCreators(actionCreators, dispatch);
  const token = useSelector((state: AppState) => state.token);

  const username = localStorage.getItem("username") ?? "";

  useEffect(() => {
    window.addEventListener(
      "message",
      function (event) {
        console.log(event);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
        console.log("ORIGIN", origin);
        if (
          origin !== "http://localhost" &&
          origin !== "https://bo.vox-sprachschule.ch"
        ) {
          console.error("Wrong origin " + origin);
          return;
        }

        if (typeof event.data == "object" && event.data.call === "setJwt") {
          setToken(event.data.jwt);
          localStorage.setItem("username", event.data.identity);
        }
      },
      false
    );
  }, []);

  const setToken = (token: string) => {
    login(token);
    setLoading(false);
  };

  if ((!token && !loading) || !username) {
    return <Login setToken={setToken} />;
  }

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        height="100%"
        width="100%"
      >
        <Spinner size="sizeIcon110" decorative={false} title="Loading" />
      </Box>
    );
  }

  return <AppContainer />;
}

export default App;

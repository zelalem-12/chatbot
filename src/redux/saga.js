import { SocketClient } from "@cognigy/socket-client";
import { eventChannel } from "redux-saga";
import { fork, take, call, put, takeLatest } from "redux-saga/effects";
import { sendMeasage, receiveMessage } from "./store";

const endpointUrl = "https://endpoint-trial.cognigy.ai";
const urlToken =
  "47846afb8b9c4b9538025b75e41e5902794d0df172a0b82710b654b71f2140a5";

async function connect() {
  const client = new SocketClient(endpointUrl, urlToken, {
    forceWebsockets: true,
    sessionId: "session-02cd26ad-08b8-4e7f-8e6e-c22a4dcdd936",
    userId: "user-29cfb0d6-6562-462e-912e-b129f55d84e7",
  });
  await client.connect();

  return client;
}

function subscribe(client) {
  return eventChannel((emit) => {
    client.on("output", (output) => {
      const response = {
        source: "bot",
        message: output.text,
        timestamp: new Date().toISOString(),
      };
      emit(receiveMessage(response));
    });

    client.on("typingStatus", (status) => {
      console.log("Status: " + status);
    });

    client.on("finalPing", () => {
      console.log("Message Sent!");
    });

    client.on("error", (error) => {
      console.log("Error: " + error.message);
    });

    return () => {};
  });
}

function* listener(client) {
  const channel = yield call(subscribe, client);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* handleEvents(client) {
  yield fork(listener, client);
}

function* flow() {
  const client = yield call(connect);
  yield fork(handleEvents, client);
  yield takeLatest(sendMeasage, function* ({ payload: { message } }) {
    yield client.sendMessage(message);
  });
}

export default function* rootSaga() {
  yield fork(flow);
}

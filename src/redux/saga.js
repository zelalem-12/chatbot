import { SocketClient } from "@cognigy/socket-client";
import { eventChannel } from "redux-saga";
import { fork, take, call, put } from "redux-saga/effects";
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
  const messages = ["Hi", "Hello", "How you doing ", "What are you doing?"];
  for (let message of messages) {
    client.sendMessage(message);
  }

  // client.sendMessage("hello there", { color: "green" });
  // client.sendMessage("", { color: "green" });

  return client;
}

function* subscribe(client) {
  return eventChannel((emit) => {
    client.on("output", (output) => {
      console.log({ ...output });
      console.log("Text: " + output.text + "   Data: " + output.data);
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

function* sendMessageSaga(client) {
  const SEND_MESSAGE = "How you doing?";
  const { message } = yield take(SEND_MESSAGE);
  client.sendMessage(message);
}

function* listener(client) {
  const channel = yield call(subscribe, client);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}
function* emitter(client) {
  while (true) {
    yield fork(sendMessageSaga, client);
  }
}

function* handleEvents(client) {
  yield fork(listener, client);
  yield fork(emitter, client);
}

function* flow() {
  const client = yield call(connect);
  yield fork(handleEvents, client);
}

export default function* rootSaga() {
  yield fork(flow);
}

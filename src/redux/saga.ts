import { SocketClient } from "@cognigy/socket-client";
import { eventChannel, SagaIterator, EventChannel } from "redux-saga";
import { PayloadAction } from "@reduxjs/toolkit";
import { fork, take, call, put, takeLatest } from "redux-saga/effects";
import { sendMeasage, receiveMessage } from "./store";
import { Message, Response } from "../types/Interface";

const endpointUrl = "https://endpoint-trial.cognigy.ai";
const urlToken =
  "47846afb8b9c4b9538025b75e41e5902794d0df172a0b82710b654b71f2140a5";

async function connect(): Promise<SocketClient> {
  const client = new SocketClient(endpointUrl, urlToken, {
    forceWebsockets: true,
    sessionId: "session-02cd26ad-08b8-4e7f-8e6e-c22a4dcdd936",
    userId: "user-29cfb0d6-6562-462e-912e-b129f55d84e7",
  });
  await client.connect();

  return client;
}

function subscribe(client: SocketClient) {
  return eventChannel((emit) => {
    client.on("output", (output: Response) => {
      const response = {
        source: "bot",
        message: output.text,
        timestamp: new Date().toISOString(),
      };
      emit(receiveMessage(response));
    });
    client.on("error", (error) => {
      console.log("Error: " + error.message);
    });

    return () => {};
  });
}

function* listener(client: SocketClient): SagaIterator {
  const channel: EventChannel<SocketClient> = yield call(subscribe, client);
  while (true) {
    const action: PayloadAction<Message> = yield take(channel);
    yield put(action);
  }
}

function* handleEvents(client: SocketClient): SagaIterator {
  yield fork(listener, client);
}

function* flow(): SagaIterator {
  const client: SocketClient = yield call(connect);
  yield fork(handleEvents, client);
  yield takeLatest(sendMeasage, function* ({ payload: { message } }) {
    yield client.sendMessage(message);
  });
}

export default function* rootSaga(): SagaIterator {
  yield fork(flow);
}

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express from "express";
import cors from "cors";
import firebaseServiceAccount from "./permissions.json";
import {ServiceAccount} from "firebase-admin";

const serviceAccount = firebaseServiceAccount as ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://poketrack-8f346.eur3.firebasedatabase.app",
});

import cards from "./cards";

const app = express();

app.use(cors({origin: true}));
app.use(express.json());

app.get("/", (request, response) => response.end("Backend de PokeTrack"));

app.use("/api/cards", cards);

exports.app = functions.https.onRequest(app);

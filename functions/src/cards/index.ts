import {toPokemon} from "./../utils/index";
import {Pokemon} from "./../types/index";
import * as admin from "firebase-admin";
import {Router as routerConst} from "express";
import fetch from "cross-fetch";
import {getMoves, getSprites} from "./cardController";

const router = routerConst();
const cardsCollection = admin.firestore().collection("cards");
const usersCollection = admin.firestore().collection("users");

const pokeapi = "http://pokeapi.co/api/v2/pokemon/";

const generateCards = async () => {
  const index = 1 + Math.floor(897 * Math.random());

  fetch(pokeapi + index)
      .then((res) => res.json())
      .then(async (responseJSON: any) => {
        const pokemon: Pokemon = toPokemon(responseJSON);
        const {name, height, weight} = pokemon;
        const level = 1 + Math.floor(100 * Math.random());
        const {sprites, sex, isShiny} = getSprites(pokemon.sprites);
        const moves = getMoves(pokemon.moves);
        const nbGenerated = 1 + Math.floor(999 * Math.random());
        let price = (1000 + Math.floor(10000 * Math.random())) / nbGenerated;
        price = Math.floor(price);
        const finalHeight = Math.floor(Math.random() * 10);
        const diffHeight = finalHeight - height;
        if (diffHeight > 0) {
          price = price + Math.floor(diffHeight * 1.02);
        } else {
          price = price + Math.floor(diffHeight * 0.98);
        }
        const finalWeight = Math.floor(Math.random() * 10);
        const diffWeight = finalWeight - weight;
        if (diffWeight > 0) {
          price = price + Math.floor(diffWeight * 1.02);
        } else {
          price = price + Math.floor(diffWeight * 0.98);
        }
        price += level;
        if (price <= 0) {
          price = 10;
        }
        if (isShiny) {
          price = Math.floor(price) * 7;
        }

        cardsCollection.add(
            {id: pokemon.id, name, height: finalHeight,
              weight: finalWeight, sprites, move1: moves[0],
              move2: moves[1], move3: moves[2], move4: moves[3], sex,
              price: Math.floor(price), nbGenerated, sold: 0, isShiny, level})
            .then(() => setTimeout(() => generateCards(), 60000))
            .catch((error) => console.log("Firestore error => ", error));
      })
      .catch((error) => console.log("Fetch error => ", error));
};


router.get("/all", async (request, response) => {
  cardsCollection.get()
      .then((querySnapshot) => querySnapshot.docs)
      .then((docs) => {
        const pokemons = docs.map((doc) => doc.data());
        response.status(200).send({pokemons});
      })
      .catch((error) => response.status(500)
          .send({message: "An error occured", error}));
});

router.post("/shop", async (request, response) => {
  const {userId, cardId, price, soldeUser, count} = request.body;

  usersCollection.doc(userId).get()
      .then((document) => {
        const userData = document.data();
        usersCollection.doc(userId).update({solde: soldeUser - (price*count),
          cards: [...userData?.cards, {
            uid: cardId,
            count,
          }]});
        cardsCollection.doc(cardId).get()
            .then((documentCard) => {
              const cardData = documentCard.data();
              cardsCollection.doc(cardId)
                  .update({sold: cardData?.sold + count});
            });
      })
      .then(() => {
        if (soldeUser - price >= 0) {
          response.status(200).send({code: 1,
            message: "Card bought by user " + userId});
        } else {
          response.status(200).send({code: 2,
            message: "Card can't be bought by user ! Not enough credits"});
        }
      })
      .catch((error) => response.send({code: 3, error}));
});

router.get("/card/:cardId", async (request, response) => {
  const {cardId} = request.params;

  cardsCollection.doc(cardId).get()
      .then((document) => {
        const card = document.data();
        response.status(200).send({card});
      })
      .catch((error) => response.send({code: 3, error}));
});

generateCards();

module.exports = router;
export default router;

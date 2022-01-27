import {MoveBase, Sprites} from "./../types/index";

export const getSprites: (sprites: Sprites) => {
  sprites: {
    front: string;
    back: string;
  },
  sex: string,
  isShiny: boolean
} = (sprites) => {
  const sexes: ["male", "female"] = ["male", "female"];
  const randomSex = sexes[Math.floor(Math.random() * sexes.length)];
  const booleans: [true, false] = [true, false];
  const isShiny = booleans[Math.floor(Math.random() * booleans.length)];

  const tempSprites: {front: string, back: string} = {front: "", back: ""};
  let front = "front";
  let back = "back";

  if (randomSex == "female") {
    if (sprites.frontFemale != null) {
      if (isShiny) {
        front += "ShinyFemale";
        back += "ShinyFemale";
      } else {
        front += "Female";
        back += "Female";
      }
    } else {
      if (isShiny) {
        front += "Shiny";
        back += "Shiny";
      } else {
        front += "Default";
        back += "Default";
      }
    }
  } else {
    if (isShiny) {
      front += "Shiny";
      back += "Shiny";
    } else {
      front += "Default";
      back += "Default";
    }
  }

  tempSprites.front = sprites[front as keyof Sprites];
  tempSprites.back = sprites[back as keyof Sprites];

  return {sprites: tempSprites, sex: randomSex, isShiny};
};

export const getMoves: (moves: MoveBase[]) => MoveBase[] = (moves) => {
  const movesData: MoveBase[] = [];
  if (moves.length == 0) {
    movesData.push(...[{name: "no-move", url: "", levelLearnedAt: 0},
      {name: "no-move", url: "", levelLearnedAt: 0},
      {name: "no-move", url: "", levelLearnedAt: 0},
      {name: "no-move", url: "", levelLearnedAt: 0}]);
  } else {
    for (let i = 0; i < 4; i++) {
      let isNotValid = true;
      while (isNotValid) {
        const index = Math.floor(moves.length * Math.random());
        if (movesData.findIndex((move) => {
          return move.name == moves[index].name;
        }) == -1) {
          movesData.push(moves[index]);
          isNotValid = false;
        }
      }
    }
  }

  return movesData;
};

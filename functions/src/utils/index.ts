import {
  Pokemon,
  Ability, MoveBase, HeldItem, Type, Move,
} from "./../types/index";

export const toPokemon: (data: any) => Pokemon = (data: any) => {
  const pokemon: Pokemon = {
    abilities: data.abilities.map((dataAbility: any) => {
      return toAbility(dataAbility);
    }),
    height: data.height / 10,
    heldItems: data.held_items.map((dataHeldItem: any) => {
      return toHeldItem(dataHeldItem);
    }),
    id: data.id,
    level: data.level,
    moves: data.moves.map((dataMove: any) => toMoveBase(dataMove)),
    name: data.name,
    order: data.order,
    sex: data.sex,
    sprites: {
      backDefault: data.sprites.back_default,
      backFemale: data.sprites.back_female,
      backShiny: data.sprites.back_shiny,
      backShinyFemale: data.sprites.back_shiny_female,
      frontDefault: data.sprites.front_default,
      frontFemale: data.sprites.front_female,
      frontShiny: data.sprites.front_shiny,
      frontShinyFemale: data.sprites.front_shiny_female,
    },
    stats: [],
    types: data.types.map((dataType: any) => toType(dataType)),
    weight: data.weight / 10,
    dateCreated: new Date(),
  };
  return pokemon;
};

export const toAbility: (data: any) => Ability = (data: any) => {
  const ability: Ability = {
    name: data.ability.name,
    url: data.ability.url,
    isHidden: data.is_hidden,
    slot: data.slot,
  };
  return ability;
};

export const toMoveBase: (data: any) => MoveBase = (data: any) => {
  const move: MoveBase = {
    name: data.move.name,
    url: data.move.url,
    levelLearnedAt: 1,
  };
  return move;
};

export const toMove: (data: any) => Move = (data: any) => {
  const move: Move = {
    name: data.name,
    type: data.type.name,
  };
  return move;
};

export const toHeldItem: (data: any) => HeldItem = (data: any) => {
  const heldItem: HeldItem = {
    name: data.item.name,
    url: data.item.url,
  };
  return heldItem;
};

export const toType: (data: any) => Type = (data: any) => {
  const type: Type = {
    slot: data.slot,
    name: data.type.name,
    url: data.type.url,
  };
  return type;
};

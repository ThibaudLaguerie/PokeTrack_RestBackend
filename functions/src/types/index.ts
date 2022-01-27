export interface Pokemon {
    abilities: Ability[], // talents
    height: number,
    heldItems: HeldItem[],
    id: number,
    level: number,
    moves: MoveBase[],
    name: string,
    order: number,
    sex: string,
    sprites: Sprites,
    stats: [],
    types: Type[],
    weight: number,
    dateCreated: Date
}

export interface Ability {
    name: string,
    url: string,
    isHidden: boolean,
    slot: number
}

export interface HeldItem {
    name: string,
    url: string,
}

export interface MoveBase {
    name: string,
    url: string,
    levelLearnedAt: number
}

export interface Move {
    name: string,
    type: string
}
export interface Sprites {
    backDefault: string,
    backFemale: string
    backShiny: string,
    backShinyFemale: string,
    frontDefault: string,
    frontFemale: string,
    frontShiny: string,
    frontShinyFemale: string
}

export interface Type {
    slot: number,
    name: string,
    url: string
}

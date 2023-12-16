//Interfaces
import { IPokemonShort } from "../Interfaces/interfaces";

export class Generation {
    constructor(
        public id: number,
        public name: string,
        public url: string,
        public species: IPokemonShort[],
        public selected: boolean
    ) {
        this.name = name;
        this.species = species;
        this.selected = selected;
    }

    public toggleSelected = () => {
        this.selected = !this.selected;
    };
}

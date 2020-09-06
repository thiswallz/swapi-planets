interface IPlanetResult {
    count: number;
    next: string;
    previous: null;
    results: IPlanet[];
}
interface IPlanet {
    name: string;
    rotation_period: number;
    orbital_period: number;
    diameter: number;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: number;
    population: number;
    created: string;
    edited: string;
    url: string;
}
//# sourceMappingURL=planet.model.d.ts.map
/**
 * Types
 */

/** General search types */
export type SWAPI_Search = {
    current_page: number
    data: SWAPI_Film_Search | SWAPI_Person_Search | SWAPI_Planet_Search | SWAPI_Species_Search | SWAPI_Starship_Search | SWAPI_Vehicle_Search
}

export type SWAPI_Search_Multi = {
    current_page: number
    data: SWAPI_Films_Search[] | SWAPI_People_Search[] | SWAPI_Planets_Search[] | SWAPI_SpeciesM_Search[] | SWAPI_Starships_Search[] | SWAPI_Vehicles_Search[]
}

/** General Interfaces */
interface Created_Edited {
    created: string
    edited: string
}

interface ID_Name {
    id: number
    name: string
}

interface ID_Title {
    id: number
    title: string
}

interface SWAPI_Counts {
    characters_count: number
    films_count: number
    pilots_count: number
    planets_count: number
    species_count: number
    starships_count: number
    vehicles_count: number
}

interface SWAPI_Detailed_Lists {
    characters: SWAPI_Person[]
    films: ID_Title[]
    pilots: ID_Name[]
    planets: SWAPI_Planet[]
    species: SWAPI_Species[]
    starships: ID_Name[]
    vechicles: ID_Name[]
}

/** Film search interface and types */
interface SWAPI_Film extends Created_Edited, ID_Title {
    director: string
    episode_id: string
    opening_crawl: string
    producer: string
    release_date: string
}

type SWAPI_Films_Search = SWAPI_Film & Omit<SWAPI_Counts, "films_count" | "pilots_count">

type SWAPI_Film_Search = SWAPI_Film & Omit<SWAPI_Detailed_Lists, "films" | "pilots">

/** People search interface and types */
interface SWAPI_Person extends Created_Edited, ID_Name {
    birth_year: string
    eye_color: string
    hair_color: string
    height: string
    homeworld: ID_Name
    mass: string
    skin_color: string
}

type SWAPI_Person_Search = SWAPI_Person & Omit<SWAPI_Detailed_Lists, "characters" | "planets" | "pilots">

type SWAPI_People_Search = SWAPI_Person & Omit<SWAPI_Counts, "characters_count" | "planets_count" | "pilots_count">

/** Planet search interface and types */
interface SWAPI_Planet extends ID_Name, Created_Edited {
    climate: string
    diameter: string
    gravity: string
    orbital_period: string
    population: string
    residents: SWAPI_Person[]
    rotation_period: string
    surface_water: string
    terrain: string
}

type SWAPI_Planet_Search = SWAPI_Planet & Pick<SWAPI_Detailed_Lists, "films">

type SWAPI_Planets_Search = Omit<SWAPI_Planet, "residents"> & Pick<SWAPI_Counts, "films_count"> & {residents_count : number}

/** Starships search interface and types */
interface SWAPI_Starship extends Created_Edited, ID_Name {
    cargo_capacity: string
    consumables: string
    cost_in_credits: string
    crew: string
    hyperdrive_rating: string
    length: string
    manufacturer: string
    max_atmosphering_speed: string
    MGLT: string
    model: string
    passengers: string
    starship_class: string
}

type SWAPI_Starship_Search = SWAPI_Starship & Pick<SWAPI_Detailed_Lists, "films" | "pilots">

type SWAPI_Starships_Search = SWAPI_Starship & Pick<SWAPI_Counts, "films_count" | "pilots_count">

/** Vehicle search interface and types */
type SWAPI_Vehicle_Search = Omit<SWAPI_Starship, "starship_class" | "hyperdrive_rating" | "MGLT"> & Pick<SWAPI_Detailed_Lists, "films" | "pilots"> & { vechicle_class: string}

type SWAPI_Vehicles_Search = Omit<SWAPI_Starship, "starship_class" | "hyperdrive_rating" | "MGLT"> & Pick<SWAPI_Counts, "films_count" | "pilots_count"> & { vechicle_class: string}

/** Species search interface and types */
interface SWAPI_Species extends ID_Name, Created_Edited {
    average_height: string
    average_lifespan: string
    classification: string
    designation: string
    eye_colors: string
    hair_colors: string
    homeworld: ID_Name
    language: string
    people: ID_Name[]
    skin_colors: string
}

type SWAPI_Species_Search = SWAPI_Species & Pick<SWAPI_Detailed_Lists, "films">

type SWAPI_SpeciesM_Search = Omit<SWAPI_Species, "people"> & Pick<SWAPI_Counts, "films_count"> & {people_count: number}
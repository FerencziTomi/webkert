export interface Drawing {
    id: number;
    name: string;
    drawer: string;
    year: number | 'unknown';
    place: string;
    price: number;
    blackwhite: boolean;
}

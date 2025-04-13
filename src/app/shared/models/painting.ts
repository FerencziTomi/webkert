export interface Painting {
    id: number;
    name: string;
    painter: string;
    year: number | 'unknown';
    place: string;
    price: number;
}

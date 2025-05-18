export interface Painting {
    id: string;
    name: string;
    painter: string;
    year: number | 'unknown';
    place: string;
    price: number;
}

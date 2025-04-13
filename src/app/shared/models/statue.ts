export interface Statue {
    id: number;
    name: string;
    sculptor: string;
    height: number;
    weight: number;
    place: string;
    year: number | 'unknown';
    price: number;
}

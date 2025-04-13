export interface Artist {
    id: number;
    name: string;
    birth: Date;
    place: string;
    works_in: 'Festő' | 'Szobrász' | 'Rajzoló' | 'Más';
}

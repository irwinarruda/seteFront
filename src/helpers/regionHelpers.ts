export const regionTypes = new Map<string, Array<string>>();
regionTypes.set('Norte', ['RO', 'AC', 'AM', 'RR', 'PA', 'AP', 'TO']);
regionTypes.set('Nordeste', [
    'MA',
    'PI',
    'CE',
    'RN',
    'PB',
    'PE',
    'AL',
    'SE',
    'BA',
]);
regionTypes.set('CentroOeste', ['MS', 'MT', 'GO', 'DF']);
regionTypes.set('Sudeste', ['MG', 'ES', 'RJ', 'SP']);
regionTypes.set('Sul', ['PR', 'SC', 'RS']);

export const regionsArr = [
    'Norte',
    'Nordeste',
    'CentroOeste',
    'Sudeste',
    'Sul',
];

export type regionTypesKeys =
    | 'Norte'
    | 'Nordeste'
    | 'CentroOeste'
    | 'Sudeste'
    | 'Sul';

export function regionTypesHandler(uf: string): string {
    let regionKey = '';
    regionTypes.forEach((value, key) => {
        if (value.findIndex((reg) => reg === uf) !== -1) {
            regionKey = key;
        }
    });
    return regionKey;
}

export interface IRegionData {
    codigo_ibge: string;
    codigo_municipio: string;
    latitude: string;
    longitude: string;
    nome_cidade: string;
    nome_estado: string;
    uf: string;
    usa_sistema: boolean;
}
export interface IDividedData {
    Norte: Array<IRegionData>;
    Nordeste: Array<IRegionData>;
    CentroOeste: Array<IRegionData>;
    Sudeste: Array<IRegionData>;
    Sul: Array<IRegionData>;
    count: number;
}
export interface ISeteUsageData {
    totalUsers: IDividedData;
    activeUsers: IDividedData;
    inactiveUsers: IDividedData;
}

export function regionDivider(data: Array<IRegionData>): ISeteUsageData {
    let ufDividedTotalUsers: IDividedData = {
        Norte: [],
        Nordeste: [],
        CentroOeste: [],
        Sudeste: [],
        Sul: [],
        count: 0,
    };
    let ufDividedActiveUsers: IDividedData = {
        Norte: [],
        Nordeste: [],
        CentroOeste: [],
        Sudeste: [],
        Sul: [],
        count: 0,
    };
    let ufDividedInactiveUsers: IDividedData = {
        Norte: [],
        Nordeste: [],
        CentroOeste: [],
        Sudeste: [],
        Sul: [],
        count: 0,
    };
    data.forEach((item) => {
        const regionName = regionTypesHandler(item.uf);
        if (item.usa_sistema) {
            ufDividedActiveUsers[regionName as regionTypesKeys].push(item);
            ufDividedActiveUsers.count++;
        } else {
            ufDividedInactiveUsers[regionName as regionTypesKeys].push(item);
            ufDividedInactiveUsers.count++;
        }
        ufDividedTotalUsers[regionName as regionTypesKeys].push(item);
        ufDividedTotalUsers.count++;
    });
    return {
        totalUsers: ufDividedTotalUsers,
        activeUsers: ufDividedActiveUsers,
        inactiveUsers: ufDividedInactiveUsers,
    };
}

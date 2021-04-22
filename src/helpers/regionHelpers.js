export const regionTypes = {
    Norte: ['RO', 'AC', 'AM', 'RR', 'PA', 'AP', 'TO'],
    Nordeste: ['MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA'],
    CentroOeste: ['MS', 'MT', 'GO', 'DF'],
    Sudeste: ['MG', 'ES', 'RJ', 'SP'],
    Sul: ['PR', 'SC', 'RS'],
};

export const regionsArr = [
    'Norte',
    'Nordeste',
    'CentroOeste',
    'Sudeste',
    'Sul',
];

export function regionTypesHandler(uf) {
    const arrLength = regionsArr.length;
    for (let i = 0; i < arrLength; i++) {
        if (
            regionTypes[regionsArr[i]].findIndex((item) => item === uf) !== -1
        ) {
            return regionsArr[i];
        }
    }
}

export function regionDivider(data) {
    let ufDividedTotalUsers = {
        Norte: [],
        Nordeste: [],
        CentroOeste: [],
        Sudeste: [],
        Sul: [],
        count: 0,
    };
    let ufDividedActiveUsers = {
        Norte: [],
        Nordeste: [],
        CentroOeste: [],
        Sudeste: [],
        Sul: [],
        count: 0,
    };
    let ufDividedInactiveUsers = {
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
            ufDividedActiveUsers[regionName].push(item);
            ufDividedActiveUsers.count++;
        } else {
            ufDividedInactiveUsers[regionName].push(item);
            ufDividedInactiveUsers.count++;
        }
        ufDividedTotalUsers[regionName].push(item);
        ufDividedTotalUsers.count++;
    });
    return {
        totalUsers: ufDividedTotalUsers,
        activeUsers: ufDividedActiveUsers,
        inactiveUsers: ufDividedInactiveUsers,
    };
}

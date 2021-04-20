export const regionTypes = {
    Norte: ['RO', 'AC', 'AM', 'RR', 'PA', 'AP', 'TO'],
    Nordeste: ['MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA'],
    CentroOeste: ['MS', 'MT', 'GO', 'DF'],
    Sudeste: ['MG', 'ES', 'RJ', 'SP'],
    Sul: ['PR', 'SC', 'RS'],
};

const regionsArr = ['Norte', 'Nordeste', 'CentroOeste', 'Sudeste', 'Sul'];

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
    let ufDividedData = {
        Norte: [],
        Nordeste: [],
        CentroOeste: [],
        Sudeste: [],
        Sul: [],
    };
    data.forEach((item) => {
        const regionName = regionTypesHandler(item.uf);
        ufDividedData[regionName] = [...ufDividedData[regionName], item];
    });
    return ufDividedData;
}

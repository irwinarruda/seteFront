import React from 'react';
import { RiDeleteBack2Line } from 'react-icons/ri';
import { ColumnWithLooseAccessor } from 'react-table';

export const cityTableColumns: Array<ColumnWithLooseAccessor> = [
    {
        Header: 'Código',
        accessor: 'codigo_municipio',
    },
    {
        Header: 'Cidade',
        accessor: 'nome_cidade',
    },
    {
        Header: 'Estado',
        accessor: 'uf',
    },
    {
        Header: 'Alunos',
        accessor: 'n_alunos',
    },
    {
        Header: 'Escolas',
        accessor: 'n_escolas',
    },
    {
        Header: 'Rotas',
        accessor: 'n_rotas',
    },
    {
        Header: 'Motoristas',
        accessor: 'n_motoristas',
    },
    {
        Header: 'Veículos',
        accessor: 'n_veiculos_funcionamento',
    },
];

export interface ICityTableData {
    codigo_municipio: string;
    nome_cidade: string;
    uf: string;
    data: {
        n_escolas: string | null;
        n_alunos: string | null;
        n_veiculos_funcionamento: string | null;
        n_veiculos_manutencao: string | null;
        n_rotas: string | null;
        n_rotas_kilometragem_total: string | null;
        n_rotas_kilometragem_media: string | null;
        n_motoristas: string | null;
        n_tempo_medio_rota: string | null;
    };
}

export const cityTableDataHandle = (arr: Array<ICityTableData>) => {
    return arr.map((item) => {
        let itemData = {
            ...item.data,
            codigo_municipio: item.codigo_municipio,
            nome_cidade: item.nome_cidade,
            uf: item.uf,
        };
        return itemData;
    });
};

export const freeAccessTableColumns: Array<ColumnWithLooseAccessor> = [
    {
        Header: 'Nome',
        accessor: 'nome',
    },
    {
        Header: 'E-mail',
        accessor: 'email',
    },
    {
        Header: 'Localidade',
        accessor: 'localidade',
    },
    {
        Header: 'Ações',
        accessor: 'acoes',
    },
];

export interface IFreeAccessData {
    uid: string;
    nome: string;
    codigo_cidade: string;
    localidade: string;
    email: string;
}
export interface IFreeAccessDataTreated {
    user_id: string;
    nome: string;
    localidade: string;
    email: string;
}
export const freeAccessTableDataHandle = (arr: Array<IFreeAccessData>) => {
    return arr.map((item) => {
        let itemData = {
            user_id: item.uid,
            nome: item.nome,
            email: item.email,
            localidade: item.localidade,
            acoes: (
                <RiDeleteBack2Line
                    size={22}
                    color="#FF6161"
                    style={{ marginBottom: '-5px', cursor: 'pointer' }}
                />
            ),
        };
        return itemData;
    });
};

export const userListTableColumns: Array<ColumnWithLooseAccessor> = [
    {
        Header: 'Ativo',
        accessor: 'is_ativo',
    },
    {
        Header: 'Nome',
        accessor: 'nome',
    },
    {
        Header: 'E-mail',
        accessor: 'email',
    },
];

export interface IUserListData {
    id: string;
    nome: string;
    email: string;
    is_ativo: string;
}
export const userListTableDataHandle = (arr: Array<IUserListData>) => {
    return arr.map((item) => {
        let itemData = {
            nome: item.nome,
            email: item.email,
            is_ativo: item.is_ativo,
        };
        return itemData;
    });
};

export const seteUsersListTableColumns: Array<ColumnWithLooseAccessor> = [
    {
        Header: 'Nome',
        accessor: 'nome',
    },
    {
        Header: 'E-mail',
        accessor: 'email',
    },
    {
        Header: 'Telefone',
        accessor: 'telefone',
    },
    {
        Header: 'CPF',
        accessor: 'cpf',
    },
];

export interface ISeteUserListData {
    uid: string;
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
}
export const seteUserListTableDataHandle = (arr: Array<ISeteUserListData>) => {
    return arr.map((item) => {
        let itemData = {
            nome: item.nome,
            email: item.email,
            telefone: item.telefone,
            cpf: item.cpf,
        };
        return itemData;
    });
};

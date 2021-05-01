import React from 'react';
import { RiDeleteBack2Line } from 'react-icons/ri';

export const cityTableColumns = [
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

export const cityTableDataHandle = (arr) => {
    return arr.map((item) => {
        let itemData = item.data;
        itemData = {
            ...itemData,
            codigo_municipio: item.codigo_municipio,
            nome_cidade: item.nome_cidade,
            uf: item.uf,
        };
        return itemData;
    });
};

export const freeAccessTableColumns = [
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

export const freeAccessTableDataHandle = (arr) => {
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

export const userListTableColumns = [
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

export const userListTableDataHandle = (arr) => {
    return arr.map((item) => {
        let itemData = {
            nome: item.nome,
            email: item.email,
            is_ativo: item.is_ativo,
        };
        return itemData;
    });
};

export const seteUsersListTableColumns = [
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

export const seteUserListTableDataHandle = (arr) => {
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

import React from 'react';
import { RiDeleteBack2Line } from 'react-icons/ri';
import { ColumnWithLooseAccessor } from 'react-table';
import ReactTooltip from 'react-tooltip';

import { FaEdit, FaRegTimesCircle, FaSearch } from 'react-icons/fa';

import ChangePasswordIcon from '../assets/icon/password.png';

import { ButtonContainer } from '../components/Buttons/YellowButton/styles';

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
        Header: 'CPF',
        accessor: 'cpf',
    },
    {
        Header: 'Liberado',
        accessor: 'is_liberado',
    },

    {
        Header: 'AÇÕES',
        accessor: 'senha',
    },
    {
        accessor: 'telefone',
    },
    {
        accessor: 'nivel_permissao',
    },
    {
        accessor: 'id_usuario',
    },
    {
        accessor: 'codigo_cidade',
    },
];

export interface ISeteUserListData {
    uid: string;
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
    nivel_permissao: string;
    id_usuario: string;
    codigo_cidade: string;
    is_liberado: string;
}

const AcoesComponent: React.FC = () => {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                data-tip="hello world"
            >
                <img
                    style={{
                        display: 'flex',
                        marginBottom: '-2px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                    }}
                    src={ChangePasswordIcon}
                    width="30px"
                />
            </div>
            <ReactTooltip>Alterar Senha</ReactTooltip>
        </>
    );
};

export const seteUserListTableDataHandle = (arr: Array<ISeteUserListData>) => {
    return arr.map((item) => {
        let itemData = {
            id_usuario: item.id_usuario,
            codigo_cidade: item.codigo_cidade,
            nome: item.nome,
            email: item.email,
            telefone: item.telefone,
            cpf: item.cpf,
            is_liberado: item.is_liberado === 'S' ? 'Sim' : 'Não',
            nivel_permissao: item.nivel_permissao,
            senha: <AcoesComponent />,
        };
        return itemData;
    });
};

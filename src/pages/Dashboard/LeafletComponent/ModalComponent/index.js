import React from 'react';
import {
    Container,
    ModalContainer,
    ModalItems,
    ModalItemsContainer,
} from './styles';

import { ReactSVG } from 'react-svg';
import { BsArrowLeft } from 'react-icons/bs';
import GeneralInfo from '../../../../assets/svg/modal-city/informacaoGeral.svg';
import StudentsNumber from '../../../../assets/svg/modal-city/numero-aluno.svg';
import SchoolsNumber from '../../../../assets/svg/modal-city/escola-cadastrada.svg';
import WorkingBus from '../../../../assets/svg/modal-city/onibus-funcionamento.svg';
import NotWorkingBus from '../../../../assets/svg/modal-city/onibus-manutencao.svg';
import RoutesNumber from '../../../../assets/svg/modal-city/numero-rota.svg';
import KmTotal from '../../../../assets/svg/modal-city/rotas-total.svg';
import KmMean from '../../../../assets/svg/modal-city/km-media.svg';
import RoutesTime from '../../../../assets/svg/modal-city/tempo-rota.svg';

function ModalComponent({
    modalIsOpened,
    setModalIsOpened,
    modalObj,
    setModalObj,
}) {
    const closeModal = React.useCallback(() => {
        setModalIsOpened(false);
    }, [setModalIsOpened]);

    return (
        <Container modalIsOpened={modalIsOpened}>
            <ModalContainer>
                <div className="modal-back" onClick={closeModal}>
                    <BsArrowLeft size={40} color="var(--color-black)" />
                </div>
                <div className="modal-info">
                    <div>
                        <ReactSVG src={GeneralInfo} />
                        <h2>Informações Gerais de:</h2>
                    </div>
                    <h3>
                        {modalObj?.nome_cidade}-{modalObj?.uf}
                    </h3>
                </div>
                <ModalItemsContainer>
                    <ModalItems>
                        <div>
                            <p>Alunos Atendido</p>
                            <ReactSVG src={StudentsNumber} />
                            <h4>{modalObj.data?.n_alunos}</h4>
                        </div>
                        <div>
                            <p>Escolas Atendidas</p>
                            <ReactSVG src={SchoolsNumber} />
                            <h4>{modalObj.data?.n_escolas}</h4>
                        </div>
                        <div>
                            <p>Veículos em Funcionamento</p>
                            <ReactSVG src={WorkingBus} />
                            <h4>{modalObj.data?.n_veiculos_funcionamento}</h4>
                        </div>
                        <div>
                            <p>Veículos em Manutenção</p>
                            <ReactSVG src={NotWorkingBus} />
                            <h4>{modalObj.data?.n_veiculos_manutencao}</h4>
                        </div>

                        <div>
                            <p>Quantidade de Rotas</p>
                            <ReactSVG src={RoutesNumber} />
                            <h4>{modalObj.data?.n_rotas}</h4>
                        </div>
                        <div>
                            <p>Quilometragem Total</p>
                            <ReactSVG src={KmTotal} />
                            <h4>
                                {Math.round(
                                    Number(
                                        modalObj.data
                                            ?.n_rotas_kilometragem_total || '0',
                                    ),
                                )}
                                {' Km'}
                            </h4>
                        </div>
                        <div>
                            <p>Tempo Médio das Rotas</p>
                            <ReactSVG src={KmMean} />
                            <h4>
                                {Math.round(
                                    Number(
                                        modalObj.data
                                            ?.n_rotas_kilometragem_media || '0',
                                    ),
                                )}
                                {' Km'}
                            </h4>
                        </div>
                        <div>
                            <p>Veículos em Manutenção</p>
                            <ReactSVG src={RoutesTime} />
                            <h4>
                                {Number(modalObj.data?.n_veiculos_manutencao)}
                                {' min'}
                            </h4>
                        </div>
                    </ModalItems>
                </ModalItemsContainer>
            </ModalContainer>
        </Container>
    );
}

export default ModalComponent;

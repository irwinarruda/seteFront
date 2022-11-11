import React from 'react';
import { Container, FormContainer } from './styles';

import { Form } from 'formik';
import { ImSpinner2 } from 'react-icons/im';
import { BsArrowLeft } from 'react-icons/bs';

import FormikInputRadio from '../../../../components/Inputs/FormikInputRadio';
import FormikInputText from '../../../../components/Inputs/FormikInputText';
import MainBlueButton from '../../../../components/Buttons/MainBlueButton';

import {
    useResetPassword,
    ResetUserPasswordProvider,
} from '../../../../contexts/ResetUserPasswordContext';

interface IFreeAccessFormProps {
    modalIsOpened: boolean;
    setModalIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
    isSubmitting: boolean;
}

const ResetPasswordForm: React.FC<IFreeAccessFormProps> = ({
    modalIsOpened,
    setModalIsOpened,
    handleSubmit,
    isSubmitting,
}) => {
    const formContainerRef = React.useRef<HTMLDivElement | null>(null);
    const { setResetPassord } = useResetPassword();
    const handleGoBackClick = React.useCallback((): void => {
        setResetPassord(false);
    }, [setModalIsOpened]);

    return (
        <Container modalIsOpened={modalIsOpened}>
            <FormContainer modalIsOpened={modalIsOpened} ref={formContainerRef}>
                <div className="goback-button">
                    <div onClick={handleGoBackClick}>
                        <BsArrowLeft size={40} color="var(--color-black)" />
                        <h4>Voltar</h4>
                    </div>
                </div>
                <h3>
                    Nessa seção você poderá alterar a senha de acesso do usuário
                    ao software SETE.
                </h3>
                <Form onSubmit={handleSubmit}>
                    <FormikInputText
                        type="text"
                        labelText="Digite a nova senha"
                        name="new_password"
                    />

                    <FormikInputText
                        type="text"
                        labelText="Confirme a nova senha"
                        name="confirm_new_passoword"
                    />

                    <div className="free-access-button-container">
                        {isSubmitting ? (
                            <ImSpinner2
                                size={40}
                                color="#FBCF02"
                                style={{ marginBottom: '0px' }}
                            />
                        ) : (
                            <MainBlueButton type="submit">
                                Alterar Senha
                            </MainBlueButton>
                        )}
                    </div>
                </Form>
            </FormContainer>
        </Container>
    );
};

export default ResetPasswordForm;

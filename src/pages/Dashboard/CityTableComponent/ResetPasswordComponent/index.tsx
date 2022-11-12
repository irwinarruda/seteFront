import React from 'react';
import { Container, FormContainer } from './styles';

import { Form } from 'formik';
import { ImSpinner2 } from 'react-icons/im';
import { BsArrowLeft } from 'react-icons/bs';

import FormikInputRadio from '../../../../components/Inputs/FormikInputRadio';
import FormikInputText from '../../../../components/Inputs/FormikInputText';
import MainBlueButton from '../../../../components/Buttons/MainBlueButton';

interface IFreeAccessFormProps {
    setResetPassord: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
    isSubmitting: boolean;
}

const ResetPasswordForm: React.FC<IFreeAccessFormProps> = ({
    setResetPassord,
    handleSubmit,
    isSubmitting,
}) => {
    const formContainerRef = React.useRef<HTMLDivElement | null>(null);

    const handleGoBackClick = React.useCallback((): void => {
        setResetPassord(false);
    }, [setResetPassord]);

    return (
        <Container>
            <FormContainer ref={formContainerRef}>
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
                        type="password"
                        labelText="Digite a nova senha"
                        name="password"
                    />

                    <FormikInputText
                        type="password"
                        labelText="Confirme a nova senha"
                        name="confirm_password"
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
                    <FormikInputText type="hidden" labelText="" name="nome" />
                    <FormikInputText type="hidden" labelText="" name="email" />
                    <FormikInputText
                        type="hidden"
                        labelText=""
                        name="telefone"
                    />
                    <FormikInputText
                        type="hidden"
                        labelText=""
                        name="permissao"
                    />
                </Form>
            </FormContainer>
        </Container>
    );
};

export default ResetPasswordForm;

import React from 'react';
import { Container, FormContainer } from './styles';

import { Form } from 'formik';
import { ImSpinner2 } from 'react-icons/im';
import { BsArrowLeft } from 'react-icons/bs';

import FormikInputRadio from '../../../../components/Inputs/FormikInputRadio';
import FormikInputText from '../../../../components/Inputs/FormikInputText';
import MainBlueButton from '../../../../components/Buttons/MainBlueButton';

function FreeAccessForm({
    modalIsOpened,
    setModalIsOpened,
    handleSubmit,
    isSubmitting,
}) {
    const formContainerRef = React.useRef(null);

    const handleGoBackClick = React.useCallback(() => {
        setModalIsOpened(false);
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
                    Nessa sessão você poderá liberar acesso ao software SETE dos
                    emails solicitados à FCT.
                </h3>
                <Form onSubmit={handleSubmit}>
                    <FormikInputText
                        type="text"
                        labelText="E-mail"
                        name="permission_email"
                    />
                    <div className="free-access-radio-container">
                        <FormikInputRadio
                            name="permission_checkbox"
                            labelText="Leitor"
                            value="reader"
                        />
                        <FormikInputRadio
                            name="permission_checkbox"
                            labelText="Administrador"
                            value="admin"
                        />
                    </div>
                    <div className="free-access-button-container">
                        {isSubmitting ? (
                            <ImSpinner2
                                size={40}
                                color="#FBCF02"
                                style={{ marginBottom: '0px' }}
                            />
                        ) : (
                            <MainBlueButton type="submit">
                                Liberar Acesso
                            </MainBlueButton>
                        )}
                    </div>
                </Form>
            </FormContainer>
        </Container>
    );
}

export default FreeAccessForm;

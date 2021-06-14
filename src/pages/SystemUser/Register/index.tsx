import React from 'react';
import { SignUpContainer } from './styles';
import { Link } from 'react-router-dom';

import FormikInputText from '../../../components/Inputs/FormikInputText';
import MainBlueButton from '../../../components/Buttons/MainBlueButton';

import { useAlertModal } from '../../../hooks/AlertModal';
import { useErrorHandler } from '../../../hooks/Errors';
import { ImSpinner2 } from 'react-icons/im';

import md5 from 'md5';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { api, USER_CREATE } from '../../../services/UserApi';

interface IFormikValues {
    name_field: string;
    email_field: string;
    password_field: string;
    password_confirm_field: string;
}

function SignUp() {
    const { clearModal, createModal } = useAlertModal();
    const { errorHandler } = useErrorHandler();

    async function handleFormikSubmit(
        values: IFormikValues,
        { setSubmitting, resetForm }: FormikHelpers<IFormikValues>,
    ) {
        try {
            setSubmitting(true);
            createModal();
            const token = window.localStorage.getItem('@seteweb:token');
            const body = {
                nome: values.name_field,
                email: values.email_field,
                senha: md5(values.password_field),
            };
            await api(USER_CREATE(body, token));
            createModal('success', {
                title: 'Sucesso!',
                text: 'Usuário cadastrado com sucesso',
            });
        } catch (err) {
            errorHandler(err, {
                title: 'Erro ao cadastrar usuário no sistema',
            });
        } finally {
            setSubmitting(false);
            resetForm();
            clearModal();
        }
    }

    return (
        <SignUpContainer>
            <div>
                <h3>
                    Nessa seção você poderá cadastrar novos usuários para
                    utilizar o sistema web.
                </h3>
            </div>
            <Formik
                initialValues={{
                    name_field: '',
                    email_field: '',
                    password_field: '',
                    password_confirm_field: '',
                }}
                validationSchema={Yup.object().shape({
                    name_field: Yup.string().required(
                        'O Nome deve ser preenchido',
                    ),
                    email_field: Yup.string()
                        .required('O Email deve ser preenchido')
                        .email('O valor deve ser um email válido'),
                    password_field: Yup.string()
                        .required('Deve digitar a senha')
                        .min(3, 'Senha deve ter 3 caracteres'),
                    password_confirm_field: Yup.string()
                        .required('Deve digitar a senha')
                        .oneOf(
                            [Yup.ref('password_field'), null],
                            'As senhas devem ser iguais',
                        ),
                })}
                validateOnBlur={true}
                validateOnChange={false}
                onSubmit={handleFormikSubmit}
            >
                {({ handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <FormikInputText
                            type="text"
                            labelText="Nome"
                            name="name_field"
                        />
                        <FormikInputText
                            type="text"
                            labelText="E-mail"
                            name="email_field"
                        />
                        <FormikInputText
                            type="password"
                            labelText="Senha"
                            name="password_field"
                        />
                        <FormikInputText
                            type="password"
                            labelText="Confirmar Senha"
                            name="password_confirm_field"
                        />
                        <div>
                            {isSubmitting ? (
                                <ImSpinner2
                                    size={40}
                                    color="#FBCF02"
                                    style={{ marginBottom: '5px' }}
                                />
                            ) : (
                                <MainBlueButton
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Criar Usuário
                                </MainBlueButton>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </SignUpContainer>
    );
}

export default SignUp;

import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FreeAccessContainer } from './styles';

import FormikInputRadio from '../../../components/Inputs/FormikInputRadio';
import FormikInputText from '../../../components/Inputs/FormikInputText';
import MainBlueButton from '../../../components/Buttons/MainBlueButton';

import { useAuth } from '../../../context/AuthContex';
import { api, FREE_ACCESS_FIREBASE } from '../../../services/UserApi';
import swal from 'sweetalert';
import { ImSpinner2 } from 'react-icons/im';

function FreeAccessComponent() {
    const { handleRequestError } = useAuth();

    async function handleFormikSubmit(values, { setSubmitting, resetForm }) {
        try {
            setSubmitting(true);
            const token = window.localStorage.getItem('@seteweb:token');
            const body = {
                email: values.permissionEmail,
                tipo_permissao: values.permissionCheckbox,
            };
            const response = await api(FREE_ACCESS_FIREBASE(body, token));
            const data = await response.data;
            if (!data.result) {
                await swal('Atenção!', data.messages, 'warning');
            } else {
                await swal('Sucesso!', data.messages, 'success');
            }
        } catch (err) {
            const errorMessage = handleRequestError(err);
            await swal('Erro ao liberar acesso', errorMessage, 'error');
        } finally {
            setSubmitting(false);
            resetForm();
        }
    }
    return (
        <FreeAccessContainer>
            <div className="free-access-content">
                <h3>
                    Nessa sessão você poderá liberar acesso ao software SETE dos
                    emails solicitados à FCT.
                </h3>
                <Formik
                    initialValues={{
                        permissionEmail: '',
                        permissionCheckbox: 'reader',
                    }}
                    validationSchema={Yup.object().shape({
                        permissionEmail: Yup.string()
                            .required('O Email deve ser preenchido')
                            .email('O valor deve ser um email válido'),
                    })}
                    onSubmit={handleFormikSubmit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setTouched,
                        setFieldValue,
                        isSubmitting,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <FormikInputText
                                type="text"
                                labelText="E-mail"
                                inputId="permissionEmail"
                                value={values.permissionEmail}
                                errors={errors.permissionEmail}
                                touched={touched}
                                setTouched={setTouched}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <div className="free-access-radio-container">
                                <FormikInputRadio
                                    name="permissionCheckbox"
                                    inputId="user-permission-reader"
                                    labelText="Leitor"
                                    value="reader"
                                    checked={values.permissionCheckbox}
                                    onChange={setFieldValue}
                                    onBlur={handleBlur}
                                />
                                <FormikInputRadio
                                    name="permissionCheckbox"
                                    inputId="user-permission-admin"
                                    labelText="Administrador"
                                    value="admin"
                                    checked={values.permissionCheckbox}
                                    onChange={setFieldValue}
                                    onBlur={handleBlur}
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
                        </form>
                    )}
                </Formik>
            </div>
        </FreeAccessContainer>
    );
}

export default FreeAccessComponent;

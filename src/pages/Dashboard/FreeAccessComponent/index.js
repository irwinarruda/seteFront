import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FreeAccessContainer } from './styles';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

import FormikInputRadio from '../../../components/FormikInputRadio';
import FormikInputText from '../../../components/FormikInputText';
import MainBlueButton from '../../../components/Buttons/MainBlueButton';

import { useAuth } from '../../../context/AuthContex';
import { FREE_ACCESS_FIREBASE } from '../../../services/UserApi';
import axios from 'axios';

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
            const response = await axios(FREE_ACCESS_FIREBASE(body, token));
            const data = await response.data;
            if (!data.result) {
                throw { response };
            }
            toast.success(data.messages.toString(), {
                position: 'top-center',
                autoClose: 7000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            const errorMessage = handleRequestError(err);

            toast.error(errorMessage, {
                position: 'top-center',
                autoClose: 7000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
                                <MainBlueButton
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Liberar Acesso
                                </MainBlueButton>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </FreeAccessContainer>
    );
}

export default FreeAccessComponent;

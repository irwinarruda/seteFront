import React from 'react';
import { FreeAccessContainer } from './styles';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

import InputText from '../../../components/InputText';
import InputRadio from '../../../components/InputRadio';
import MainBlueButton from '../../../components/Buttons/MainBlueButton';

import { FREE_ACCESS_FIREBASE } from '../../../services/UserApi';
import axios from 'axios';

function FreeAccessComponent() {
    const [freeAccessEmail, setFreeAccessEmail] = React.useState('');
    const [freeAccessRadio, setFreeAccessRadio] = React.useState('');

    async function handleSubmit(event) {
        try {
            event.preventDefault();
            const token = window.localStorage.getItem('@seteweb:token');
            const body = {
                email: freeAccessEmail,
                tipo_permissao: freeAccessRadio,
            };
            const response = await axios(FREE_ACCESS_FIREBASE(body, token));
            const data = await response.data;
            if (!data.result) {
                throw new Error(data.messages);
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
            console.log(data.messages);
        } catch (err) {
            toast.error(err.toString(), {
                position: 'top-center',
                autoClose: 7000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.error(err);
        }
    }
    return (
        <FreeAccessContainer>
            <div className="free-access-content">
                <h3>
                    Nessa sessão você poderá liberar acesso ao software SETE dos
                    emails solicitados à FCT.
                </h3>
                <form onSubmit={handleSubmit}>
                    <InputText
                        labelText="Email: "
                        inputId="free-access-email"
                        value={freeAccessEmail}
                        setValue={setFreeAccessEmail}
                    />
                    <div className="free-access-radio-container">
                        <InputRadio
                            name="user-permission"
                            id="user-permission-reader"
                            label="Leitor"
                            value="reader"
                            checked={freeAccessRadio}
                            setChecked={setFreeAccessRadio}
                        />
                        <InputRadio
                            name="user-permission"
                            id="user-permission-admin"
                            label="Administrador"
                            value="admin"
                            checked={freeAccessRadio}
                            setChecked={setFreeAccessRadio}
                        />
                    </div>
                    <div className="free-access-button-container">
                        <MainBlueButton type="submit">
                            Liberar Acesso
                        </MainBlueButton>
                    </div>
                </form>
            </div>
        </FreeAccessContainer>
    );
}

export default FreeAccessComponent;

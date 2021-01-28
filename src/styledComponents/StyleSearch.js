import styled from 'styled-components';
import { IonPage } from '@ionic/react';

export const MySearchPage = styled(IonPage)`
    
.myContent{
    --background: #EAE7E2;
    display: flex;
    justify-content: space-between;
}

.myInputRow{
    align-items: center;
    //border: 1px solid white;
    border-radius: 7px;
    //background: whitesmoke;
    width: 300px;
    height: 50px;
    margin-top: 20px;
    margin-left: 33px
}

.myResultGrid{
    margin-top: 30px;
}

.myResultTitle{
    margin-left: 30px;
    font-size: 20px;
}

.myResultPicture{
    width: 300px;
    margin-left: 30px;
}

`;
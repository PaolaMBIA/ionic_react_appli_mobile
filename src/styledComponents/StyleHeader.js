import styled from 'styled-components';
import { IonButton, IonHeader } from '@ionic/react';

export const MyButton = styled(IonButton)`
  --background: transparent;
  .myIcon {
    color: black;
  }
`;

export const MyHeader = styled(IonHeader)`
  background: rgba(42,28,28,0.58);
  display: flex;
  justify-content: space-between;
 
  .myText{
    margin-top: 14px;
    color: #F08A15;
  }

  .myMessage{
    margin-top: 14px;
    color: black;
  }
`;
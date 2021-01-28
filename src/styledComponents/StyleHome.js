import styled from 'styled-components';
import { IonPage } from '@ionic/react';

export const MyHomePage = styled(IonPage)`
    
    .myContent{
        --background: #EAE7E2;
        display: flex;
        justify-content: space-between;
    }

    .myTool{
        height: max-content;
    }

    .myCardHeader{
        display:flex;
    }

    .myTitleImage{
        width: 50px;
        margin-right: 30px;
    }

    .myTextIcon{
        color: #F08A15;
    }

    .myTextOverview{
        text-align: justify;
        margin-right: 22px;
        margin-left: 20px;
    }

    .myCardSubtitle{
        font-size: 15px;
        color: #F08A15;
        margin-left: 8px;
    }

    .myBottomIcon{
        margin-bottom: 20px;
    }

    .myBottomTool{
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 18px;
    }

    .myIonText{
        font-size: 15px;
        color: #595959
    }

    .myIcons{
        font-size: 20px
    }

    .myCommentsRow{
        border: 1px solid white;
        background: #EAE7E2;
        margin: 20px;
        width: 220px;
    }

    .myCommentImage{
        height:20px;
        width: 20px;
        //border-radius: 100%;
    }

    .myRowTitle{
        display:flex;
        justify-content: space-between
    }

    .styleText{
        font-size: 10px;
        font-style: italic;
        font-family: cursive;
    }

    .myTimeStamp{
        position: absolute;
        top:5;
        right: 10px;
        font-style: italic;
        font-family: cursive;
    }
`;
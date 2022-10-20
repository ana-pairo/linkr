import styled from 'styled-components';

const Header = styled.div`
    background-color: #151515;
    color: #ffffff;
    height: 72px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding-left: 28px;
        padding-right: 10px;
    }
`;

const Body = styled.div`
    background-color: #333333;
    color: #ffffff;
    height: 100vw;
    width: 100vw;
    box-sizing: border-box;
    @media (max-width: 614px) {
        .trending{
            display: none;
        }
    }
    .postsTrending{
        display: flex;
        gap: 25px;
        margin-left: 10%;
        margin-right: 20%;
        margin-top: 41px;
    }
    .posts{
        display: flex;
        flex-direction: column;
        width: 611px;
        height: 80vw;
        gap: 16px;
    }

    .post{
        width: 611px;
        height: 230px;
        background-color: #171717;
    }

    .trending{
        width: 301px;
        height: 406px;
        background-color: #171717;
    }
`;

export {
    Header,
    Body
};
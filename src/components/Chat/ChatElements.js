import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10rem;
  align-items: center;
  background-color: white;

  .container {
    height: 100vh;
    width: 100vw;
    background-image: url("https://w0.peakpx.com/wallpaper/557/521/HD-wallpaper-whatsapp-v-background-doodle-pattern-patterns-whatsapp-thumbnail.jpg");
    display: grid;
    grid-template-columns: 27% 73%;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

import reactLogo from "../../assets/react.svg";
import viteLogo from "../../../public/vite.svg";
import { Container } from "@mui/material";

function HomePage() {
  return (
    <Container>
      <h1>Mercury</h1>
      <a href="https://vite.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </Container>
  );
}

export default HomePage;

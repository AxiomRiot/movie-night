import { RiArrowDropDownLine } from 'react-icons/ri';
import styled from 'styled-components';

interface TopBarProps {
  handleFilterWindowOpen: () => void;
}

const TopBarContainer = styled.div`
  background: ${props => props.theme.navBarColor};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 100%;
  background: #4D4D4D;
  border-radius: 1px;
  min-height: 40px;
`;

export default function TopBar({ handleFilterWindowOpen }: TopBarProps) {
  return (
    <TopBarContainer>
      <h1>Movie Picker</h1>
      <button>Pick A Movie</button>
      <VerticalDivider />
      <button onClick={handleFilterWindowOpen}>
        <span>Filter</span>
        <RiArrowDropDownLine />
      </button>
    </TopBarContainer>
  );
}

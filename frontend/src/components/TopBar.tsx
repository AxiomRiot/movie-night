import { RiArrowDropDownLine } from 'react-icons/ri';
import styled from 'styled-components';

interface TopBarProps {
  handleFilterWindowOpen: () => void;
  handlePickMovie: () => void;
}

const TopBarContainer = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VerticalDivider = styled.div`
  width: 1.25px;
  height: 100%;
  background: #4D4D4D;
  border-radius: 1px;
  min-height: 30px;
`;

const Header = styled.h1`
  margin-left: 4em;
  font-family: 'Roboto';
`;

const Wrapper = styled.div`
  display: flex;
  margin-right: 12em;
`;

const PickAMovieButton = styled.button`
  border: none;
  background-color: white;
  font-family: 'Roboto';
  font-weight: bolder;
  font-size: medium;
  color: oklch(44.6% 0.043 257.281);
  cursor: pointer;
`;

const FilterButton = styled.button`
  border: none;
  background-color: white;
  font-family: 'Roboto';
  font-size: 1.2vw;
  color: oklch(70.4% 0.04 256.788);
  cursor: pointer;
`;

export default function TopBar({ handleFilterWindowOpen, handlePickMovie }: TopBarProps) {
  return (
    <TopBarContainer>
      <Header>DiceRoll</Header>
      <Wrapper>
        <PickAMovieButton onClick={handlePickMovie}>Pick A Movie</PickAMovieButton>
        <VerticalDivider />
        <FilterButton onClick={handleFilterWindowOpen}>
          <span>Filter</span>
          <RiArrowDropDownLine />
        </FilterButton>
      </Wrapper>
    </TopBarContainer>
  );
}

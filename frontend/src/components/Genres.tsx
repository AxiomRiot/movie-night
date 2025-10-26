import styled from 'styled-components';
import { GENRES } from '../config/config';

const GenreDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
  align-items: start;
  padding: 1rem;
`;

const GenreButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: #eee;
  cursor: pointer;
`;

export default function Genres() {
  return (
    <GenreDiv>
      <h2>Genres</h2>
      {GENRES.map((item, index) => (
        <GenreButton key={index}>{item}</GenreButton>
      ))}
    </GenreDiv>
  );
}

import styled from 'styled-components';
import Genres from './Genres';
import Providers from './Providers';

const FilterWindowDiv = styled.div`
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 9;
  display: flex;
  align-items: center;
`;

export default function FilterWindow() {
  function handleProviderUpdate(provider: string) {
    console.warn(provider);
  }

  return (
    <FilterWindowDiv>
      <Genres />
      <Providers handleUpdateSelectedProviderList={handleProviderUpdate} />
    </FilterWindowDiv>
  );
}

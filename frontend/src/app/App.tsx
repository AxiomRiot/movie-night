import { useState } from 'react';

import FilterWindow from '../components/FilterWindow';
import { Theme } from '../components/Theme';
import TopBar from '../components/TopBar';

function App() {
  const [filterWindowOpen, setFilterWindowOpen] = useState(false);

  function handleFilterWindowOpen() {
    setFilterWindowOpen(!filterWindowOpen);
  }

  return (
    <Theme>
      <TopBar handleFilterWindowOpen={handleFilterWindowOpen} />
      {filterWindowOpen && <FilterWindow />}
    </Theme>
  );
}

export default App;

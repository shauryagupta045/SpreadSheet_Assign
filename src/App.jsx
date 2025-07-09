import Header from './components/Header';
import Toolbar from './components/Toolbar';
import ActionButtons from './components/ActionButtons';
import Spreadsheet from './components/Spreadsheet';
import BottomTabs from './components/BottomTabs';
import { useState } from 'react';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <Toolbar 
        onAddNew={() => setShowAddModal(true)}
        onFilter={() => setShowFilterModal(true)}
        onShare={() => setShowShareModal(true)}
        onExport={() => {}}
      />
      <ActionButtons />
      <div className="flex-1 overflow-hidden">
        <Spreadsheet 
          searchValue={searchValue}
          showAddModal={showAddModal}
          setShowAddModal={setShowAddModal}
          showFilterModal={showFilterModal}
          setShowFilterModal={setShowFilterModal}
          showShareModal={showShareModal}
          setShowShareModal={setShowShareModal}
        />
      </div>
      <BottomTabs />
    </div>
  );
}

export default App;
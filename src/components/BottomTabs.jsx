import { useState } from 'react';

const BottomTabs = () => {
  const [activeTab, setActiveTab] = useState('Arrived');

  const tabs = [
    { name: 'All Orders', count: null },
    { name: 'Pending', count: null },
    { name: 'Reviewed', count: null },
    { name: 'Arrived', count: null, active: true }
  ];

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    console.log(`Tab clicked: ${tabName}`);
  };

  return (
    <div className="bg-white border-t border-gray-200">
      <div className="flex items-center px-2 sm:px-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => handleTabClick(tab.name)}
            className={`px-2 sm:px-4 py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.name
                ? 'border-green-500 text-green-600 bg-green-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.name}
            {tab.count && (
              <span className="ml-1 sm:ml-2 px-1 sm:px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        ))}
        
        <button 
          onClick={() => console.log('Add tab clicked')}
          className="ml-1 sm:ml-2 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors flex-shrink-0"
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BottomTabs;
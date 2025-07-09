import { useState } from 'react';

const Header = ({ searchValue, setSearchValue }) => {

  return (
    <header className="bg-white border-b border-gray-200 px-2 sm:px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600 overflow-hidden">
        <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center mr-2">
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 3h18v18H3V3zm16 16V5H5v14h14z"/>
            <path d="M7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
          </svg>
        </div>
        <span className="hover:text-gray-800 cursor-pointer hidden sm:inline">WorkSpace</span>
        <span className="text-gray-400 hidden sm:inline">›</span>
        <span className="hover:text-gray-800 cursor-pointer hidden sm:inline">Folder 2</span>
        <span className="text-gray-400 hidden sm:inline">›</span>
        <span className="font-medium text-gray-800 truncate">Spreadsheet 3</span>
        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
      </div>
      
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search within sheet"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-32 md:w-48 lg:w-64 pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        {/* Mobile search button */}
        <button className="sm:hidden p-2 text-gray-400 hover:text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="relative">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-medium">
              2
            </div>
            <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-medium">
              JD
            </div>
            <div className="text-xs sm:text-sm hidden sm:block">
              <div className="font-medium text-gray-800 truncate">John Doe</div>
              <div className="text-gray-500 text-xs truncate">john.doe...</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
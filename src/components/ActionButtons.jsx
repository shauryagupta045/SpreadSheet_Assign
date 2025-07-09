const ActionButtons = () => {
  return (
    <div className="bg-white px-2 sm:px-4 py-2 border-b border-gray-200">
      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center">
        {/* Q3 Financial Overview - spans across Job Request column */}
        <div className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 transition-colors" style={{width: '280px'}}>
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Q3 Financial Overview</span>
          <svg className="w-3 h-3 text-red-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        
        {/* Spacer to align with columns */}
        <div style={{width: '200px'}}></div>
        
        {/* ABC - positioned over Assigned column */}
        <div className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-green-100 hover:bg-green-200 rounded border border-green-300 transition-colors" style={{width: '120px'}}>
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>ABC</span>
          <span className="text-xs text-gray-500 ml-auto">...</span>
        </div>
        
        {/* Spacer */}
        <div style={{width: '80px'}}></div>
        
        {/* Answer a question - positioned over Due Date column */}
        <div className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-purple-100 hover:bg-purple-200 rounded border border-purple-300 transition-colors" style={{width: '140px'}}>
          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Answer a question</span>
        </div>
        
        {/* Spacer */}
        <div style={{width: '40px'}}></div>
        
        {/* Extract - positioned over Est. Value column */}
        <div className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-orange-100 hover:bg-orange-200 rounded border border-orange-300 transition-colors" style={{width: '100px'}}>
          <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>Extract</span>
        </div>
        
        {/* Spacer to align with blank columns */}
        <div style={{width: '40px'}}></div>
        
        {/* Plus button positioned in the blank column area */}
        <button className="flex items-center justify-center w-5 h-5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        
        {/* Additional spacing to show more blank columns extending to the right */}
        <div style={{width: '200px'}}></div>
      </div>

      {/* Tablet Layout */}
      <div className="hidden md:flex lg:hidden items-center space-x-2 overflow-x-auto">
        <div className="flex items-center space-x-1 px-2 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 transition-colors whitespace-nowrap">
          <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Q3 Financial</span>
          <svg className="w-2 h-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        
        <div className="flex items-center space-x-1 px-2 py-1.5 text-xs font-medium text-gray-700 bg-green-100 hover:bg-green-200 rounded border border-green-300 transition-colors whitespace-nowrap">
          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>ABC</span>
          <span className="text-xs text-gray-500">...</span>
        </div>
        
        <div className="flex items-center space-x-1 px-2 py-1.5 text-xs font-medium text-gray-700 bg-purple-100 hover:bg-purple-200 rounded border border-purple-300 transition-colors whitespace-nowrap">
          <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Answer</span>
        </div>
        
        <div className="flex items-center space-x-1 px-2 py-1.5 text-xs font-medium text-gray-700 bg-orange-100 hover:bg-orange-200 rounded border border-orange-300 transition-colors whitespace-nowrap">
          <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>Extract</span>
        </div>
        
        <button className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors flex-shrink-0">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden items-center justify-between">
        <div className="flex items-center space-x-1 overflow-x-auto">
          <button className="flex items-center space-x-1 px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 transition-colors whitespace-nowrap">
            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Q3</span>
          </button>
          
          <button className="flex items-center space-x-1 px-2 py-1 text-xs font-medium text-gray-700 bg-green-100 hover:bg-green-200 rounded border border-green-300 transition-colors whitespace-nowrap">
            <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>ABC</span>
          </button>
          
          <button className="flex items-center space-x-1 px-2 py-1 text-xs font-medium text-gray-700 bg-purple-100 hover:bg-purple-200 rounded border border-purple-300 transition-colors whitespace-nowrap">
            <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Q</span>
          </button>
          
          <button className="flex items-center space-x-1 px-2 py-1 text-xs font-medium text-gray-700 bg-orange-100 hover:bg-orange-200 rounded border border-orange-300 transition-colors whitespace-nowrap">
            <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>Ext</span>
          </button>
        </div>
        
        <button className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors flex-shrink-0 ml-2">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
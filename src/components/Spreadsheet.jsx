import { useState } from 'react';
import { useSpreadsheetData } from '../hooks/useSpreadsheetData';
import AddJobModal from './AddJobModal';
import FilterModal from './FilterModal';
import ShareModal from './ShareModal';

const Spreadsheet = ({ searchValue, showAddModal, setShowAddModal, showFilterModal, setShowFilterModal, showShareModal, setShowShareModal }) => {
  const {
    getFilteredData,
    addJobRequest,
    deleteJobRequest,
    updateJobRequest,
    filters,
    setFilters,
    sortConfig,
    setSortConfig
  } = useSpreadsheetData();

  const [selectedCell, setSelectedCell] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [editingCell, setEditingCell] = useState(null);
  const [cellValues, setCellValues] = useState({});
  const [showDeleteOption, setShowDeleteOption] = useState(null);

  // Get filtered data based on search
  const data = getFilteredData(searchValue);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      'In-process': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Need to start': 'bg-blue-100 text-blue-800 border-blue-200',
      'Complete': 'bg-green-100 text-green-800 border-green-200',
      'Blocked': 'bg-red-100 text-red-800 border-red-200'
    };
    
    return statusStyles[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPriorityColor = (priority) => {
    const priorityColors = {
      'High': 'text-red-600',
      'Medium': 'text-yellow-600',
      'Low': 'text-blue-600'
    };
    
    return priorityColors[priority] || 'text-gray-600';
  };

  const handleCellClick = (rowId, columnId) => {
    setSelectedCell(`${rowId}-${columnId}`);
    if (columnId === 'jobRequest' && rowId <= data.length) {
      setShowDeleteOption(rowId);
    } else {
      setShowDeleteOption(null);
    }
  };

  const handleCellDoubleClick = (rowId, columnId, currentValue) => {
    if (rowId <= data.length) {
      setEditingCell(`${rowId}-${columnId}`);
      setCellValues(prev => ({
        ...prev,
        [`${rowId}-${columnId}`]: currentValue
      }));
    }
  };

  const handleCellChange = (cellId, value) => {
    setCellValues(prev => ({
      ...prev,
      [cellId]: value
    }));
  };

  const handleCellBlur = (rowId, field) => {
    const cellId = `${rowId}-${field}`;
    const newValue = cellValues[cellId];
    if (newValue !== undefined && rowId <= data.length) {
      updateJobRequest(rowId, field, newValue);
    }
    setEditingCell(null);
  };

  const getCellValue = (rowId, columnId, originalValue) => {
    const cellId = `${rowId}-${columnId}`;
    return cellValues[cellId] !== undefined ? cellValues[cellId] : originalValue;
  };

  const handleDelete = (rowId) => {
    if (confirm('Delete this job request?')) {
      deleteJobRequest(rowId);
      setShowDeleteOption(null);
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['Job Request', 'Submitted', 'Status', 'Submitter', 'URL', 'Assigned', 'Priority', 'Due Date', 'Est. Value'],
      ...data.map(row => [
        row.jobRequest,
        row.submitted,
        row.status,
        row.submitter,
        row.url,
        row.assigned,
        row.priority,
        row.dueDate,
        row.estValue
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spreadsheet-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const columns = [
    { key: 'jobRequest', label: 'Job Request', icon: '📄', sortable: true },
    { key: 'submitted', label: 'Submitted', icon: '📅', sortable: true },
    { key: 'status', label: 'Status', icon: '✅', sortable: true },
    { key: 'submitter', label: 'Submitter', icon: '👤', sortable: true },
    { key: 'url', label: 'URL', icon: '🔗', sortable: true },
    { key: 'assigned', label: 'Assigned', icon: '👥', sortable: true },
    { key: 'priority', label: 'Priority', icon: null, sortable: true },
    { key: 'dueDate', label: 'Due Date', icon: null, sortable: true },
    { key: 'estValue', label: 'Est. Value', icon: null, sortable: true },
    { key: 'blank1', label: '', icon: null, sortable: false }
  ];

  return (
    <div className="bg-white flex-1 overflow-auto">
      <div className="min-w-full">
        <table className="w-full border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="w-8 sm:w-12 px-1 sm:px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
              </th>
              {columns.map((column) => (
                <th 
                  key={column.key}
                  className={`px-1 sm:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 ${
                    column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                  } ${column.key === 'blank1' ? 'w-32 sm:w-40' : ''}`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  {column.label && (
                    <div className="flex items-center space-x-1">
                      {column.icon && <span className="text-xs sm:text-sm hidden sm:inline">{column.icon}</span>}
                      <span className="truncate">{column.label}</span>
                      {column.sortable && (
                        <svg className="w-2 h-2 sm:w-3 sm:h-3 hidden sm:inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                      {sortConfig.key === column.key && (
                        <span className="text-blue-600 text-xs">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((row, index) => (
              <tr 
                key={row.id} 
                className={`border-b border-gray-200 hover:bg-gray-50 transition-colors h-12 ${
                  hoveredRow === row.id ? 'bg-gray-50' : ''
                }`}
                onMouseEnter={() => setHoveredRow(row.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-1 sm:px-2 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500 border-r border-gray-200 text-center h-12">
                  {index + 1}
                </td>
                
                <td 
                  className={`px-1 sm:px-3 py-3 text-xs sm:text-sm text-gray-900 border-r border-gray-200 cursor-pointer max-w-[120px] sm:max-w-[280px] truncate h-12 relative ${
                    selectedCell === `${row.id}-jobRequest` ? 'bg-blue-50 ring-1 ring-blue-500' : ''
                  }`}
                  onClick={() => handleCellClick(row.id, 'jobRequest')}
                  onDoubleClick={() => handleCellDoubleClick(row.id, 'jobRequest', row.jobRequest)}
                >
                  {editingCell === `${row.id}-jobRequest` ? (
                    <input
                      type="text"
                      value={getCellValue(row.id, 'jobRequest', row.jobRequest)}
                      onChange={(e) => handleCellChange(`${row.id}-jobRequest`, e.target.value)}
                      onBlur={() => handleCellBlur(row.id, 'jobRequest')}
                      onKeyDown={(e) => e.key === 'Enter' && handleCellBlur(row.id, 'jobRequest')}
                      className="w-full bg-transparent border-none outline-none"
                      autoFocus
                    />
                  ) : (
                    getCellValue(row.id, 'jobRequest', row.jobRequest)
                  )}
                  
                  {showDeleteOption === row.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(row.id);
                      }}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </td>
                
                <td 
                  className={`px-1 sm:px-3 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900 border-r border-gray-200 cursor-pointer h-12 ${
                    selectedCell === `${row.id}-submitted` ? 'bg-blue-50 ring-1 ring-blue-500' : ''
                  }`}
                  onClick={() => handleCellClick(row.id, 'submitted')}
                  onDoubleClick={() => handleCellDoubleClick(row.id, 'submitted', row.submitted)}
                >
                  {editingCell === `${row.id}-submitted` ? (
                    <input
                      type="text"
                      value={getCellValue(row.id, 'submitted', row.submitted)}
                      onChange={(e) => handleCellChange(`${row.id}-submitted`, e.target.value)}
                      onBlur={() => handleCellBlur(row.id, 'submitted')}
                      onKeyDown={(e) => e.key === 'Enter' && handleCellBlur(row.id, 'submitted')}
                      className="w-full bg-transparent border-none outline-none"
                      autoFocus
                    />
                  ) : (
                    row.submitted
                  )}
                </td>
                
                <td 
                  className={`px-1 sm:px-3 py-3 whitespace-nowrap border-r border-gray-200 cursor-pointer h-12 ${
                    selectedCell === `${row.id}-status` ? 'bg-blue-50 ring-1 ring-blue-500' : ''
                  }`}
                  onClick={() => handleCellClick(row.id, 'status')}
                >
                  <span className={`inline-flex px-1 sm:px-2 py-1 text-xs font-medium rounded border ${getStatusBadge(row.status)}`}>
                    {row.status}
                  </span>
                </td>
                
                <td 
                  className={`px-1 sm:px-3 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900 border-r border-gray-200 cursor-pointer max-w-[80px] sm:max-w-none truncate h-12 ${
                    selectedCell === `${row.id}-submitter` ? 'bg-blue-50 ring-1 ring-blue-500' : ''
                  }`}
                  onClick={() => handleCellClick(row.id, 'submitter')}
                  onDoubleClick={() => handleCellDoubleClick(row.id, 'submitter', row.submitter)}
                >
                  {editingCell === `${row.id}-submitter` ? (
                    <input
                      type="text"
                      value={getCellValue(row.id, 'submitter', row.submitter)}
                      onChange={(e) => handleCellChange(`${row.id}-submitter`, e.target.value)}
                      onBlur={() => handleCellBlur(row.id, 'submitter')}
                      onKeyDown={(e) => e.key === 'Enter' && handleCellBlur(row.id, 'submitter')}
                      className="w-full bg-transparent border-none outline-none"
                      autoFocus
                    />
                  ) : (
                    row.submitter
                  )}
                </td>
                
                <td 
                  className={`px-1 sm:px-3 py-3 whitespace-nowrap text-xs sm:text-sm text-blue-600 hover:text-blue-800 border-r border-gray-200 cursor-pointer max-w-[80px] sm:max-w-none truncate h-12 ${
                    selectedCell === `${row.id}-url` ? 'bg-blue-50 ring-1 ring-blue-500' : ''
                  }`}
                  onClick={() => handleCellClick(row.id, 'url')}
                  onDoubleClick={() => handleCellDoubleClick(row.id, 'url', row.url)}
                >
                  {editingCell === `${row.id}-url` ? (
                    <input
                      type="text"
                      value={getCellValue(row.id, 'url', row.url)}
                      onChange={(e) => handleCellChange(`${row.id}-url`, e.target.value)}
                      onBlur={() => handleCellBlur(row.id, 'url')}
                      onKeyDown={(e) => e.key === 'Enter' && handleCellBlur(row.id, 'url')}
                      className="w-full bg-transparent border-none outline-none"
                      autoFocus
                    />
                  ) : (
                    row.url
                  )}
                </td>
                
                <td 
                  className={`px-1 sm:px-3 py-3 whitespace-nowrap text-xs sm:text-sm border-r border-gray-200 cursor-pointer max-w-[80px] sm:max-w-none truncate h-12 ${
                    selectedCell === `${row.id}-assigned` ? 'bg-blue-50 ring-1 ring-blue-500' : ''
                  }`}
                  onClick={() => handleCellClick(row.id, 'assigned')}
                  onDoubleClick={() => handleCellDoubleClick(row.id, 'assigned', row.assigned)}
                >
                  {editingCell === `${row.id}-assigned` ? (
                    <input
                      type="text"
                      value={getCellValue(row.id, 'assigned', row.assigned)}
                      onChange={(e) => handleCellChange(`${row.id}-assigned`, e.target.value)}
                      onBlur={() => handleCellBlur(row.id, 'assigned')}
                      onKeyDown={(e) => e.key === 'Enter' && handleCellBlur(row.id, 'assigned')}
                      className="w-full bg-transparent border-none outline-none"
                      autoFocus
                    />
                  ) : (
                    <span className={`${
                      row.assigned === 'Sophie Choudhury' 
                        ? 'inline-flex px-1 sm:px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800 border border-green-200' 
                        : 'text-gray-700'
                    }`}>
                      {row.assigned}
                    </span>
                  )}
                </td>
                
                <td 
                  className={`px-1 sm:px-3 py-3 whitespace-nowrap text-xs sm:text-sm border-r border-gray-200 cursor-pointer h-12 ${
                    selectedCell === `${row.id}-priority` ? 'bg-blue-50 ring-1 ring-blue-500' : ''
                  }`}
                  onClick={() => handleCellClick(row.id, 'priority')}
                >
                  <span className={`font-medium ${getPriorityColor(row.priority)}`}>
                    {row.priority}
                  </span>
                </td>
                
                <td 
                  className={`px-1 sm:px-3 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900 border-r border-gray-200 cursor-pointer h-12 ${
                    selectedCell === `${row.id}-dueDate` ? 'bg-blue-50 ring-1 ring-blue-500' : ''
                  }`}
                  onClick={() => handleCellClick(row.id, 'dueDate')}
                  onDoubleClick={() => handleCellDoubleClick(row.id, 'dueDate', row.dueDate)}
                >
                  {editingCell === `${row.id}-dueDate` ? (
                    <input
                      type="date"
                      value={getCellValue(row.id, 'dueDate', row.dueDate)}
                      onChange={(e) => handleCellChange(`${row.id}-dueDate`, e.target.value)}
                      onBlur={() => handleCellBlur(row.id, 'dueDate')}
                      onKeyDown={(e) => e.key === 'Enter' && handleCellBlur(row.id, 'dueDate')}
                      className="w-full bg-transparent border-none outline-none"
                      autoFocus
                    />
                  ) : (
                    row.dueDate
                  )}
                </td>
                
                <td 
                  className={`px-1 sm:px-3 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900 border-r border-gray-200 cursor-pointer h-12 ${
                    selectedCell === `${row.id}-estValue` ? 'bg-blue-50 ring-1 ring-blue-500' : ''
                  }`}
                  onClick={() => handleCellClick(row.id, 'estValue')}
                  onDoubleClick={() => handleCellDoubleClick(row.id, 'estValue', row.estValue)}
                >
                  {editingCell === `${row.id}-estValue` ? (
                    <input
                      type="text"
                      value={getCellValue(row.id, 'estValue', row.estValue)}
                      onChange={(e) => handleCellChange(`${row.id}-estValue`, e.target.value)}
                      onBlur={() => handleCellBlur(row.id, 'estValue')}
                      onKeyDown={(e) => e.key === 'Enter' && handleCellBlur(row.id, 'estValue')}
                      className="w-full bg-transparent border-none outline-none"
                      autoFocus
                    />
                  ) : (
                    <>
                      {row.estValue}
                      <span className="text-gray-500 ml-1">$</span>
                    </>
                  )}
                </td>
                
                <td 
                  className={`px-3 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900 border-r border-gray-200 cursor-pointer w-32 sm:w-40 h-12 ${
                    selectedCell === `${row.id}-blank1` ? 'bg-blue-50 ring-1 ring-blue-500' : ''
                  }`}
                  onClick={() => handleCellClick(row.id, 'blank1')}
                >
                </td>
              </tr>
            ))}
            
            {/* Empty rows with consistent height */}
            {Array.from({ length: 15 }, (_, i) => (
              <tr key={`empty-${i}`} className="border-b border-gray-200 hover:bg-gray-50 transition-colors h-12">
                <td className="px-1 sm:px-2 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500 border-r border-gray-200 text-center h-12">
                  {data.length + i + 1}
                </td>
                {columns.map((column, j) => (
                  <td 
                    key={j}
                    className={`px-3 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900 border-r border-gray-200 cursor-pointer hover:bg-gray-50 h-12 ${
                      column.key === 'blank1' ? 'w-32 sm:w-40' : ''
                    } ${
                      selectedCell === `${data.length + 1 + i}-${column.key}` ? 'bg-blue-50 ring-1 ring-blue-500' : ''
                    }`}
                    onClick={() => handleCellClick(data.length + 1 + i, column.key)}
                  >
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <AddJobModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
        onAdd={addJobRequest} 
      />
      
      <FilterModal 
        isOpen={showFilterModal} 
        onClose={() => setShowFilterModal(false)} 
        filters={filters}
        onApplyFilters={setFilters}
      />
      
      <ShareModal 
        isOpen={showShareModal} 
        onClose={() => setShowShareModal(false)} 
      />
    </div>
  );
};

export default Spreadsheet;
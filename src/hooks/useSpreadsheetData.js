import { useState, useMemo } from 'react';

export const useSpreadsheetData = () => {
  const [data, setData] = useState([
    {
      id: 1,
      jobRequest: 'Launch social media campaign for pro...',
      submitted: '15-11-2024',
      status: 'In-process',
      submitter: 'Aisha Patel',
      url: 'www.aishapatel.c...',
      assigned: 'Sophie Choudhury',
      priority: 'Medium',
      dueDate: '20-11-2024',
      estValue: '6,200,000'
    },
    {
      id: 2,
      jobRequest: 'Update press kit for company redesign',
      submitted: '28-10-2024',
      status: 'Need to start',
      submitter: 'Irfan Khan',
      url: 'www.irfankhan.c...',
      assigned: 'Tejas Pandey',
      priority: 'High',
      dueDate: '30-10-2024',
      estValue: '3,500,000'
    },
    {
      id: 3,
      jobRequest: 'Finalize user testing feedback for appli...',
      submitted: '05-12-2024',
      status: 'In-process',
      submitter: 'Mark Johnson',
      url: 'www.markjohnso...',
      assigned: 'Rachel Lee',
      priority: 'Medium',
      dueDate: '10-12-2024',
      estValue: '4,750,000'
    },
    {
      id: 4,
      jobRequest: 'Design financial report for Q4',
      submitted: '10-01-2025',
      status: 'Complete',
      submitter: 'Emily Green',
      url: 'www.emilygreen...',
      assigned: 'Tom Wright',
      priority: 'Low',
      dueDate: '15-01-2025',
      estValue: '5,900,000'
    },
    {
      id: 5,
      jobRequest: 'Prepare financial report for Q4',
      submitted: '25-01-2025',
      status: 'Blocked',
      submitter: 'Jessica Brown',
      url: 'www.jessicabrow...',
      assigned: 'Kevin Smith',
      priority: 'Low',
      dueDate: '30-01-2025',
      estValue: '2,800,000'
    }
  ]);

  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    assigned: ''
  });

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const addJobRequest = (newJob) => {
    const newId = Math.max(...data.map(item => item.id)) + 1;
    setData([...data, { ...newJob, id: newId }]);
  };

  const deleteJobRequest = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  const updateJobRequest = (id, field, value) => {
    setData(data.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const filteredAndSortedData = useMemo((searchValue = '') => {
    let filtered = data;

    // Apply search filter
    if (searchValue && searchValue.trim()) {
      const searchTerm = searchValue.toLowerCase().trim();
      filtered = filtered.filter(item => 
        Object.values(item).some(value => 
          value && value.toString().toLowerCase().includes(searchTerm)
        )
      );
    }

    // Apply filters
    if (filters.status) {
      filtered = filtered.filter(item => item.status === filters.status);
    }
    if (filters.priority) {
      filtered = filtered.filter(item => item.priority === filters.priority);
    }
    if (filters.assigned) {
      filtered = filtered.filter(item => item.assigned === filters.assigned);
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered = [...filtered].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [data, filters, sortConfig]);

  const getFilteredData = (searchValue = '') => {
    let filtered = data;

    // Apply search filter
    if (searchValue && searchValue.trim()) {
      const searchTerm = searchValue.toLowerCase().trim();
      filtered = filtered.filter(item => 
        Object.values(item).some(value => 
          value && value.toString().toLowerCase().includes(searchTerm)
        )
      );
    }

    // Apply filters
    if (filters.status) {
      filtered = filtered.filter(item => item.status === filters.status);
    }
    if (filters.priority) {
      filtered = filtered.filter(item => item.priority === filters.priority);
    }
    if (filters.assigned) {
      filtered = filtered.filter(item => item.assigned === filters.assigned);
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered = [...filtered].sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        
        // Handle different data types
        if (sortConfig.key === 'submitted' || sortConfig.key === 'dueDate') {
          // Date sorting - convert DD-MM-YYYY to comparable format
          const parseDate = (dateStr) => {
            if (!dateStr) return new Date(0);
            const [day, month, year] = dateStr.split('-');
            return new Date(year, month - 1, day);
          };
          aVal = parseDate(aVal);
          bVal = parseDate(bVal);
        } else if (sortConfig.key === 'estValue') {
          // Numeric sorting for estimated value
          aVal = parseInt(aVal?.replace(/,/g, '') || '0');
          bVal = parseInt(bVal?.replace(/,/g, '') || '0');
        } else if (sortConfig.key === 'priority') {
          // Priority sorting - High > Medium > Low
          const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
          aVal = priorityOrder[aVal] || 0;
          bVal = priorityOrder[bVal] || 0;
        } else if (sortConfig.key === 'submitter' || sortConfig.key === 'assigned') {
          // Name sorting (case insensitive)
          aVal = (aVal || '').toString().toLowerCase();
          bVal = (bVal || '').toString().toLowerCase();
        } else {
          // String sorting (case insensitive)
          aVal = (aVal || '').toString().toLowerCase();
          bVal = (bVal || '').toString().toLowerCase();
        }
        
        if (aVal < bVal) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aVal > bVal) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filtered;
  };

  return {
    data: filteredAndSortedData,
    getFilteredData,
    addJobRequest,
    deleteJobRequest,
    updateJobRequest,
    filters,
    setFilters,
    sortConfig,
    setSortConfig
  };
};
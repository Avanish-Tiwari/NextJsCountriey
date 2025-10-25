import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../Search.jsx'

// Mock FontAwesomeIcon
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <div data-testid="search-icon">🔍</div>
}));

describe('Search Component (Real Timers)', () => {
  const mockHandleSearch = jest.fn();
  const defaultProps = {
    handleSearch: mockHandleSearch,
    searchTerm: ''
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls handleSearch after debounce delay', async () => {
    const user = userEvent.setup();
    render(<Search {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    await user.type(searchInput, 'Japan');
    
    // Wait for the debounce timeout
    await waitFor(() => {
      expect(mockHandleSearch).toHaveBeenCalledWith('Japan');
    }, { timeout: 400 });
    
    expect(mockHandleSearch).toHaveBeenCalledTimes(1);
  });

  test('handles rapid typing with single call', async () => {
    const user = userEvent.setup();
    render(<Search {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    await user.type(searchInput, 'Mexico');
    
    await waitFor(() => {
      expect(mockHandleSearch).toHaveBeenCalledWith('Mexico');
    }, { timeout: 400 });
    
    // Should only be called once despite multiple keystrokes
    expect(mockHandleSearch).toHaveBeenCalledTimes(1);
  });
});
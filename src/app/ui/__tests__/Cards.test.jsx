import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import Cards from '../Cards';

// Mock the next/navigation router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

// Mock the Card component
jest.mock('../Card', () => {
  return function MockCard({ country }) {
    return (
      <div 
        id={country.alpha3Code} 
        className="card-mock" 
        data-testid={`card-${country.alpha3Code}`}
      >
        {country.name}
      </div>
    );
  };
});

describe('Cards Component', () => {
  const mockPush = jest.fn();
  const mockRouter = {
    push: mockPush
  };

  const mockCountries = [
    {
      alpha3Code: 'USA',
      name: 'United States',
      population: 331000000,
      region: 'Americas',
      capital: 'Washington D.C.',
      flags: { png: 'us-flag.png' }
    },
    {
      alpha3Code: 'GBR',
      name: 'United Kingdom',
      population: 67000000,
      region: 'Europe',
      capital: 'London',
      flags: { png: 'uk-flag.png' }
    }
  ];

  const defaultProps = {
    countries: mockCountries,
    isDark: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue(mockRouter);
  });

  test('renders correct number of Card components', () => {
    render(<Cards {...defaultProps} />);
    
    const cards = screen.getAllByTestId(/card-/);
    expect(cards).toHaveLength(mockCountries.length);
    
    // Alternative to toBeInTheDocument
    mockCountries.forEach(country => {
      const card = screen.getByTestId(`card-${country.alpha3Code}`);
      expect(card).toBeTruthy(); // Checks if element exists
      expect(document.body.contains(card)).toBe(true); // Checks if element is in DOM
    });
  });

  test('applies correct grid layout classes', () => {
    const { container } = render(<Cards {...defaultProps} />);
    
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toBeTruthy();
    expect(gridContainer.className).toContain('grid-cols-3');
    expect(gridContainer.className).toContain('sm:grid-cols-4');
    expect(gridContainer.className).toContain('gap-2.5');
  });

  test('navigates to correct route when card is clicked', async () => {
    const user = userEvent.setup();
    render(<Cards {...defaultProps} />);
    
    const ukCard = screen.getByTestId('card-GBR');
    await user.click(ukCard);
    
    expect(mockPush).toHaveBeenCalledWith('/pages/GBR');
    expect(mockPush).toHaveBeenCalledTimes(1);
  });

  test('handles click event with event.stopPropagation', async () => {
    const user = userEvent.setup();
    const mockStopPropagation = jest.fn();
    
    render(<Cards {...defaultProps} />);
    
    const card = screen.getByTestId('card-USA');
    
    // Simulate click with stopPropagation
    fireEvent.click(card, {
      stopPropagation: mockStopPropagation
    });
    
    expect(mockStopPropagation).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith('/pages/USA');
  });

  test('does not navigate when click event target has no ID', async () => {
    const user = userEvent.setup();
    const { container } = render(<Cards {...defaultProps} />);
    
    // Click on the grid container itself (not a card)
    const gridContainer = container.querySelector('.grid');
    await user.click(gridContainer);
    
    expect(mockPush).not.toHaveBeenCalled();
  });

  test('handles empty countries array', () => {
    const propsWithEmptyCountries = {
      ...defaultProps,
      countries: []
    };
    
    const { container } = render(<Cards {...propsWithEmptyCountries} />);
    
    const cards = screen.queryAllByTestId(/card-/);
    expect(cards).toHaveLength(0);
    
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toBeTruthy();
  });

  test('console.log is called with correct card ID on click', async () => {
    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    render(<Cards {...defaultProps} />);
    
    const usaCard = screen.getByTestId('card-USA');
    await user.click(usaCard);
    
    expect(consoleSpy).toHaveBeenCalledWith('Clicked card ID:', 'USA');
    
    consoleSpy.mockRestore();
  });
});
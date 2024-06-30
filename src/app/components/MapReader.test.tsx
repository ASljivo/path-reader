import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import MapReader from './MapReader';
import { MAP_ONE, MAPS } from 'src/constants/maps';
import { validateAndReadMap } from '../utils/utils';
import { MapResult } from '../models/maps';

// Mock the validateAndReadMap function
jest.mock('../utils/utils', () => ({
  validateAndReadMap: jest.fn(),
}));

describe('MapReader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the map selection options', () => {
    render(<MapReader />);
    MAPS.forEach((map, index) => {
      expect(screen.getByTestId(`map-${index}`)).toBeInTheDocument();
    });
  });

  test('displays result when a map is selected', () => {
    const mockResult: MapResult = {
      letters: 'ACB',
      path: '@---A---+|C|+--+|+-B-x',
    };

    (validateAndReadMap as jest.Mock).mockReturnValue(mockResult);

    render(<MapReader />);
    fireEvent.click(screen.getByTestId('map-0'));

    expect(screen.getByText(/Letters: ACB/)).toBeInTheDocument();
    expect(
      screen.getByText('Path: @---A---+|C|+--+|+-B-x')
    ).toBeInTheDocument();
  });

  test('displays error message if an error occurs', () => {
    const mockError = 'Invalid map format';

    (validateAndReadMap as jest.Mock).mockImplementation(() => {
      throw new Error(mockError);
    });

    render(<MapReader />);
    fireEvent.click(screen.getByTestId('map-0'));

    expect(screen.getByText(`Error: ${mockError}`)).toBeInTheDocument();
  });
});

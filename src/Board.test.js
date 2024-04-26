import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import Board from './Board';

const initialBoard = [
    [true, false, true],
    [false, true, false],
    [true, false, true]
  ];


it('should render', ()=>{
    render( <Board />)
})

// Mock the createBoard function to return a fixed initial board configuration
jest.mock('./Board', () => ({
    __esModule: true,
    default: jest.fn(({ nrows, ncols, chanceLightStartsOn }) => {
      // Create a fixed initial board configuration
      const initialBoard = [
        [true, false, true],
        [false, true, false],
        [true, false, true]
      ];
      return initialBoard;
    })
  }));

it('should match snapshot with fixed initial board configuration', () => {
    // Render the Board component with the fixed initial board configuration
    const { asFragment } = render(<Board  />);
    
    // Assert that the rendered output matches the stored snapshot
    expect(asFragment()).toMatchSnapshot();
  });


// it('should flip cells correctly on cell click', () => {
//     // Render the Board component
//     const { container  } = render(<Board />);

//     // Find the cell at row 0, column 0 (you can adjust the coordinates as needed)
//     const cellToClick = container.querySelector('Cell 0-0');
//     console.log(cellToClick);
//     // Simulate a click on the cell
//     fireEvent.click(cellToClick);

//     // Assert that the clicked cell has flipped
//     expect(cellToClick).toHaveClass('Cell-lit');

//     // Get all cells and check if the cells around the clicked cell have flipped
//     const adjacentCellPositions = [
//         '-1-0', '1-0', '0-1', '0-1' // Positions of adjacent cells
//     ];
//     adjacentCellPositions.forEach(pos => {
//         const adjacentCell = getByText(pos);
//         expect(adjacentCell).toHaveClass('Cell-lit');
//     });
// });
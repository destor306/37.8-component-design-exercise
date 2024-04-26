import React from 'react';
import { render} from '@testing-library/react';
import Cell from './Cell';


test('it render without crashing', ()=>{
    render(<Cell />);
})


// snapshot


test("it should matches snapshot", ()=>{
    const {asFragment} = render(<Cell />);
    expect(asFragment()).toMatchSnapshot();
})
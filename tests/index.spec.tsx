import { render } from '@testing-library/react';
import Homepage from '../src/app/page';

describe('example page', () => {
  it('renders without errors', async () => {
    expect.assertions(0);

    render(<Homepage />);
  });
});

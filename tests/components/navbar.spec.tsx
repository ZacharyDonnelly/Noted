import Navbar from '@/components/navbar/navbar';
import { render } from '@testing-library/react';

describe('example page', () => {
  it('renders without errors', async () => {
    expect.assertions(0);

    render(<Navbar />);
  });
});

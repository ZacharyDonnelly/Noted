import Hero from '@/components/hero/hero';
import { render } from '@testing-library/react';

describe('example page', () => {
  it('renders without errors', async () => {
    expect.assertions(0);

    render(<Hero />);
  });
});

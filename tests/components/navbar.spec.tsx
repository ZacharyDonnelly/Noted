import Navbar from '@/components/navbar/navbar';
import { render } from '@testing-library/react';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('next-auth/react', () => ({
  useSession: jest.fn()
}));

describe('navbar', () => {
  it('renders without errors', async () => {
    expect.assertions(0);
    const mockSession: Session = {
      expires: '1',
      accessToken: 'c342342423424234',
      user: { name: 'a', email: 'test@test.com', accessToken: 'c342342423424234' }
    };

    (useSession as jest.Mock).mockReturnValue([mockSession, false]);

    render(<Navbar />);
  });
});

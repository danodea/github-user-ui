import { vi, describe, it, expect } from "vitest";
import UserDetails from "./UserDetails";
import { createMemoryRouter, RouterProvider, useLocation } from "react-router-dom";
import { render, screen, waitFor } from '@testing-library/react';

describe('UserDetails', () => {
  it('loads correctly when no data is passed', async () => {
    const routes = [{
      path: "users/:user",
      element: <UserDetails />,
      loader: () => {
        return {    
          followerData: {},
          orgData: {},
          repoData: {},
        }
      },
    }];

    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useLocation: () => {return {'state': {'user': 'danodea'}}},
      };
    });

    const router = createMemoryRouter(routes, { initialEntries: ["/users/danodea"] });

    render(<RouterProvider router={router} />);
    
    await waitFor(() => expect(screen.getByText('Repos')).toBeInTheDocument());
    expect(screen.getByText('This user has no public repos.')).toBeInTheDocument();
    expect(screen.getByText('This user has no public organizations.')).toBeInTheDocument();
    expect(screen.getByText('This user has no public followers.')).toBeInTheDocument();
  });
});
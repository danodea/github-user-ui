import { describe, it, expect } from "vitest";
import FrontPage from "./FrontPage";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render, screen, waitFor } from '@testing-library/react';
import MOCK_DATA from "../../data/MOCK_DATA.json";

describe('FrontPage', () => {
  it('loads correctly when no data is passed', async () => {
    const routes = [{
      path: "/index",
      element: <FrontPage />,
      loader: () => {return null},
    }];

    const router = createMemoryRouter(routes, { initialEntries: ["/index"] });

    render(<RouterProvider router={router} />);
    
    await waitFor(() => expect(screen.getByText('Real Front End Tech Screen')).toBeInTheDocument());
    expect(screen.getByText('User data not available. Please try again later')).toBeInTheDocument();
  });

  it('loads correctly when data is passed', async () => {
    const routes = [{
      path: "/index",
      element: <FrontPage />,
      loader: () => {return MOCK_DATA},
    }];

    const router = createMemoryRouter(routes, { initialEntries: ["/index"] });

    render(<RouterProvider router={router} />);
    
    await waitFor(() => expect(screen.getByText('Real Front End Tech Screen')).toBeInTheDocument());
    expect((screen.getAllByRole('img').length)).toEqual(30);
  });
});
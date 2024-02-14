import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../../src/auth";
import { AppRouter } from "../../../../src/router/AppRouter";

describe('Test <App-Router/>', () => {
    test('should show login it is not autenticate', () => {
        const contextValue = {
            logged: false
        };

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter></AppRouter>
                </AuthContext.Provider>
            </MemoryRouter>
        );
        expect(screen.getAllByText('Login').length).toBe(2);
    });
    
    test('should show /marvel login it is autenticate', () => {
        const contextValue = {
            logged: true,
            user: {
                name: "Prueba"
            }
        };

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter></AppRouter>
                </AuthContext.Provider>
            </MemoryRouter>
        );
        expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);
    });
    
});
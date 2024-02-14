import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../../../src/auth";
import { PrivateRoute } from "../../../../src/router/PrivateRoute";
import { MemoryRouter } from "react-router-dom";

describe('Test <PrivateRoute/>', () => {
    test('should show the children when its authenticated', () => {
        Storage.prototype.setItem = jest.fn();
        const contextValue = {
            logged: true,
            user: {
                name: 'SSS',
                id: '110'
            }
        };

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/dc']}>
                    <PrivateRoute>
                        <h1>Route Private</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByText('Route Private')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/dc');
        
    });
});
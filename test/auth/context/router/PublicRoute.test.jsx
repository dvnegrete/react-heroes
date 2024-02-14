import { render, screen } from "@testing-library/react";
import { PublicRoute } from "../../../../src/router/PublicRoute";
import { AuthContext } from "../../../../src/auth";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe('Test in <PublicRoute/>', () => {
    test('should show the children when its not authenticated', () => {
        const contextValue = {
            logged: false
        };

        render(
            <AuthContext.Provider value={ contextValue }>
                <PublicRoute>
                    <h1>Route Public</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );
        expect(screen.getByText('Route Public')).toBeTruthy();
        
    });
    
    test('should navigate if you are authenticated', () => {
        const contextValue = {
            logged: true,
            user: {
                name: 'SSS',
                id: '110'
            }
        };
        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="login" element={
                            <PublicRoute>
                                <h1>Route Public</h1>
                            </PublicRoute>
                        }/>
                        <Route path='marvel' element={<h1>Site Marvel</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getAllByText('Site Marvel')).toBeTruthy();        
    });
});
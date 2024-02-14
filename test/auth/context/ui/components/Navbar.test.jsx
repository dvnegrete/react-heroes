import { fireEvent, render, screen } from "@testing-library/react";
import { AuthContext } from "../../../../../src/auth";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "../../../../../src/ui/components/Navbar";

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', ()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate: ()=> mockUseNavigate(),
    //useNavigate: jest.fn(),
}));

describe('test <NavBar></NavBar>', () => {

    const contextValue = {
        logged: true,
        user: {
            name: "Damian"
        },
        logout: jest.fn()
    }

    beforeEach( ()=> jest.clearAllMocks() );

    test('should show name of user logged', () => {
        render(
            <AuthContext.Provider  value={ contextValue }>
                <MemoryRouter>
                    <Navbar></Navbar>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Damian')).toBeTruthy();
    });

    test('should to call loggout and navigate when make to click in the button', () => {
        render(
            <AuthContext.Provider  value={ contextValue }>
                <MemoryRouter>
                    <Navbar></Navbar>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const logButton = screen.getByRole('button');
        fireEvent.click(logButton);

        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockUseNavigate).toHaveBeenCalledWith();
        //expect(useNavigate).toHaveBeenCalledWith();

    });
    
});
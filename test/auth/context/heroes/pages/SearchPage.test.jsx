import { fireEvent, render, screen } from "@testing-library/react";
import { SearchPage } from "../../../../../src/heroes";
import { MemoryRouter } from "react-router-dom";

describe('Test <SearchPage/>', () => {
    beforeEach( ()=> jest.clearAllMocks() );

    test('should show correctly default values', () => {
        const { container }= render(
            <MemoryRouter>
                <SearchPage/>
            </MemoryRouter>
        )

        //screen.debug();

        expect(container).toMatchSnapshot();
    });
 
    test('should show Batman and input with value query String', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage/>
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');
        //screen.debug();

        const img = screen.getByRole('img');
        expect(img.src).toContain("/assets/heroes/dc-batman.jpg");

        const messageSearch = screen.getByLabelText('message-search');
        expect(messageSearch.style.display).toBe('none');
        
        const messageEmpty = screen.getByLabelText('message-empty');
        expect(messageEmpty.style.display).toBe('none');
        
    });

    test('should show error if  not hero (batman123)', () => {
        render( 
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage/>
            </MemoryRouter>
        )
        
        const messageEmpty = screen.getByLabelText('message-empty');
        expect(messageEmpty.style.display).toBe('');
        
    });
    
 
    
});
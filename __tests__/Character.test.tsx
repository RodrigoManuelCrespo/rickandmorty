import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import Home from '@/app/page';
import '@testing-library/jest-dom'


describe('CharacterComponent', () => {
    it('renders title correctly when Rick Sanchez is selected', async () => {
        render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        await waitFor(() => {
            const selectButton = screen.getByTestId('firstCharacter-1');
            fireEvent.click(selectButton);
        });

        const characterText1 = screen.getByTestId(/title-Rick Sanchez/i);
        expect(characterText1).toBeInTheDocument();

        await waitFor(() => {
            const selectButton = screen.getByTestId('secondCharacter-2');
            fireEvent.click(selectButton);
        });

        const characterText2 = screen.getByTestId(/title-Morty Smith/i);
        expect(characterText2).toBeInTheDocument();
    });
});

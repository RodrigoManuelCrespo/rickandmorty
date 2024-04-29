import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import Home from '@/app/page';
import '@testing-library/jest-dom'

describe('Home component', () => {
    it('renders without crashing and contains welcome text', () => {
        render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        const welcomeText = screen.getByText(/Welcome to the ultimate Rick and Morty app!/i);
        const characterText1 = screen.getByText(/Character #1/i);
        const characterText2 = screen.getByText(/Character #2/i);
        const episodesText = screen.getByText(/Episodes/i);

        expect(welcomeText).toBeInTheDocument();
        expect(characterText1).toBeInTheDocument();
        expect(characterText2).toBeInTheDocument();
        expect(episodesText).toBeInTheDocument();
    });
});

import React from 'react';
import {render, screen} from '@testing-library/react';
import Singleplayer from '../mainPages/Singleplayer'; 
import Dropdown from '../gameComponents/Dropdown';
import Addsong, { TEXT_Submit_button_singleplayer } from '../gameComponents/addGuess';
import { Singlemodal } from '../overlays/About';
import userEvent from '@testing-library/user-event';
import App from '../App';

beforeEach(() => {
    render(<App />);
})

// Tests whether the dropdown bar renders
test('renders dropdown', () => {
    const {container} = render(<Singleplayer />);
    const drop = container.getElementsByClassName("dropdown_bar")

    expect(drop.length).toBe(1);
});

// Tests that the about modal shows up when we expect
test('about modal shows up', () => {
    render(<Singleplayer />);
    const aboutButton = screen.getByRole("button", {name: "information about vocle"});
    expect(aboutButton).toBeInTheDocument();

    userEvent.click(aboutButton);
    const info = screen.getByRole(/.*/, {name: "information pop-up"})
    expect(info).toBeInTheDocument();

    userEvent.click(info);
    const infoPopup = screen.queryByRole(/.*/, {name: "information pop-up"});
    expect(infoPopup).toBeNull();
});

// Tests that all buttons show up that we expect
test('all buttons show up', () => {
    render(<Singleplayer />);
    const aboutButton = screen.getByRole("button", {name: "information about vocle"});
    const spotifyButton = screen.getByRole("button", {name: "link to spotify.com"});
    const submitButton = screen.getByRole(/.*/, {name: "submit guess"});
    const skipButton = screen.getByRole(/.*/, {name: "skip guess"});
    const dropdown = screen.getByRole(/.*/, {name: "guess dropdown"});

    expect(aboutButton).toBeInTheDocument();
    expect(spotifyButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(skipButton).toBeInTheDocument();
    expect(dropdown).toBeInTheDocument();
});

// Tests that "Guess skipped" shows up when we click skip guess in singleplayer
test('skip guess', () => {
    render(<Singleplayer />);
    const skipButton = screen.getByRole(/.*/, {name: "skip guess"});
    userEvent.click(skipButton);

    const guessSkipped = screen.getByRole(/.*/, {name: 'Guess skipped'});
    expect(guessSkipped).toBeInTheDocument();
})

// Tests that the losing screen pops up when expected
test('losing game over screen executes', () => {
    render(<Singleplayer />);
    const skipButton = screen.getByRole(/.*/, {name: "skip guess"});
    for (let i = 0; i < 6; i++) {
        userEvent.click(skipButton);
    }

    const gameOverModal = screen.getByRole(/.*/, {name: "game over screen"});
    expect(gameOverModal).toBeInTheDocument();
    const playAgainButton = screen.getByRole(/.*/, {name: "play again button"});
    const homeButton = screen.getByRole(/.*/, {name: ""})
    expect(playAgainButton).toBeInTheDocument();
    expect(homeButton).toBeInTheDocument();
})

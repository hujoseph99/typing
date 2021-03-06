import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Ace, Range } from 'ace-builds';

import { Box } from '@material-ui/core';

import { BackgroundEditor } from './BackgroundEditor';
import { ForegroundEditor } from './ForegroundEditor';
import { language } from '../game/types';

interface RaceFieldProps {
	snippet?: string;
	language?: language;
	disabled?: boolean;
	reloaded: boolean;
	onChange: (text: string) => void;
}

export const RaceField = ({ 
	snippet = '', 
	language = 'plain_text' ,
	disabled = false,
	reloaded,
	onChange = (text: string) => {},
}: RaceFieldProps): JSX.Element => {
	const [focus, setFocus] = useState(false);
	const [foregroundText, setForegroundText] = useState("");
	const [backgroundText, setBackgroundText] = useState("");
	const [markers, setMarkers] = useState<Ace.Range[]>([]);
	const [snippetArray, setSnippetArray] = useState<string[]>([]);

	useEffect(() => {
		setSnippetArray(snippet.split('\n'));
		setBackgroundText(snippet);
		setForegroundText('');
	}, [snippet, reloaded])

	const onFocus = (e: SyntheticEvent) => {
		setFocus(true);
	}

	const onBlur = () => {
		setFocus(false);
	}

	const handleChange = (playerText: string) => {
		const playerTextArray = playerText.split("\n");

		const backgroundArray: string[] = [];
		const newMarkers: Ace.Range[] = [];

		let i = 0;
		// compare text
		for (; i < playerTextArray.length; i++) {
			let playerLine = playerTextArray[i];

			// if no line in snippet to compare with, the rest of text is wrong. mark wrong for each line
			if (i > snippetArray.length - 1) {
				for (let j = i; j < playerTextArray.length; j++) {
					newMarkers.push(new Range(j, 0, j, playerLine.length));
				}
				break
			}

			// compare with line in snippet
			let snippetLine = snippetArray[i];
			let differenceIndex = 0;
			while (playerLine[differenceIndex] === snippetLine[differenceIndex] && differenceIndex < playerLine.length) differenceIndex++;

			if (differenceIndex < playerLine.length) {
				newMarkers.push(new Range(i, differenceIndex, i, playerLine.length));
			}
			
			let newLine = "";
			for (let i = 0; i < playerLine.length; i++) {
				if (playerLine[i] === '\t') {
					newLine += '\t';
				} else {
					newLine += ' ';
				}
			}
			snippetLine = newLine + snippetLine.slice(differenceIndex)
			backgroundArray.push(snippetLine)
		}

		// if player_text was shorter than snippet, push rest of snippet into the background.
		for (; i < snippetArray.length; i++) {
			backgroundArray.push(snippetArray[i]);
		}

		setBackgroundText(backgroundArray.join("\n"));
		setMarkers(newMarkers);
		if (foregroundText !== playerText) setForegroundText(playerText);
		onChange(playerText);
	}

	return (
		<Box
			// onKeyDownCapture={filterKeyboardEvents}
			// onKeyPressCapture={filterKeyboardEvents}
			// onKeyUpCapture={filterKeyboardEvents}
			onClickCapture={onFocus}>
			{/* onMouseDownCapture={filterMouseEvents}
			onMouseMoveCapture={filterMouseEvents}
			onFocusCapture={filterMouseEvents}
			onChangeCapture={filterMouseEvents}
			onBlurCapture={filterMouseEvents}
			onMouseUpCapture={filterMouseEvents}> */}
			<BackgroundEditor text={backgroundText} />
			{/* elements that appear later are on top */}
			<ForegroundEditor 
				language={language} 
				text={foregroundText} 
				ranges={markers} 
				focus={focus} 
				onChange={handleChange} 
				onBlur={onBlur} 
				disabled={disabled}
			/>
		</Box>
	)
};

import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { Ace } from 'ace-builds';

import { AceEditor } from './AceEditor';
import { selectSnippet } from './raceFieldSlice';

import "./editor.css"
import { language } from './types';

interface ForegroundEditorProps {
	language?: language;
	focus?: boolean;
	onBlur?: () => void;
	ranges: Ace.Range[];
	text: string;
	onChange: (s: string) => void;
}

export const ForegroundEditor = ({
	language = 'plain_text',
	focus = false,
	onBlur,
	ranges,
	onChange,
	text
}: ForegroundEditorProps): JSX.Element => {
	const editor = useRef<Ace.Editor>();
	const markers = useRef<number[]>([]);
	
	useEffect(() => {
		if (editor.current !== undefined){
			for (let marker of markers.current){
				editor.current.session.removeMarker(marker);
			}

			let newMarkers: number[] = [];
			for (let marker of ranges){
				newMarkers.push(editor.current.session.addMarker(marker, "error-marker", "text"));
			}
			markers.current = newMarkers;
		}
	}, [ranges])

	useEffect(() => {
		if (editor && focus) {
			editor.current?.focus();
		}
	}, [editor, focus])

	const handleLoad = (editor_ref: Ace.Editor) => {
		editor.current = editor_ref;
	}

	return (
		<AceEditor  
			className="foregroundEditor"
			mode={language}
			onLoad={handleLoad}
			onBlur={onBlur}
			onChange={onChange}
			value={text}
		/>
	);
}

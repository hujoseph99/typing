import React from 'react';

import AceEditorComponent, { IAceEditorProps, IAceOptions } from "react-ace";

import "./editor.css"

// all currently supported languages
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-plain_text";

// currently supported themes
import "ace-builds/src-noconflict/theme-dracula";

// just a simple implementation for now
interface AceEditorProps extends IAceEditorProps {
	value?: string
	className? : string
	options?: IAceOptions;
}

export const AceEditor = ({ value = "", className = "", options = {}, ...props }: AceEditorProps): JSX.Element => {
	return (
		<AceEditorComponent 
			className={"aceEditor " + className}
			value={value}
			theme="dracula"
			showGutter={false}
			highlightActiveLine={false}
			fontSize={13}
			setOptions={{
				useSoftTabs: false,
				...options
			}}
			{...props}
		/>
	);
}

'use strict';
// Rich Text Editor
let optionsButtons = document.querySelectorAll('.option-button');
let advancedOptions = document.querySelectorAll('.adv-option-button');
let fontName = document.getElementById('fontName');
let fontSizeRef = document.getElementById('fontSize');
let writingArea = document.getElementById('text-input');
let linkButton = document.getElementById('createLink');
let alignButtons = document.querySelectorAll('.align');
let spacingButtons = document.querySelectorAll('.spacing');
let formatButtons = document.querySelectorAll('.format');
let scriptButtons = document.querySelectorAll('.script');


// List of fonts
let fontList = ["Arial", "Arial Black", "Comic Sans MS", "Courier New", "Georgia", "Impact", "Lucida Console", "Lucida Sans Unicode", "Palatino Linotype", "Tahoma", "Times New Roman", "Trebuchet MS", "Verdana"];

// Initial Settings
const initializer = () => {
	// function calls for highlighting buttons
	// No highlights for link, unlink, lists, undo, redo since they are not one time
	highlighter(alignButtons, true);
	highlighter(spacingButtons, true);
	highlighter(formatButtons, false);
	highlighter(scriptButtons, true);

	// create options for font name

	fontList.map((font) => {
		let option = document.createElement('option');
		option.value = font;
		option.innerHTML = font;
		fontName.appendChild(option);
	});

	// font size alows only till 7
	for (let i = 1; i <= 7; i++) {
		let option = document.createElement('option');
		option.value = i;
		option.innerHTML = i;
		fontSizeRef.appendChild(option);
	}

	// default font size
	// console.log(fontSizeRef);
	fontSizeRef.value = 3;

}



// Highlighter function
const highlighter = (className, needsRemoval) => {
	className.forEach((element) => {
		element.addEventListener('click', (e) => {
			e.preventDefault();
			if (needsRemoval) {
				let alreadyActive = false;
				if (element.classList.contains('rich-text-editor-options--active')) {
					alreadyActive = true;
				}
				highlighterRemover(className);
				if (!alreadyActive) {
					element.classList.add('rich-text-editor-options--active');
				}

			} else {
				element.classList.toggle('rich-text-editor-options--active');
			}
		});
	});
}
// remove highlighter function
const highlighterRemover = (className) => {
	className.forEach((element) => {
		element.classList.remove('rich-text-editor-options--active');
	});
}

// main logic

const modifyText = (command, defaultUi, value) => {
	// excCommand is a method of document object
	document.execCommand(command, defaultUi, value);
}


// for basic options which do not require value
optionsButtons.forEach((element) => {
	element.addEventListener('click', (e) => {
		e.preventDefault();
		// console.log(element.id);
		modifyText(element.id, false, null);
	});
});

// for advanced options which require value
advancedOptions.forEach((element) => {
	element.addEventListener('change', (e) => {
		e.preventDefault();
		console.log(element.id);
		let value = element.value;
		modifyText(element.id, false, value);
	});
});

// Link
linkButton.addEventListener('click', (e) => {
	e.preventDefault();
	let link = prompt('Enter a URL:', 'http://');
	// if link has http:// or https:// then it will be a valid link
	if (link.includes('http://') || link.includes('https://')) {
		modifyText('createLink', false, link);
	} else {
		link = 'http://' + link;
		modifyText(linkButton.id, false, link);
	}
});

// load event
window.addEventListener('load', initializer);







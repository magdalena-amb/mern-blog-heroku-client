const cutText = (text, maxLength = 100 ) => {
    
    if (text.length < 1) {
        return `Error.`;
    }

    if (text.length > maxLength) {
        let shortText = text.substr(0, maxLength);
        if (shortText.lastIndexOf !== ' ') {
            let textArr = shortText.split(' ');
            let finalText = textArr.slice(0, textArr.length -1 ).join(' ') + '...';
            return finalText;
        }  
    } else {
        return text;
    } 
}

export default cutText;
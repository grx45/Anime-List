export const shortenString = (inputString: string|undefined): string | null => {
    if (inputString){
        if (inputString.length <= 33) {
      
            return inputString;
          } else {
            
            const shortenedString = inputString.slice(0, 30) + "...";
            return shortenedString;
          }
    }
    return null
  };
  
export function parseLineToNumber(line: string): number {
    let digit = poorMansLeftToRight(line).match(/zero|one|two|three|four|five|six|seven|eight|nine|\d/g);
    
    if ( ! digit) {

        return -1;
    }

    if(digit.length == 1) {
        let onlyDigit = convertToDigitIfNeeded(digit[0]);
        return parseInt("" + onlyDigit + onlyDigit); 
    }

    let firstDigit = digit[0];
    let lastDigit = digit[digit.length - 1];

    return parseInt(convertToDigitIfNeeded(firstDigit) + "" + convertToDigitIfNeeded(lastDigit)); 
}

function convertToDigitIfNeeded(digit: string): number {
    if (digit.length === 1) { 
        // all written numbers are longer than 1 char, so if the regex found this it must be a single digit
        // Can typescript not do this more elegantly?
        return parseInt(digit);
    }
    
    return mapTextToNumber(digit);
}

function mapTextToNumber(writtenNumber: string): number {
    let map: { [key: string]: number } = {
        'zero': 0,
        'one': 1,	
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six' : 6,
        'seven': 7,
        'eight': 8,
        'nine': 9
    };

    return map[writtenNumber];
}

function poorMansLeftToRight(line: string): string {
    // return line;
    let map: { [key: string]: string } = {
        'zero': 'ze0ro',
        'one': 'on1e',	
        'two': 'tw2o',
        'three': 'th3ree',
        'four': 'fo4ur',
        'five': 'fi5ve',
        'six' : 'si6x',
        'seven': 'se7ven',
        'eight': 'ei8ght',
        'nine': 'ni9ne'
    };
    
    return line.replace(/zero|one|two|three|four|five|six|seven|eight|nine/g, function(matched) {
        return map[matched];
    });
}
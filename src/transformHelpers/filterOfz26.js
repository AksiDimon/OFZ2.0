import { ofzResponseMock } from "../ofzResponseMock";

export function ofzs26 (ofzResponseMock) {
    return ofzResponseMock.filter(obj => obj['name'].startsWith('26', 4))
}

// console.log(ofzs26(ofzResponseMock), 'ofzs26' )
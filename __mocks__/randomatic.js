const randomatic = jest.createMockModule("randomatic")

const randomize = (format, length) => {
    return "CODE00"
}

randomatic.randomize = randomize

export default randomatic
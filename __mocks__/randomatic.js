const randomatic = jest.createMockModule("randomatic")

const randomize = (format, length) => {
    console.log(format)
    console.log(length)
    return "CODE00"
}

randomatic.randomize = randomize

export default randomatic
/**
 *
 * Because I use console.trace in catch block of code
 * during the execution unit test this is a place where
 * you can disable stdout.
 *
 */

const isMockConsole = true;

if (isMockConsole) {
    console.trace = () => {};
    console.error = () => {};
    console.log = () => {};
    console.debug = () => {};
}

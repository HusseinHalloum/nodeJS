 let tasks = ['Write drafts of letters','Talk with parents','Collect ideas','Prepare emails','Set-up for meeting'];


/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  text = text.replace( /[\r\n]+/gm, "" ).trim().split(" ");
  if (text[0] === 'quit' || text[0] === 'exit') {
    quit();
  } else if (text[0] === 'hello') {
    hello(text[1]);
  } else if (text[0] === 'help'){
    help();
  } else if(text[0] === 'list'){
    listTasks();
  }
  else {
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(text) {
  if(text){
    console.log('hello '+ text + '!');
  }
  else {
    console.log('hello!');
  }
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  console.log('Quitting now, goodbye!')
  process.exit();
}


/**
* List/Print out all possible commands
*
* @returns {void}
*/
function help() {
  console.log('1-hello, you can add your name too and it will shows "hello urname!"\n2-quit or exit\n3-help')
}

function listTasks(){
  for(let i = 0; i<tasks.length; i++){
    console.log(i+1 + '- ' + tasks[i]);
  }
}


// The following line starts the application
startApp("Hussein Halloum")
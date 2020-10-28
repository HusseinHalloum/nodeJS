 let tasks = [
   {
     done : true,
    'task': 'Write drafts of letters'
  },
  {
    done: false,
    'task': 'Talk with parents'
  },
  {
    done: true, 
    'task': 'Collect ideas'
  },
  {done: false, 
    'task': 'Prepare emails'
  },
  {
    done: true, 
    'task': 'Set-up for meeting'
  },
  {
    done: false, 
    'task' : "collaboration"
  }
];



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
  const fs = require('fs');
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  fs.readFile('database.json', 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }
    const tasks = JSON.parse(data.toString());
    console.log(tasks);
  });
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
  } else if(text[0] === 'add'){
    addTask(text[1]);
  } else if(text[0] === 'remove'){
    removeTask(text);
  } else if(text[0] == 'edit'){
    editTask(text);
  } else if(text[0] == 'check'){
    checkTask(text);
  } else if(text[0] == 'uncheck'){
    uncheckTask(text);
  }
  else {
    unknownCommand(text[0]);
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
  const fs = require('fs');
  const data = JSON.stringify(tasks);
  fs.writeFileSync('database.json', data, (err) => {
  if (err) {
      throw err;
    }
  });
  console.log("JSON data is saved.");
  console.log('Quitting now, goodbye!')
  process.exit();
}


/**
* List/Print out all possible commands
*
* @returns {void}
*/
function help() {
  console.log('1- hello, you can add your name too and it will shows "hello urname!"\n2- quit or exit\n3- help\n4- list\n5- add\n6- remove\n7- edit\n8- check\n9- uncheck')
}

function listTasks(){
  for(let i = 0; i<tasks.length; i++){
    if (tasks[i].done == true){
    console.log(i+1 + '- [\u2713] '+ tasks[i].task);
    } else {
    console.log(i+1 + '- [] '+ tasks[i].task);
    }
  }
}

function addTask(text){
  if(text){
  tasks.push({done: false, task: text});
  }
  else console.log('Error');
}


function removeTask(text){
  if (text == 'remove'){
    tasks.pop();
  } else if (text[1] > tasks.length || text[1]< 1 ){
    console.log('You entered a number that doesn\'t exist');
  } else {
      tasks.splice(parseInt(text[1])-1, 1);
  }
}


// Edit task
function editTask(text){
  let replacedItem = parseInt(text[1])-1;
  let len = parseInt(tasks.length-1);
  if (text == 'edit'){
    console.log('Error')
  }
  else if(text[1] < tasks.length+1 && text[1] > 0 && text[2] != null && text[2] != ""){
    text.splice(0,2);
    tasks.splice(replacedItem,1,{done: false, task: text});
  } else  if (text[1] > tasks.length){
    console.log('There is no task no ' + text[1] + ' in this list')
  }
  else
  {
    tasks.splice(len,1,{done: false, task: text[1]});
  }
}

// Check Step
function checkTask(text){
  if (text == 'check'){
    console.log('Error')
  } else if (text[1] <= tasks.length && text[1] > 0){
    tasks[text[1]-1].done = true;
  } else {
    console.log('There is no task with this number ' + text[1])
  }
}

// Uncheck Step
function uncheckTask(text){
  if (text == 'uncheck'){
    console.log('Error')
  } else if (text[1] <= tasks.length && text[1] > 0){
    tasks[text[1]-1].done = false;
  } else {
    console.log('There is no task with this number ' + text[1])
  }
}

// The following line starts the application
startApp("Hussein Halloum")
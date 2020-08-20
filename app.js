//Made by Fabiano Barbosa dos Santos, Year: 2020
// Web app that allow you make one list of your tasks, and close when they was complete.

// Object responsible for the 'Task' and the color
let task = {
	HTMLdom :"<div class='task' id='%color%'><span class='task--close'>x</span><p class='task__description' contenteditable='true'> %textContent% </p></div>",
	taskList : [],
	colorSelected : "",
	makeNewTask : function (color, text) {
		this.color = color;
		this.text = text;
		let newHTMLdom = this.HTMLdom;
		newHTMLdom = newHTMLdom.replace("%color%", color);
		newHTMLdom = newHTMLdom.replace("%textContent%", text);
		ui.showTaskContent(newHTMLdom);
		ui.cleanForm();
		ui.taskClose();
		this.taskList.push(newHTMLdom);
},
	getColor : function () {
		let colors = document.querySelectorAll(".color");
		for (var i = 0; i < colors.length; i++) {
			colors[i].addEventListener("click", function () {
				task.colorSelected = this.id;
			})
		}
	}
};

// Object that control the user interface, 
let ui = {
	taskListDom : document.querySelector(".task-list"),
	showTaskContent : function (content) {
		this.taskListDom.insertAdjacentHTML("beforeend", content)
	},	

	//Allow close an concluied task
	taskClose : function () {
		let closeIcon = document.querySelectorAll(".task--close");
		for (var i = 0; i < closeIcon.length; i++) {
			closeIcon[i].addEventListener("click", function (task) {
				task.target.parentNode.remove();
			} )
		} 
	},

	//After one new task was made, the method clean the form input
	cleanForm : function () {
		document.querySelector(".new-task__description").value = "";
		task.colorSelected = "";
		this.taskClose();
	},

	//Method that show some message at the screen 
	showErrorMsg : function (text) {
		let getDiv = document.querySelector(".error-msg");
		getDiv.id = "";
		let getDivContent = document.querySelector(".error-msg__content");
		closeDiv = document.querySelector(".error-msg--close").addEventListener("click", function (close) {
			close.target.parentNode.remove();
		});
		getDivContent.innerHTML = text;
		setTimeout( function () {
			getDiv.id = "error-msg__hide";
		}, 8000);
	},

	//Check if the button was clicked or the 'Enter' was pressed
	checkInput : function () {
		if (document.querySelector(".new-task__description").value == "") {
			ui.showErrorMsg("You must writter something");
		}else {
			check = function(checkOf) {
			console.log(checkOf);
			if (checkOf.innerHText in checkOf == document.querySelector(".new-task__description").value) {
				console.log("task already exist");
			}
			}
			check(document.querySelector(".new-task__description"));	
			newTask = task.makeNewTask(task.colorSelected, document.querySelector(".new-task__description").value);
			}
	}
}

//Anonymous function that start the app, with the necessary feature and catch the input elements
appStart = ( function () {
	ui.taskClose();
	task.getColor();
		document.querySelector(".new-task__description").addEventListener("keypress", function (e) {
		if (e.keyCode == 13) {
			ui.checkInput();
		}
		
	});
	document.querySelector(".new-task__submit").addEventListener("click", function () {
		ui.checkInput();
	});	

})();
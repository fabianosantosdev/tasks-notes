/*
  Made by Fabiano Santos. 
  Version: 0.2
  Year 2020
*/

//Main anonymous function responsible by the data and the main method
var app = (function () {
  data = {
    htmlDom : "<div class='task' id='%color%'><span class='task__date'> %date% </span><span class='task--close'>x</span><p class='task__description' contenteditable='true'> %textContent% </p></div>",
    taskList : [],
    colorSelected : "",
    taskListDom  : document.querySelector(".task-list"),
    newTaskInput : document.querySelector(".new-task__description").value
  };

  dayAndHour = function () {
    now = new Date().toString().slice(0,21);
    return (now)
  };

  return {
    data :  {
      colorSelected : data.colorSelected,
      taskListDom : data.taskListDom,
      taskList : []
  },
  
    makeNewTask : function (color, text, date) {
      this.color = color;
      this.text = text;
      this.date = date;
      var newHTMLDom = data.htmlDom;
      newHTMLDom = newHTMLDom.replace("%color%", color);
      newHTMLDom = newHTMLDom.replace("%textContent%", text);
      newHTMLDom = newHTMLDom.replace("%date%", dayAndHour());
      return (newHTMLDom);
    },

    getTaskColor : function () {
      let colors = document.querySelectorAll('.color');
      for (var i = 0; i < colors.length; i++) {
        colors[i].addEventListener("click", function () {
        app.data.colorSelected = this.id;
       });
      }
    }
  }
})();


//Anonymous function responsible by the user interface(delete and add new task or even a message on the screen)
var uiControl = (function (app){
  showTaskDom = function (content) {
    app.data.taskListDom.insertAdjacentHTML("beforeend", content);
  };

  closeTask = function () {
    let closeIcon = document.querySelectorAll(".task--close");
    for (var i = 0; i < closeIcon.length; i++) {
      closeIcon[i].addEventListener("click", function (task) {
        task.target.parentNode.remove();
      });
    }
  };

  cleanForm = function () {
    document.querySelector(".new-task__description").value = "";
    app.data.colorSelected = "";

  };

  checkInputData = function () {
    if (document.querySelector(".new-task__description").value === "") {
      console.log(document.querySelector(".new-task__description").value);
      showMsg("You must writter something");
    }else {
        newTask = app.makeNewTask(app.data.colorSelected, document.querySelector(".new-task__description").value);
        showTaskDom(newTask);
        cleanForm();
        closeTask();
      }
           
  };

  showMsg = function (textContent) {
    var getDomElement = document.querySelector(".error-msg");
    var getDomElementContent = document.querySelector(".error-msg__content");
    var hideDomElement = document.querySelector(".error-msg--close");
    getDomElement.id = "";
    getDomElementContent.innerHTML = textContent;

    hideDomElement.addEventListener("click", function (element) {
      element.target.parentNode.id = "error-msg__hide";
    });
    setTimeout( function () {
      getDomElement.id = "error-msg__hide";
    }, 8000);

  };
  return {
    appStart : function () {
      closeTask();
      app.getTaskColor();
      document.querySelector(".new-task__description").addEventListener("keypress", function (e) {
        if (e.keyCode == 13) {
            checkInputData();
        }
      });
      document.querySelector(".new-task__submit").addEventListener("click", function () {
        checkInputData();
      });

    }
  }
})(app);


uiControl.appStart();

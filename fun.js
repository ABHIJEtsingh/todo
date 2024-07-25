// const { response } = require("express");

document.addEventListener("DOMContentLoaded",()=>{
    //accesing the element
    const input = document.getElementById("newTask");
    const addBtn=document.getElementById("add");
    const apiUrl="https://jsonplaceholder.typicode.com/todos";

    const taskList = document.getElementById("list")
    addBtn.addEventListener("click",()=>{
        let newWork=input.value.trim();
        //gaurdClause
        if(newWork!=""){
            addTask(newWork);
            input.value="";
        }
    })
    function addTask(newWork){
        const newTask={title: newWork,completed:false };
        fetch(apiUrl,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(newTask),
        })
        .then((response)=> response.json())
        .then((task)=>{console.log(task);
        displayTask(task.title,task.id)
    }).catch((error)=>console.error("failed during task",error)); 
    }
    //dispaly element
    function displayTask(title,id){
        const li = document.createElement("li");
        li.setAttribute("data-id",id);
        const span = document.createElement("span");
        span.textContent= title;

        const editbtn=document.createElement("button")
        editbtn.textContent="edit";
        editbtn.className="edit";
        editbtn.addEventListener("click",()=>
        editTask(span,id)
        );

        const deletebtn=document.createElement("button")
        deletebtn.textContent="delete";
        deletebtn.className="delete";
        deletebtn.addEventListener("click",()=>
        deleteTask(id,li)
        );

        li.appendChild(span);
        li.appendChild(editbtn);
        li.appendChild(deletebtn);
        list.appendChild(li);
    }
    function editTask(span,id){
        const newText = prompt("edit task", span.textContent);
        if(newText!== null && newText !== ""){
            const updateTask={title:newText,completed:false};
            fetch(`${apiUrl}/${id}`,{
                method:"PATCH",
                headers:{
                    "Content-type":"application/json",
                },
                body:JSON.stringify(updateTask),
            }).then((response)=>{
                console.log(response);
                if(response.ok === false){
                    throw new Error("Faild to Update");
                }
                return response.json();
            })
            .then( () => {
                span.textContent=newText;
            });
            }
        }
    function deleteTask(id,li){
        fetch(`${apiUrl}/${id}`,{
            method:"DELETE",
        }).then(response =>{
            if(response.ok==true){
                taskList.removeChild(li);
            }else{
                throw new Error("Faild to deleting task", error);
            }
        })
        .catch((errir)=>console.error.error("error in deeting task",error));
    }
    
});
package main

import (
	"encoding/json"
	"net/http"
)

// Defining a to do
type todo struct {
	key         string `json:"key"`
	title       string `json:"title"`
	description string `json:"description"`
}

var todos = []todo{}

func main() {
	http.HandleFunc("/", ToDoListHandler)
	//TODO: catch errors here
	http.ListenAndServe(":8080", nil)
}

func ToDoListHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// TODO: test that you can both retrieve and add new to-dos
	switch r.Method {
	//If receiving a get request, encode the todos into a json and return it
	case "GET":
		json.NewEncoder(w).Encode(todos)
	//If receiving a post request, get the new to-do and append it to the array
	case "POST":
		//TODO: catch errors
		r.ParseForm()

		var newTodo todo
		newTodo.key = r.FormValue("key")
		newTodo.title = r.FormValue("title")
		newTodo.description = r.FormValue("description")

		todos = append(todos, newTodo)
	}
}

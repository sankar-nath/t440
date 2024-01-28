package com.example.fruitlistapp.models

// shortcut for defining properties & constructor in one line
class Student(var name:String, var age:Int, var isPg:Boolean) {
    override fun toString(): String {
        return "Student(name='$name', age=$age, isPg=$isPg)"
    }
}
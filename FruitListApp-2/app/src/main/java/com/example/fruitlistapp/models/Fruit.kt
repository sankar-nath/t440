package com.example.fruitlistapp.models

class Fruit{
    // properties
    var name:String
    var desc:String
    var imageFilename:String


    // set the initial values of those properties
    constructor(name:String, desc:String, fileName:String) {
        this.name = name
        this.desc = desc
        this.imageFilename = fileName
    }

    // debug
    override fun toString(): String {
        return "Fruit(name='$name', desc='$desc', imageFilename='$imageFilename')"
    }

}

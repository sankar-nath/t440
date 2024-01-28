package com.example.fruitlistapp.screens

import android.content.SharedPreferences
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.fruitlistapp.databinding.ActivityAddFruitBinding
import com.example.fruitlistapp.models.Fruit
import com.google.android.material.snackbar.Snackbar
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken

class AddFruitActivity : AppCompatActivity() {

    // setup binding and tags
    lateinit var binding: ActivityAddFruitBinding
    val TAG = this@AddFruitActivity::class.java.canonicalName


    // TODO: Shared Preferences variables
    //1. declare an instance of SharedPreferences
    //2. declare an instance of Editor of SharedPreferences
    //this will be used to write data
    lateinit var sharedPreferences: SharedPreferences
    lateinit var prefEditor: SharedPreferences.Editor

    // TODO: Get the current fruit data source
    var savedFruits:MutableList<Fruit> = mutableListOf()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        this.binding = ActivityAddFruitBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // TODO: initialize SharedPreference and Editor instance
        this.sharedPreferences = getSharedPreferences("MY_APP_PREFS", MODE_PRIVATE)

        // TODO: get existing fruit list from SharedPreferences
        this.prefEditor = this.sharedPreferences.edit()


        // when the Add Screen loads, check SP to see if there is an existing
        // list of fruits
        var resultsFromSP = sharedPreferences.getString("KEY_FRUITS_DATASOURCE", "")
        if (resultsFromSP == "") {
            // - if no, we should create a brand new list of fruits
            // do nothing!
        } else {
            // - if yes, convert the string back to list of fruits
            val gson = Gson()
            val typeToken = object : TypeToken<List<Fruit>>() {}.type
            val fruitsList = gson.fromJson<List<Fruit>>(resultsFromSP, typeToken)

            // replace this screen's savedFruits variable with whatever came from the sp
            savedFruits = fruitsList.toMutableList()
        }




        // Click handlers
        this.binding.btnSave.setOnClickListener {
            //save the fruit info in SharedPreferences
            this.saveData()

            //dismiss current Activity/Screen
            finish()
        }

        this.binding.btnCancel.setOnClickListener {
            //do nothing
            //dismiss current Activity/Screen
            finish()
        }
    } // end onCreate()

    private fun saveData(){

        var fruitName : String = ""
        var vitaInfo : String = ""

        if (this.binding.edtTitle.text.isNullOrEmpty()){
            this.binding.edtTitle.setError("Fruit Name cannot be empty")
        }else{
            fruitName = this.binding.edtTitle.text.toString()
        }

        if (this.binding.edtDetail.text.isNullOrEmpty()){
            this.binding.edtDetail.setError("Vitamin Info cannot be empty")
        }else{
            vitaInfo = this.binding.edtDetail.text.toString()
        }

        if (fruitName.isNotEmpty() && vitaInfo.isNotEmpty()) {

            // 1. create a fruit object and add to array list
            var fruitToAdd = Fruit(fruitName, vitaInfo, fruitName.lowercase())

            // 2. add this fruit to the list of fruits
            savedFruits.add(fruitToAdd)

            // 3. Save this list of fruits back to SP
            val gson = Gson()
            val listAsString = gson.toJson(savedFruits)
            this.prefEditor.putString("KEY_FRUITS_DATASOURCE", listAsString)

            // 4. commit the changes
            this.prefEditor.apply()

            // 4. commit the changes made to Shared Preferences
            Snackbar.make(binding.addFruitParentLayout, "Data Saved to SharedPrefs", Snackbar.LENGTH_LONG).show()
        }else{
            Snackbar.make(binding.addFruitParentLayout, "No Data to Save", Snackbar.LENGTH_LONG).show()
        }
    } // end saveData() helper function

} // end Activity

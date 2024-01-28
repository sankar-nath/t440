package com.example.fruitlistapp.screens

import android.content.SharedPreferences
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import com.example.fruitlistapp.databinding.ActivityScreen2Binding
import com.example.fruitlistapp.models.Fruit
import com.example.fruitlistapp.models.Student
import com.google.android.material.snackbar.Snackbar
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken

class Screen2Activity : AppCompatActivity() {

    lateinit var binding:ActivityScreen2Binding

    // class properties: sharedpreferences
    lateinit var sharedPreferences: SharedPreferences

    // - this is needed to put sharedpreferences in editing mode so we can "save"
    lateinit var prefEditor: SharedPreferences.Editor

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityScreen2Binding.inflate(layoutInflater)
        setContentView(binding.root)


        // initialize shared preferences
        // for NAME - you decide what name to put there
        this.sharedPreferences = getSharedPreferences("MY_APP_PREFS", MODE_PRIVATE)

        // configure shared preferences to work in "editing mode"
        // "editing mode" is required when you want to "save" data to shared preferences
        this.prefEditor = this.sharedPreferences.edit()

        // click handlers
        binding.btnReset.setOnClickListener {
            // delete all values in SharedPreferences
            // prefEditor.clear()

            // delete a single value (not all values)
            prefEditor.remove("KEY_NAME")

            // save the changes
            prefEditor.apply()

            // confirm
            Snackbar.make(binding.root, "Data erased!", Snackbar.LENGTH_LONG).show()
            // erase anything that is displayed in the results
            binding.results.setText("")





        }



        binding.btnSave.setOnClickListener {
            // get the name from the UI
            val nameFromUI: String = binding.etName.text.toString()
            val ageFromUI: Int = binding.etAge.text.toString().toInt()
            val isPGFromUI: Boolean = binding.swIsPg.isChecked


            // TODO: Update to save a Student object
            // - create a student
            val studentToSave = Student(nameFromUI, ageFromUI, isPGFromUI)
            // - save the student
            val gson = Gson()
            val jsonStudent = gson.toJson(studentToSave)

            // - key value pair
            prefEditor.putString("KEY_STUDENT", jsonStudent)

            // TODO: Save a list of fruits
            var fruitsList:List<Fruit> = listOf<Fruit>(
                Fruit("Apple Pie", "Great for pies and juices", "apple"),
                Fruit("Banana", "Curved yellow fruit on tree", "banana"),
                Fruit("Blackberry", "Lots of antioxidents, very healthy", "blackberry"),
            )
            val jsonFruitsList = gson.toJson(fruitsList)

            // - key value pair
            prefEditor.putString("KEY_FRUIT_BASKET", jsonFruitsList)


            // - save
            prefEditor.apply()

            Snackbar.make(binding.root, "Data saved!", Snackbar.LENGTH_LONG).show()




//            // create the key-value pair
//            // key = KEY_NAME
//            // value = Peter
//            this.prefEditor.putString("KEY_NAME", nameFromUI)
//            this.prefEditor.putInt("KEY_AGE", ageFromUI)
//            this.prefEditor.putBoolean("KEY_IS_PG", isPGFromUI)
//
//
//            // save a fruit
//            // - get instance of the Gson library
//            val gson = Gson()
//            // - get an object
//            val fruitToSave  = Fruit("Coconut", "Makes a refreshing drink", "coconut")
//            // - use GSON library to convert fruit to a string
//            val fruitAsString = gson.toJson(fruitToSave)
//
//            // - make a key-value pair
//            this.prefEditor.putString("KEY_FRUIT", fruitAsString)
//
//
//            // - commit your changes (save your key-value pairs to memory)
//            this.prefEditor.apply()
//
//            // show a confirmation message
//            Snackbar.make(binding.root, "Data saved!", Snackbar.LENGTH_LONG).show()
        }

        binding.btnRetrieve.setOnClickListener {

            // get the student from the SP
//            val studentFromSP = sharedPreferences.getString("KEY_STUDENT", null)
//            Log.d("TAG", studentFromSP!!)
//            if (studentFromSP != null) {
//                // convert the string back to a Student object
//                val gson = Gson()
//                val studentObject = gson.fromJson<Student>(studentFromSP, Student::class.java)
//                binding.results.setText("Name: ${studentObject.name}\nAge:${studentObject.age}\nIs PG? ${studentObject.isPg}")
//            }

            // TODO: Get our fruit list
            val fruitsFromSP = sharedPreferences.getString("KEY_FRUIT_BASKET", null)
            if (fruitsFromSP != null) {
                val gson = Gson()
                val typeToken = object : TypeToken<List<Fruit>>() {}.type
                val fruitsList = gson.fromJson<List<Fruit>>(fruitsFromSP, typeToken)

                var output = ""
                for (currFruit in fruitsList) {
                    output += "${currFruit.name}\nDesc: ${currFruit.desc}\n---------\n"
                }

                binding.results.setText(output)


            }





//            // get the name from SharedPreferences
//            // - parameter 2 = what should we return if "KEY_NAME" does not exist
//            val nameFromSP = sharedPreferences.getString("KEY_NAME", "not available")
//            val ageFromSP = sharedPreferences.getInt("KEY_AGE", -1)
//            val pgFromSP = sharedPreferences.getBoolean("KEY_IS_PG", false)
//            // binding.results.setText("Name: ${nameFromSP}\nAge:${ageFromSP}\nIs Postgraduate? ${pgFromSP}\n")
//
//            // get the Fruit String that is stored in SP
//            val fruitFromSP = sharedPreferences.getString("KEY_FRUIT", "")
//            if (fruitFromSP != "") {
//                // convert the string back into a fruit object
//                val gson = Gson()
//                val fruitAsObject:Fruit = gson.fromJson(fruitFromSP, Fruit::class.java)
//                binding.results.setText(fruitAsObject.toString())
//            }


        }
        // TODO: Try saving the age (getInt/putInt) & switch (getBoolean/putBoolean)
    }
}
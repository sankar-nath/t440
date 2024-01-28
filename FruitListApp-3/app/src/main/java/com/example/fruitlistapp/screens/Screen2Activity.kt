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

            // Show snackbar message
            Snackbar.make(binding.root, "Reset!", Snackbar.LENGTH_LONG).show()

            // Clear the results TV
            binding.results.setText("")

        }


        binding.btnRetrieve.setOnClickListener {


            var addressFromUI: String = binding.etName.text.toString()
            val priceFromUI: Int = binding.etAge.text.toString().toInt()
            // Retrieve the list of addresses and display the result
            val fruitsFromSP = sharedPreferences.getString("KEY_FRUITS_DATASOURCE", null)
            if (fruitsFromSP != null) {
                val gson = Gson()
                val typeToken = object : TypeToken<List<Fruit>>() {}.type
                val fruitsList = gson.fromJson<List<Fruit>>(fruitsFromSP, typeToken)

                var output = ""
                for (currFruit in fruitsList) {
                    var fruitPrice = currFruit.desc.toIntOrNull() ?: continue // Skip if desc is not an integer
                    if (fruitPrice == null) fruitPrice = 0
                    if (addressFromUI == null) addressFromUI=""
                    if (currFruit.name.contains(addressFromUI, ignoreCase = true) || fruitPrice < priceFromUI) {
                        output += "Address:${currFruit.name}\nPrice: $${currFruit.desc}\n---------\n"
                    }


//                    output += "Address:${currFruit.name}\nPrice: ${currFruit.desc}\n---------\n"
                }
                binding.results.setText(output)



            }

        }
        // TODO: Try saving the age (getInt/putInt) & switch (getBoolean/putBoolean)
    }
}
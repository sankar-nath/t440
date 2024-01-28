package com.example.fruitlistapp

import android.content.Intent
import android.content.SharedPreferences
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.fruitlistapp.adapters.FruitAdapter
import com.example.fruitlistapp.databinding.ActivityMainBinding
import com.example.fruitlistapp.models.Fruit
import com.example.fruitlistapp.screens.AddFruitActivity
import com.example.fruitlistapp.screens.Screen2Activity
import com.google.android.material.snackbar.Snackbar
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken

class MainActivity : AppCompatActivity() {
    lateinit var binding:ActivityMainBinding

    lateinit var adapter: FruitAdapter

    // made this mutable because we know that later on, we have to add fruits to it
//    private var datasource:MutableList<Fruit> = mutableListOf<Fruit>(
//        Fruit("Apple", "Great for pies and juices", "apple"),
//        Fruit("Banana", "Curved yellow fruit on tree", "banana"),
//        Fruit("Blackberry", "Lots of antioxidents, very healthy", "blackberry"),
//
//    )

    private var datasource:MutableList<Fruit> = mutableListOf<Fruit>(Fruit("test","1","2"))

    lateinit var sharedPreferences: SharedPreferences
    lateinit var prefEditor: SharedPreferences.Editor

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // configure shared preferences
        this.sharedPreferences = getSharedPreferences("MY_APP_PREFS", MODE_PRIVATE)
        this.prefEditor = this.sharedPreferences.edit()


        // set menu
        setSupportActionBar(this.binding.menuToolbar)
        supportActionBar?.setDisplayShowTitleEnabled(true)

        // setup adapter
        // TODO: Update adapter to accept a list of fruits
        adapter = FruitAdapter(
            datasource,
            {pos -> rowClicked(pos) },
            {pos -> favButtonClicked(pos)}

        )

        // setup rv
        binding.rvItems.adapter = adapter
        binding.rvItems.layoutManager = LinearLayoutManager(this)
        binding.rvItems.addItemDecoration(
            DividerItemDecoration(
                this,
                LinearLayoutManager.VERTICAL
            )
        )

    }

    // rv:  Row click handler
    fun rowClicked(position:Int){
        // get the current fruit object
        var selectedFruit:Fruit = datasource.get(position)

        val snackbar = Snackbar.make(binding.rootLayout, "${selectedFruit.toString()}", Snackbar.LENGTH_LONG)
        snackbar.show()
    }

    // rv: Favorite button click handler
    fun favButtonClicked(position:Int) {
        val snackbar = Snackbar.make(binding.rootLayout, "Favorite ${position}", Snackbar.LENGTH_LONG)
        snackbar.show()
    }


    // options menu
    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflate the menu; this adds items to the action bar if it is present.
        menuInflater.inflate(R.menu.options_menu_items, menu)
        return true
    }
    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            R.id.mi_showNextPage -> {
                val intent = Intent(this, Screen2Activity::class.java)
                startActivity(intent)
                return true
            }
            R.id.mi_addFruit -> {
                val intent = Intent(this, AddFruitActivity::class.java)
                startActivity(intent)
                return true
            }
            R.id.mi_clearAllFruits -> {
                deleteFruits()
                return true
            }
            else -> super.onOptionsItemSelected(item)
        }
    }


    // helper function to delete all fruits from SP
    private fun deleteFruits() {
        prefEditor.remove("KEY_FRUITS_DATASOURCE")

        // commit our changes
        prefEditor.apply()

        // update the RV to show that there are no more items
        datasource.clear()
        adapter.notifyDataSetChanged()

    }


    // 1. when you come back to the main activity
    override fun onResume() {
        super.onResume()
        Log.d("TAG", "user returned to MainActivity")

        // 2. get the updated list of data from sharedpreferences
        val fruitsListFromSP = sharedPreferences.getString("KEY_FRUITS_DATASOURCE", "")
        if (fruitsListFromSP != "") {
            // convert the string back into a fruit object
            val gson = Gson()
            // define what type of data we should convert the string back to
            val typeToken = object : TypeToken<List<Fruit>>() {}.type
            // convert the string back to a list
            val fruitsList = gson.fromJson<List<Fruit>>(fruitsListFromSP, typeToken)


            // 3. update the adapter with the new list of data
            // - delete all existing items
            datasource.clear()
            // - add back all of the items from shared preferences
            datasource.addAll(fruitsList)
            // - notify the adpater that something has changed
            adapter.notifyDataSetChanged()
        }

    }
}
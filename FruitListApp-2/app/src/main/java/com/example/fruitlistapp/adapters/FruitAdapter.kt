package com.example.fruitlistapp.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.fruitlistapp.R
import com.example.fruitlistapp.models.Fruit


// TODO: Update to accept a list of fruits
class FruitAdapter(
    private val fruitsList:MutableList<Fruit>,
    private val rowClickHandler: (Int) -> Unit,
    private val favBtnClickHandler: (Int) -> Unit) : RecyclerView.Adapter<FruitAdapter.FruitViewHolder>() {

    inner class FruitViewHolder(itemView: View) : RecyclerView.ViewHolder (itemView) {
        init {
            itemView.setOnClickListener {
                rowClickHandler(adapterPosition)
            }
            itemView.findViewById<Button>(R.id.btnAddFavorite).setOnClickListener {
                favBtnClickHandler(adapterPosition)
            }
        }
    }


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): FruitViewHolder {
        val view: View = LayoutInflater.from(parent.context).inflate(R.layout.row_item_fruit, parent, false)
        return FruitViewHolder(view)
    }

    override fun getItemCount(): Int {
        return fruitsList.size
    }

    override fun onBindViewHolder(holder: FruitViewHolder, position: Int) {

        // 1. Get the current fruit
        val currFruit:Fruit = fruitsList.get(position)

        // 2. Populate the UI with the fruit details
        // 2a. Get the tvTitle
        val tvTitle = holder.itemView.findViewById<TextView>(R.id.tvTitle)
        tvTitle.text = currFruit.name

        // 2b. Populate tvDetail
        val tvDetail = holder.itemView.findViewById<TextView>(R.id.tvDetail)
        tvDetail.text = currFruit.desc

        // 2c. Populate the image
        // - getting a context variable
        val context = holder.itemView.context

        // - use the context to update the image
        val res = context.resources.getIdentifier(currFruit.imageFilename, "drawable", context.packageName)

        val ivFruit = holder.itemView.findViewById<ImageView>(R.id.ivFruit)
        ivFruit.setImageResource(res)


    }
}

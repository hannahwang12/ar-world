package com.example.arworld

import android.app.ActivityManager
import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.os.AsyncTask
import android.os.Bundle
import android.util.Base64
import android.util.Log
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentTransaction
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.google.ar.core.AugmentedImageDatabase
import com.google.ar.core.Config
import com.google.ar.core.Session
import org.json.JSONObject
import java.io.IOException
import java.net.HttpURLConnection
import java.net.URL

class MainActivity : AppCompatActivity() {
    var imageMap: HashMap<String, Bitmap> = HashMap()

    inner class LoadBitmap(url: String, hash: String) : AsyncTask<String, Void, Bitmap>() {
        private var mUrl: String = url
        private var hashstring: String = hash

        private fun getBitmapFromURL(src: String): Bitmap {
            try {
                var url = URL(src)
                var connection = url.openConnection() as HttpURLConnection
                connection.doInput = true
                connection.connect()
                var input = connection.inputStream
                return BitmapFactory.decodeStream(input)
            } catch (err : IOException) {
                throw err
            }
        }

        override fun doInBackground(vararg params: String): Bitmap {
            Log.e("INFO", mUrl)
            return getBitmapFromURL(mUrl)
        }

        override fun onPostExecute(result: Bitmap) {
            Log.e("INFO", "ADDED")
            imageMap[hashstring] = result
        }
    }

    private val openGlVersion by lazy {
        (getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager)
            .deviceConfigurationInfo
            .glEsVersion
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val arguments = Bundle()

        val queue = Volley.newRequestQueue(this)
        val mongoURL = "http://arworld-env.qhhma4hbjf.us-east-2.elasticbeanstalk.com/getHashPairs/"

        // Request a string response from the provided URL.
        val stringRequest = StringRequest(
            Request.Method.GET, mongoURL,
            Response.Listener<String> { response ->
                var jObject = JSONObject(response)
                var keys = jObject.keys()

                while(keys.hasNext()) {
                    val key: String = keys.next()
                    val decodedString = Base64.decode(jObject[key] as String, Base64.DEFAULT)
                    val decodedByte =
                        BitmapFactory.decodeByteArray(decodedString, 0, decodedString.size)
                    Log.e("INFO", key)
                    imageMap[key] = decodedByte
                    //val loadBitmap = LoadBitmap("http://d2h8ztguq0hpsz.cloudfront.net/test_image_1.jpg", key)
                    //loadBitmap.execute()
                }

                if (openGlVersion.toDouble() >= MIN_OPEN_GL_VERSION) {
                    arguments.putSerializable("hashmap", imageMap)
                    val fragment = ArVideoFragment()
                    fragment.arguments = arguments
                    supportFragmentManager.inTransaction { replace(R.id.fragmentContainer, fragment) }
                } else {
                    AlertDialog.Builder(this)
                        .setTitle("Device is not supported")
                        .setMessage("OpenGL ES 3.0 or higher is required. The device is running OpenGL ES $openGlVersion.")
                        .setPositiveButton(android.R.string.ok) { _, _ -> finish() }
                        .show()
                }
            }, Response.ErrorListener { Log.e("ERROR", "Oops!") })

        // Add the request to the RequestQueue.
        queue.add(stringRequest)
    }

    private inline fun FragmentManager.inTransaction(func: FragmentTransaction.() -> FragmentTransaction) {
        beginTransaction().func().commit()
    }

    companion object {
        private const val MIN_OPEN_GL_VERSION = 3.0
    }
}
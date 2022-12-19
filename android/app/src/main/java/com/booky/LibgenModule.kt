package com.booky

import BookType
import DownloadLinksScraper
import FictionScraper
import LibgenLCScraper
import NonFictionScraper
import Response
import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import com.google.gson.Gson
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.jsoup.HttpStatusException
import java.net.UnknownHostException

class LibgenModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "LibgenModule"
    private val fictionScraper: FictionScraper = FictionScraper()
    private val nonFictionScraper: NonFictionScraper = NonFictionScraper()
    private val downloadLinksScraper = DownloadLinksScraper()
    private val libgenLCScraper = LibgenLCScraper()
    val gson = Gson()

    @ReactMethod
    fun search(
        query: String,
        page: Int,
        language: String,
        format: String,
        category: BookType?,
        promise: Promise
    ) {
        try {
            lateinit var response: Response
            when (category) {
                BookType.NON_FICTION -> {
                    response = nonFictionScraper.fetch {
                        nonFictionScraper.generateSearchBooksConnection(
                            query = query,
                            page = page,
                            language = language,
                            format = format,
                            connection = this
                        )
                    }
                }
                BookType.FICTION -> {
                    response = fictionScraper.fetch {
                        fictionScraper.generateSearchBooksConnection(
                            query = query,
                            page = page,
                            language = language,
                            format = format,
                            connection = this
                        )
                    }
                }
                null -> {
                    response = libgenLCScraper.fetch {
                        libgenLCScraper.generateSearchBooksConnection(
                            query = query,
                            page = page,
                            language = language,
                            connection = this
                        )
                    }
                }
            }
            promise.resolve(gson.toJson(response))
        } catch (e: Throwable) {
            promise.reject("search", e)
        }
    }

    @ReactMethod
    fun getDetails(detailsUrl: String, promise: Promise) {
        CoroutineScope(Dispatchers.IO).launch {
            kotlin.runCatching {
                val response = downloadLinksScraper.fetch(detailsUrl) {
                    downloadLinksScraper.generateGetDownloadLinksConnection(this)
                }
                promise.resolve(gson.toJson(response))
            }.onFailure {
                val error = WritableNativeMap()
                when(it) {
                    is UnknownHostException -> {
                       error.putString("code", "UNKNOWN_HOST")
                        error.putString("status", "UNKNOWN_HOST")
                        error.putString("message", it.message)
                        promise.reject("getDetails",error)
                    }
                    is HttpStatusException -> {
                        error.putString("code", "HTTP_STATUS")
                        error.putInt("status", it.statusCode)
                        error.putString("message", it.message)
                        promise.reject("getDetails",error)
                    }
                    else -> {
                        promise.reject("getDetails", it)
                    }
                }
            }

        }

    }
}
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
        CoroutineScope(Dispatchers.IO).launch {
            kotlin.runCatching {
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
            }.onFailure { handleError(it, promise, "SEARCH") }
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
            }.onFailure { handleError(it, promise, "GET_DETAILS") }
        }

    }

    private fun handleError(error: Throwable, promise: Promise, s: String? = "") {
        val localError = WritableNativeMap()
        when (error) {
            is UnknownHostException -> {
                localError.putString("code", "UNKNOWN_HOST")
                localError.putString("status", "UNKNOWN_HOST")
                localError.putString("message", error.message)
                promise.reject(s, error)
            }
            is HttpStatusException -> {
                localError.putString("code", "HTTP_STATUS")
                localError.putInt("status", error.statusCode)
                localError.putString("message", error.message)
                promise.reject(s, error)
            }
            else -> {
                promise.reject(s, error)
            }
        }
    }
}
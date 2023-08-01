package com.booky

import DownloadLinksScraper
import FictionScraper
import LibgenLCScraper
import NonFictionScraper
import Response
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableNativeMap
import com.google.gson.Gson
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.jsoup.HttpStatusException
import java.io.IOException
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
        category: String,
        language: String,
        extension: String,
        promise: Promise
    ) {
        CoroutineScope(Dispatchers.IO).launch {
            kotlin.runCatching {
                lateinit var response: Response

                when {
                    category == "NON_FICTION" && language == "ALL" -> {
                        response = nonFictionScraper.fetch {
                            nonFictionScraper.generateSearchBooksConnection(
                                query = query,
                                connection = this,
                                page = page
                            )
                        }
                        promise.resolve(gson.toJson(response))
                    }

                    category == "FICTION" -> {
                        response = fictionScraper.fetch {
                            fictionScraper.generateSearchBooksConnection(
                                query = query,
                                page = page,
                                connection = this,
                                language = if (language == "ALL") "" else language,
                                format = if (extension == "ALL") "" else extension
                            )
                        }
                        promise.resolve(gson.toJson(response))
                    }

                    (category == "ALL") || (category == "NON_FICTION" && language != "ALL") -> {
                        response = libgenLCScraper.fetch {
                            libgenLCScraper.generateSearchBooksConnection(
                                query = query,
                                page = page,
                                connection = this,
                                language = if (language == "ALL") "" else language,
                            )
                        }
                        promise.resolve(gson.toJson(response))

                    }

                    else -> {
                        val localError = WritableNativeMap()
                        localError.putString("code", "UNKNOWN_CATEGORY")
                        promise.reject("Unknown category", localError)
                    }
                }
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
                localError.putString("message", error.message)
                promise.reject(s, error)
            }

            is HttpStatusException -> {
                localError.putString("code", "HTTP_STATUS")
                localError.putInt("status", error.statusCode)
                localError.putString("message", error.message)
                promise.reject(s, error)
            }

            is IOException -> {
                localError.putString("code", "IO_EXCEPTION")
                localError.putString("message", error.message)
                promise.reject(s, error)
            }

            else -> {
                promise.reject(s, error)
            }
        }
    }
}
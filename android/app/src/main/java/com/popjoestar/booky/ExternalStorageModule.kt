package com.popjoestar.booky

import android.os.Build
import android.os.Environment
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


class ExternalStorageModule(reactContext: ReactApplicationContext):
    ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "ExternalStorageModule"

    @RequiresApi(Build.VERSION_CODES.R)
    @ReactMethod
    fun isExternalStorageManager(promise: Promise) {
        promise.resolve(Environment.isExternalStorageManager())
    }
}
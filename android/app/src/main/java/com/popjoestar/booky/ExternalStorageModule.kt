package com.popjoestar.booky

import android.os.Build
import android.os.Environment
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


class ExternalStorageModule(reactContext: ReactApplicationContext):
    ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "ExternalStorageModule"

    @ReactMethod
    fun isExternalStorageManager(promise: Promise) {
        val isStorageManagerSupported = Build.VERSION.SDK_INT < Build.VERSION_CODES.R || Environment.isExternalStorageManager()
        promise.resolve(isStorageManagerSupported)
    }
}
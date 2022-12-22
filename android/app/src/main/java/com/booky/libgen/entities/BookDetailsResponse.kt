package com.booky.libgen.entities

import entities.DownloadLink

data class BookDetailsResponse(
    var title:  String?,
    var image:  String? = null,
    var series:  String? = null,
    var authors: List<String>? = null,
    var publisher:  String? = null,
    var isbns: List<String>? = null,
    var description:  String? = null,
    var downloadLinks:  MutableList<DownloadLink>? = mutableListOf(),
    var year:  String? = null,
)
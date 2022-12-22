package entities

data class DownloadLink(val host: String, val link: String)

data class Book(
    var libgenID: String? = null,
    var title:  String? = null,
    var size:  String? = null,
    var extension:  String? = null,
    var md5:  String? = null,
    var image:  String? = null,
    var nbrOfPages:  String? = null,
    var series:  String? = null,
    var authors: List<String>? = null,
    var publisher:  String? = null,
    var isbns: List<String>? = null,
    var description:  String? = null,
    var downloadLinks:  MutableList<DownloadLink>? = mutableListOf(),
    var year:  String? = null,
    var language:  String? = null,
    val details_url: String?
)
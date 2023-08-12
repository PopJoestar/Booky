import com.popjoestar.booky.libgen.entities.BookDetailsResponse
import entities.Book
import entities.DownloadLink
import org.jsoup.Connection
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import utils.getImageSource

class DownloadLinksScraper {
    fun fetch(url: String,connectionCallback: Connection.() -> Connection): BookDetailsResponse {
       val jsoup = Jsoup.connect(url)
            .timeout(Constants.DEFAULT_TIMEOUT)
            .connectionCallback()
        val document = jsoup.get()
        return processDocument(document)
    }

    fun generateGetDownloadLinksConnection(
        connection: Connection
    ): Connection = connection.apply {
        timeout(Constants.DEFAULT_TIMEOUT)
    }

    private fun processDocument(document: Document): BookDetailsResponse {
        var detailSections: List<String>
        val body = document.body()
        val detailsContainer = body.getElementById("info")

        val result = BookDetailsResponse(title= body.select("h1").first()?.text())

        if (detailsContainer != null) {
            result.image =  getImageSource(Constants.IMAGE_SOURCE, detailsContainer.select("img").attr("src"))
        }

        val descripitionContainer = detailsContainer?.select("div")

        if (descripitionContainer != null) {
            if (descripitionContainer.size > 3) {
                result.description = descripitionContainer[3]?.text()
            } else {
                result.description = descripitionContainer.last()?.text()
            }
        }

        detailsContainer?.select("p")?.forEach { detail ->
            detailSections = detail.text().split(":")
            when {
                "Author(s)" in detailSections -> {
                    result.authors = detailSections.filter { it != "Author(s)" }
                }
                "Publisher" in detailSections -> {
                    result.publisher = detailSections[1]
                    result.year = detailSections.last()
                }
                "ISBN" in detailSections -> {
                    result.isbns = detailSections.filter { it != "ISBN" }
                }
                "Series" in detailSections -> {
                    result.series = detailSections.last()
                }
            }
        }

        body.getElementById("download")?.select("a")?.forEach { link ->
            result.downloadLinks?.add( DownloadLink(host = link.text(), link = link.attr("href")))
        }

        return result
    }
}
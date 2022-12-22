import entities.Book
import org.jsoup.Connection
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.nodes.Element
import utils.getImageSource
import kotlin.math.ceil

class NonFictionScraper {

    companion object {
        fun getDetailsUrl (md5: String) = "http://library.lol/main/$md5"
    }

    fun fetch(connectionCallback: Connection.() -> Connection): Response {
        val jsoup = Jsoup.connect(Constants.NON_FICTION_BASE_URL)
            .timeout(Constants.DEFAULT_TIMEOUT)
            .connectionCallback()
        val document = jsoup.get()
        return processDocument(document)
    }

    fun generateSearchBooksConnection (language: String = "",
    view: String = "detailed",
    query: String,
    page: Int = 1,
    format: String = "", connection: Connection):Connection = connection.apply {
        timeout(Constants.DEFAULT_TIMEOUT)
        data("req", query)
        data("open", "0")
        data("res", Constants.NON_FICTION_ITEMS_PER_PAGE.toString())
        data("phrase", "0")
        data("column", "def")
        data("language", language)
        data("format", format)
        data("page", page.toString())
        data("view", view)
    }

    private fun processDocument(document:Document): Response {
        val result = Response()
        val body = document.body()
        val totalItemContainer = body.select("font[size=1][color=grey]").text()

        if (totalItemContainer.isEmpty()) return result

        val totalItem = totalItemContainer.split(" ")[0].toInt()

        if (totalItem == 0) return result

        val totalPages = ceil((totalItem / Constants.NON_FICTION_ITEMS_PER_PAGE)).toInt()

        result.totalItem = totalItem
        result.totalPages = if (totalPages < Constants.MAX_PAGES) totalPages else Constants.MAX_PAGES

        val tables = body.select("table[rules=cols]").toMutableList()

        if (tables.size == 0) {
            return  result
        }

        tables.removeLast()

        tables.forEachIndexed tablesLoop@{ index, table ->
            if (index % 2 != 0) return@tablesLoop
            result.items.add(toBook(table))
        }

        return result

    }

    private fun toBook(table: Element): Book {
        val rows = table.select("tr")

        val pageLanguage = rows[6].select("td")
        val sizeExtension = rows[9].select("td")
        val isbnsId = rows[7].select("td")
        val md5 = rows[1].select("a").first()?.attr("href")?.split("=")?.last()?.trim()
        return Book(
            libgenID = isbnsId[3].text().trim(),
            title = rows[1].select("b").text().trim(),
            md5 = md5,
            language = pageLanguage[1].text().trim(),
            size = sizeExtension[1].text().trim(),
            extension = sizeExtension.last()?.text()?.trim(),
            nbrOfPages = pageLanguage.last()?.text()?.trim(),
            image = rows[1].select("img").first()?.attr("src")?.let {
                getImageSource(
                    Constants.IMAGE_SOURCE,
                    it.trim()
                )
            },
            authors = rows[2].select("b").text().split(",").filter { it.isNotBlank() },
            publisher = rows[4].select("td")[1].text(),
            isbns = isbnsId[1].text().trim().replace(" ", "").split(","),
            series = rows[3].select("td")[1].text().trim(),
            year = rows[5].select("td")[1].text().trim(),
            description = null,
            downloadLinks = null,
            details_url = md5?.let { getDetailsUrl(it) }
        )
    }
}
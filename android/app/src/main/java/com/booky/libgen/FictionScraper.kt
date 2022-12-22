import entities.Book
import org.jsoup.Connection
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.nodes.Element
import kotlin.math.ceil

class FictionScraper {

    companion object {
        fun getDetailsUrl (md5: String) = "http://library.lol/fiction/$md5"
    }

    fun fetch(connectionCallback: Connection.() -> Connection): Response {
        val jsoup = Jsoup.connect(Constants.FICTION_BASE_URL)
            .timeout(Constants.DEFAULT_TIMEOUT)
            .connectionCallback()
        val document = jsoup.get()
        return processDocument(document)
    }

    private fun toBook(row: Element): Book {
        val sections = row.select("td")
        val sizeExtension = sections[4].text().split("/")

        val md5 =  sections[5].select("ul > li > a").attr("href").split("/").last()

        return Book(
            title = sections[2].select("a").text().trim(),
            language = sections[3].text().trim(),
            size = sizeExtension.last(),
            extension = sizeExtension.first(),
            md5 = md5,
            authors = sections[0].text().split(",").filter { it.isNotBlank() },
            details_url = getDetailsUrl(md5)
        )
    }

    private fun processDocument(
        document: Document
    ): Response {
        val result = Response()
        val body = document.body()

        val totalItemContainer =
            body.getElementsByAttributeValue("style", "float:left").first()?.text() ?: return result

        val totalItems = totalItemContainer.split("").reduce { acc, s ->
            acc + try {
                s.toInt()
            } catch (e: NumberFormatException) {
                ""
            }
        }.toInt()

        if (totalItems == 0) return result

        val totalPages = ceil(totalItems / Constants.FICTION_ITEMS_PER_PAGE).toInt()

        result.totalItem = totalItems
        result.totalPages = if (totalPages < Constants.MAX_PAGES) totalPages else Constants.MAX_PAGES

        val table = body.select("table[class=catalog]")

        val rows = table.select("tr").toMutableList()

        rows.removeFirst()

        rows.forEach { row ->
            result.items.add(
                toBook(row)
            )
        }

        return result
    }

    fun generateSearchBooksConnection(
        language: String = "",
        view: String = "detailed",
        query: String,
        page: Int = 1,
        format: String = "", connection: Connection
    ): Connection = connection.apply {
        timeout(Constants.DEFAULT_TIMEOUT)
        data("q", query)
        data("wildcard", "1")
        Constants.FICTION_LANGUAGES[language]?.let { data("language", it) }
        data("format", format)
        data("page", page.toString())
        data("view", view)
    }
}
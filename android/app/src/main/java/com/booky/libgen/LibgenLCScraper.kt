import entities.Book
import org.jsoup.Connection
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.nodes.Element
import utils.getImageSource
import utils.isValidISBN
import kotlin.math.ceil

class LibgenLCScraper {
    fun fetch(connectionCallback: Connection.() -> Connection): Response {
        val jsoup = Jsoup.connect(Constants.LIBGEN_LC_BASE_URL)
            .timeout(Constants.DEFAULT_TIMEOUT)
            .connectionCallback()
        val document = jsoup.get()
        return processDocument(document)
    }

    fun generateSearchBooksConnection (language: String = "",
                                       query: String,
                                       page: Int = 1,
                                   connection: Connection
    ): Connection = connection.apply {
        val searchQuery = if (language != "all" && language.isNotEmpty())
            "$query lang:${Constants.LANG_639[language]}"
        else
            query
        timeout(Constants.DEFAULT_TIMEOUT)
        data("req", searchQuery)
        data("columns[]", "t,a,s,y,p,i")
        data("objects[]", "f")
        data("objects[]", "e")
        data("objects[]", "s")
        data("objects[]", "a")
        data("objects[]", "p")
        data("topics[]", "l")
        data("topics[]", "f")
        data("res", Constants.LIBGEN_LC_ITEMS_PER_PAGE.toString())
        data("curetab", "f")
        data("covers", "on")
        data("gmode", "on")
        data("filesuns", "off")
        data("page", page.toString())
    }

    private fun processDocument(
        document: Document
    ): Response {
        val result = Response()
        val body = document.body()

        val spans = body.select("span[class=badge badge-primary]")
        val totalItem = spans.first()?.text()?.toInt()
        val table = body.getElementById("tablelibgen")

        if (table != null) {
            if (totalItem == 0) return result
        }

        val totalPages = totalItem?.div(Constants.LIBGEN_LC_ITEMS_PER_PAGE)?.let { ceil(it.toDouble()).toInt() }

        if (totalItem != null) {
            result.totalItem = totalItem
        }
        if (totalPages != null) {
            result.totalPages = if (totalPages < Constants.MAX_PAGES) totalPages else Constants.MAX_PAGES
        }

        val rows = table?.select("tr")?.toMutableList()

        rows?.removeFirst()


        rows?.forEach { row ->
            result.items.add(
                toBook(row)
            )
        }
        return result

    }


    private fun toBook(row: Element):Book {
        val isbns = mutableListOf<String>()
        val sections = row.select("td")

       var title = sections[1].select("a").find { it.text().isNotEmpty() }?.text().toString()

        val extraData = sections[1].select("font[color=green]")


        extraData.text().split(";").forEach { item ->
            val temp = item.trim()
            title = title.replace(temp, "")

            if (isValidISBN(temp))
                isbns.add(temp)
            else if (isValidISBN(temp.replace("-", "")))
                isbns.add(temp.replace("-", ""))
        }

        return Book(
            language = sections[5].text(),
            extension = sections[8].text(),
            md5 = sections[9].select("a").attr("href").split("=").last(),
            image = sections.first()?.select("img")?.let {
                getImageSource(
                    Constants.LIBGEN_LC_IMAGE_SOURCE,
                    it.attr("src")
                )
            },
            nbrOfPages = sections[6].text(),
            authors = sections[2].text().split(",").filter { it.isNotEmpty() },
            publisher = sections[3].text(),
            year = sections[4].text(),
            title = title,
            isbns = isbns,
            size = sections[7].text(),
            type = if ("l" in sections[1].select("span[class=badge badge-secondary]")
                    .text()
            ) "NON_FICTION" else "FICTION"
        )
    }

}
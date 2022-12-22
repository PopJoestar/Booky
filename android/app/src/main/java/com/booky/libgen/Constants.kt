import java.util.*
import kotlin.collections.HashMap


object Constants {
    const val NON_FICTION_ITEMS_PER_PAGE = 25.0
    const val NON_FICTION_BASE_URL = "http://libgen.rs/search.php"

    const val IMAGE_SOURCE = "http://library.lol"

    const val FICTION_BASE_URL = "http://libgen.rs/fiction"
    const val FICTION_ITEMS_PER_PAGE = 25.0

    const val LIBGEN_LC_ITEMS_PER_PAGE = 25
    const val LIBGEN_LC_BASE_URL = "http://libgen.lc/index.php"
    const val LIBGEN_LC_IMAGE_SOURCE = "http://libgen.lc"
    const val DEFAULT_TIMEOUT = 30000

    const val MAX_PAGES = 40

    val LANG_639 by lazy {
        val result = HashMap<String, String>()
        var locale: Locale
        Locale.getISOLanguages().forEach { language ->
            locale = Locale(language)
            result[language] = locale.isO3Language
        }
        result
    }

    val FICTION_LANGUAGES by lazy {
        mapOf(
            "fr" to "French",
            "ALL" to "",
            "en" to "English",
            "es" to "Español",
            "it" to "Italian",
            "de" to "Deutsch"
        )
    }
}